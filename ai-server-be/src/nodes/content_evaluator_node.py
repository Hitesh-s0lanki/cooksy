import json
from src.states.graph_state import GraphState

from src.states.content_evaluation_state import ContentEvaluationState
from src.llms.openai_llm import OpenAILLM
from src.instructions.content_evaluation_agent import evaluation_agent

from langchain_core.prompts import ChatPromptTemplate

class ContentEvaluatorNode:
    def __init__(self, llm):
        self.llm = llm
        self.instruction = evaluation_agent()
        self.prompt = ChatPromptTemplate.from_messages([
            ("system", self.instruction),
            ("user", "User preferences:\n{preferences_json}\n\nGenerated dish:\n{dish_json}\n\nPlease return only the evaluation JSON.")
        ])

    def execute(
        self,
        state: GraphState
    ) -> GraphState:
        """
        Compare the generated dish against the user preferences
        and return a ContentEvaluationState with a validity percentage.
        """
        # Wrap the LLM for structured JSON output
        llm_struct = OpenAILLM.get_llm_with_structure_output(
            self.llm,
            ContentEvaluationState
        )
        chain = self.prompt | llm_struct

        # Serialize inputs
        preferences_json = json.dumps(state['customer_info_state'].dict())
        dish_json = json.dumps(state['content_generated_state'].dict())

        # Invoke the chain
        raw = chain.invoke({
            "preferences_json": preferences_json,
            "dish_json": dish_json
        })

        # Parse into our Pydantic model
        if isinstance(raw, ContentEvaluationState):
            state['evaluate_state'] = raw
        elif isinstance(raw, dict):
            state['evaluate_state'] = ContentEvaluationState(**raw)
        else:
            state['evaluate_state'] = ContentEvaluationState.parse_raw(raw)

        return state
