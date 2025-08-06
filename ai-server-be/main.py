from src.llms.openai_llm import OpenAILLM
from src.graph.graph_builder import GraphBuilder

if __name__ == "__main__":
    
    # Defining the LLM 
    Openai = OpenAILLM()
    llm = Openai.get_llm_model()
    
    # define the llm to the func node 
    graph_builder = GraphBuilder(llm, {
        'messages':[],
        'customer_info_state':{}
    })
    graph_builder.setup_graph()

    config = {
        "configurable": {
            "thread_id": "123"
        }
    }

    follow_up = 'let Start the Talk!'

    while True:
        # Ask the follow-up question
        user_input = input(f"Bot: {follow_up}\nYou: ")

        graph_builder.execute(user_input, config)

        follow_up = graph_builder.graph_state['customer_info_state'].follow_up_question 

        if not follow_up:
            print(graph_builder.graph_state)

    
    
    