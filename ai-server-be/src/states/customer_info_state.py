from pydantic import BaseModel, Field
from typing import Optional

class CustomerInfoState(BaseModel):
    cuisine_type: Optional[str] = Field(
        None,
        description=(
            "Type of cuisine the user wants (e.g., Veg, Non-Veg, Vegan, Eggs, "
            "Pescatarian, Keto, Gluten-Free, Dairy-Free)"
        ),
    )
    meal_type: Optional[str] = Field(
        None,
        description=(
            "Meal occasion (e.g., Breakfast, Brunch, Lunch, Dinner, Snacks, "
            "Tea-time, Dessert)"
        ),
    )
    cuisine_preference: Optional[str] = Field(
        None,
        description=(
            "Regional or style preference (e.g., Rajasthani, Gujarati, Punjabi, "
            "South Indian, Chinese, Italian, Mexican, Thai, Japanese, "
            "Mediterranean, French, American)"
        ),
    )
    taste_preference: Optional[str] = Field(
        None,
        description=(
            "Flavor profile (e.g., Spicy, Sweet, Savory, Sour, Umami, Bitter, Salty)"
        ),
    )
    user_opinion: Optional[str] = Field(
        None,
        description="Free‑text: any additional info about the user or their preferences",
    )
    follow_up_question: Optional[str] = Field(
        None,
        description=(
            "If any required field is missing, a single clear question to ask next; "
            "otherwise, an empty string"
        ),
    )
