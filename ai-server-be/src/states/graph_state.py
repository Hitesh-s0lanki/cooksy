from typing_extensions import TypedDict, List, Literal
from typing import Annotated
from langgraph.graph.message import add_messages

from src.states.customer_info_state import CustomerInfoState
from src.states.hallucination_state import HallucinationState
from src.states.dish_output_state import DishOutputState
from src.states.content_evaluation_state import ContentEvaluationState

class GraphState(TypedDict):
    messages: Annotated[List, add_messages]
    customer_info_state: CustomerInfoState
    requirement_met:Literal["yes", "no"] # he next step in the routing process
    hallucination_state: HallucinationState
    content_generated_state: DishOutputState
    evaluate_state: ContentEvaluationState

