import uvicorn
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from typing import Dict
from src.llms.openai_llm import OpenAILLM
from src.graph.graph_builder import GraphBuilder

app = FastAPI()

# Prepare a single LLM instance
openai = OpenAILLM()
llm = openai.get_llm_model()

# Keep a GraphBuilder per chat_id
chat_builders: Dict[str, GraphBuilder] = {}

@app.websocket("/ws/{chat_id}")
async def websocket_endpoint(websocket: WebSocket, chat_id: str):
    await websocket.accept()

    # Initialize a GraphBuilder for this chat_id if needed
    if chat_id not in chat_builders:
        gb = GraphBuilder(llm, {
            "messages": [],
            "customer_info_state": {}
        }, websocket)
        gb.setup_graph()
        chat_builders[chat_id] = gb

    graph_builder = chat_builders[chat_id]
    config = {"configurable": {"thread_id": chat_id}}

    try:
        while True:
            msg = await websocket.receive_text()

            # If the user wants to end the chat immediately
            if msg.strip().lower() == "end":
                await websocket.send_text("Conversation ended by user.")
                await websocket.close()
                del chat_builders[chat_id]
                break

            # Execute one step of your LangGraph
            await graph_builder.execute(msg, config)

            # Grab the next question / response
            follow_up = graph_builder.graph_state["customer_info_state"].follow_up_question

            # If GraphBuilder is done (no follow-up), close out
            if not follow_up:
                await websocket.send_json({
                    "event_type":"completed",
                    "customer_info_state": graph_builder.graph_state['customer_info_state'].dict(),
                    "content_generated_state": graph_builder.graph_state['content_generated_state'].dict()
                })
                await websocket.close()
                del chat_builders[chat_id]
                break
            

    except WebSocketDisconnect:
        # Clean up on abrupt disconnect
        if chat_id in chat_builders:
            del chat_builders[chat_id]


if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
