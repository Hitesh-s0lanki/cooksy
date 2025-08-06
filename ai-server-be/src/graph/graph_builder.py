from langgraph.graph import StateGraph, END
from src.states.graph_state import GraphState
from langchain_core.messages import HumanMessage
from typing_extensions import List

# For Messaging 
from fastapi import WebSocket

## importing nodes 
from src.nodes.customer_info_node import CustomerInfoNode
from src.nodes.content_generation_node import ContentGenerationNode
from src.nodes.content_evaluator_node import ContentEvaluatorNode
from src.nodes.hallucination_node import HallucinationNode

class GraphBuilder:

    def __init__(self, llm, graph_state:GraphState, websocket: WebSocket):
        self.llm = llm
        self.websocket = websocket
        self.graph_builder = StateGraph(GraphState)
        self.graph_state:GraphState = graph_state

    ## Condition edge function to route to the appropriate node
    def route_decision(self, state:GraphState) -> str:
        """Return the node name you want to visit next"""

        if state['customer_info_state'].follow_up_question:
            return END

        return "content_generate_node"

    def route_evaluate_decision(self, state:GraphState):
        if state["evaluate_state"].validity_percentage < 70:
            return "No"
        
        return "Yes"
    
    def build_graph(self):
        # Defining the node 
        customer_info_node = CustomerInfoNode(self.llm)
        content_generation_node = ContentGenerationNode(self.llm)
        content_evaluator_node = ContentEvaluatorNode(self.llm)
        # hallucination_node = HallucinationNode(self.llm) # commented due to high token comsumption

        # Adding the Node to Graph
        self.graph_builder.add_node("customer_info_node", customer_info_node.execute)
        self.graph_builder.add_node("content_generate_node", content_generation_node.execute)
        self.graph_builder.add_node("content_evaluator_node", content_evaluator_node.execute)

        ## Adding the Edges
        self.graph_builder.set_entry_point("customer_info_node")
        self.graph_builder.add_conditional_edges("customer_info_node",self.route_decision, {
            "content_generate_node":"content_generate_node",
            END:END
        })
        self.graph_builder.add_edge("content_generate_node", "content_evaluator_node")
        self.graph_builder.add_conditional_edges(
            "content_evaluator_node",
            self.route_evaluate_decision,
            {
                "No": "content_generate_node",
                "Yes": END
            }
        )

    def setup_graph(self):
        self.build_graph()
        self.graph = self.graph_builder.compile()
    
    async def execute(self, input, config):
        messages:List = self.graph_state['messages']
        messages.append(HumanMessage(content=input))

        self.graph_state['messages'] = messages

        for event in self.graph.stream(self.graph_state, config = config):
            if 'customer_info_node' in event:
                self.graph_state = event['customer_info_node']

                if not self.graph_state['customer_info_state'].follow_up_question:
                    await self.websocket.send_json({
                        "event_type":"content_generation",
                        "message":""
                    })
                else:
                    await self.websocket.send_json({
                        "event_type":"follow_up",
                        "message":self.graph_state['customer_info_state'].follow_up_question
                    })

            elif 'content_generate_node' in event:
                self.graph_state = event['content_generate_node']
                await self.websocket.send_json({
                        "event_type":"content_evaluation",
                        "message":""
                })

            elif 'content_evaluator_node' in event:
                self.graph_state = event['content_evaluator_node']

                if self.graph_state["evaluate_state"].validity_percentage < 70:
                    await self.websocket.send_json({
                            "event_type":"content_generation",
                            "message":f"Content Evaluated with the Validation percentage og {self.graph_state["evaluate_state"].validity_percentage}"
                    }) 
                else:
                    await self.websocket.send_json({
                                "event_type":"content_evaluated",
                                "message":f"Content Evaluated with the Validation percentage og {self.graph_state["evaluate_state"].validity_percentage}"
                     }) 

