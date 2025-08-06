from pydantic import BaseModel, Field
from typing import List

class DishOutputState(BaseModel):
    dish_name: str = Field(
        ..., description="Name of the recommended dish"
    )
    dish_description: str = Field(
        ..., description="Brief description of the dish"
    )
    ingredients: List[str] = Field(
        ..., description="List of ingredients with quantities"
    )
    recipe: List[str] = Field(
        ..., description="Step‑by‑step preparation instructions"
    )