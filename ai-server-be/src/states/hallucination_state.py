from pydantic import BaseModel, Field

class HallucinationState(BaseModel):
    cuisine_type_verified: bool = Field(
        ...,
        description="True if the cuisine_type was explicitly provided by the user"
    )
    meal_type_verified: bool = Field(
        ...,
        description="True if the meal_type was explicitly provided by the user"
    )
    cuisine_preference_verified: bool = Field(
        ...,
        description="True if the cuisine_preference was explicitly provided by the user"
    )
    taste_preference_verified: bool = Field(
        ...,
        description="True if the taste_preference was explicitly provided by the user"
    )
    user_opinion_verified: bool = Field(
        ...,
        description="True if the user_opinion was explicitly provided by the user"
    )
    follow_up_question_verified: bool = Field(
        ...,
        description="True if the follow_up_question was explicitly provided by the user"
    )
    all_verified: bool = Field(
        ...,
        description="True if every required field was user-provided (i.e., no hallucination)"
    )
    feedback: str = Field(
        ...,
        description="Any corrective feedback or notes on missing or incorrect information"
    )