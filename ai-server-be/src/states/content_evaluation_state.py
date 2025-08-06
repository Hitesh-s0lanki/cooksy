from pydantic import BaseModel, Field

class ContentEvaluationState(BaseModel):
    validity_percentage: float = Field(
        ...,
        ge=0,
        le=100,
        description="Percentage (0-100) indicating how well the generated dish matches the user's preferences"
    )
