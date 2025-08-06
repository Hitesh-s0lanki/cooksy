from src.states.graph_state import GraphState

from src.states.dish_output_state import DishOutputState
from src.llms.openai_llm import OpenAILLM
from src.instructions.content_generation_agent import content_generation_agent

import json

class ContentGenerationNode:
    def __init__(self, llm):
        self.llm = llm
        # content_generation_agent() should return the “top chef” prompt you defined earlier
        self.instruction = content_generation_agent()

    def execute(self, state: GraphState):
        """
        Given a CustomerDishState, invoke the LLM to produce a DishOutputState.
        """

        # Wrap the LLM to enforce structured JSON output matching DishOutputState
        llm_struct = OpenAILLM.get_llm_with_structure_output(
            self.llm,
            DishOutputState
        )

        # Serialize the collected preferences as JSON
        content = json.dumps(state['customer_info_state'].dict())

        # Invoke the chain
        raw_output = llm_struct.invoke(self.instruction.format(content=content))

        # Coerce into our Pydantic model
        if isinstance(raw_output, DishOutputState):
            state['content_generated_state'] = raw_output
        elif isinstance(raw_output, dict):
            state['content_generated_state'] = DishOutputState(**raw_output)
        else: 
            state['content_generated_state'] = DishOutputState.model_validate_json(raw_output)

        return state
