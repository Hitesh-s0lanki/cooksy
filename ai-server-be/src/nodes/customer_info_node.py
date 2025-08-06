from src.states.graph_state import GraphState
from src.states.customer_info_state import CustomerInfoState

from src.llms.openai_llm import OpenAILLM

from src.instructions.dish_info_agent import dish_info_agent

from langchain_core.messages import HumanMessage, AIMessage
from langchain_core.prompts import ChatPromptTemplate,MessagesPlaceholder

import json
from pydantic import BaseModel

class CustomerInfoNode():
    
    def __init__(self, llm):
        self.llm = llm
        self.instruction = dish_info_agent()
        self.prompt = ChatPromptTemplate.from_messages(
            [
                ("system", self.instruction),
                MessagesPlaceholder(variable_name="messages")
            ]
        )        
        
    def execute(self, state:GraphState):
        """
            Get the required information from the user for the booking interest.
        """
        
        # Wrap LLM to enforce structured JSON output matching CustomerInfoState
        llm_struct = OpenAILLM.get_llm_with_structure_output(
            self.llm,
            CustomerInfoState
        )
        
        # Compose the prompt+llm chain
        chain = self.prompt | llm_struct

        # Initialize conversation history
        messages: list[HumanMessage | AIMessage] = state['messages']

        try:
            # Invoke LLM with message history
            raw_output = chain.invoke({"messages": messages})

            # Normalize LLM output to string
            if isinstance(raw_output, BaseModel):
                output_str = raw_output.json()
            elif isinstance(raw_output, dict):
                output_str = json.dumps(raw_output)
            else:
                output_str = raw_output

            # Append AI message to history
            messages.append(AIMessage(content=output_str))

            # Parse JSON into state
            info_state = CustomerInfoState.parse_raw(output_str)
            state['customer_info_state'] = info_state

        except Exception as e:
            print("Something went wrong!", e)

        return state
        
    