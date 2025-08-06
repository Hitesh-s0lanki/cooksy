import json
from src.states.graph_state import GraphState
from src.states.hallucination_state import HallucinationState
from src.llms.openai_llm import OpenAILLM
from src.instructions.hallucination_agent import hallucination_agent

from langchain_core.prompts import ChatPromptTemplate

class HallucinationNode:
    def __init__(self, llm):
        self.llm = llm
        self.instruction = hallucination_agent()
        self.prompt = ChatPromptTemplate.from_messages([
            ("system", self.instruction),
            ("user", 
             "Conversation history:\n{messages_json}\n\n"
             "Collected state:\n{state_json}\n\n"
             "Return only the hallucination JSON.")
        ])

    def execute(
        self,
        state: GraphState
    ) -> GraphState:
        """
        Verify that each field in CustomerInfoState was directly provided by the user.
        """
        # Wrap the LLM for structured JSON output
        llm_struct = OpenAILLM.get_llm_with_structure_output(
            self.llm,
            HallucinationState
        )
        chain = self.prompt | llm_struct

        # Serialize history and state
        messages_json = json.dumps([{"role": m.role, "content": m.content} for m in state['messages']])
        state_json = state.json()

        # Invoke the chain
        raw = chain.invoke({
            "messages_json": messages_json,
            "state_json": state_json
        })

        # Parse into our Pydantic model
        if isinstance(raw, HallucinationState):
            return raw
        if isinstance(raw, dict):
            return HallucinationState(**raw)
        return HallucinationState.parse_raw(raw)
