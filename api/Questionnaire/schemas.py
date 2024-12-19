from pydantic import BaseModel, PositiveInt
from typing import Literal, List, Union, Annotated, Optional
import json
import os

gad_7_mapping = {
    "Not at all": 0, 
    "Several days": 1, 
    "More than half the days": 2, 
    "Nearly every day": 3
}

class GeneralQuestionnaire(BaseModel):
    full_name: str
    age: PositiveInt
    gender: Literal["Male", "Female", "Other", "Prefer not to say"]
    occupation_if_any: str
    work_hours_per_week: int
    average_hours_of_sleep_per_day: PositiveInt
    sleep_start: PositiveInt
    mental_health_history:Optional[str]



class GAD7Schema(BaseModel):
    # 0–4: minimal anxiety 
    # 5–9: mild anxiety
    # 10–14: moderate anxiety
    # 15–21: severe anxiety 
    feeling_anxious: Literal["Not at all", "Several days", "More than half the days", "Nearly every day"]
    controlling_worry: Literal["Not at all", "Several days", "More than half the days", "Nearly every day"]
    worrying_about_things: Literal["Not at all", "Several days", "More than half the days", "Nearly every day"]
    trouble_relaxing: Literal["Not at all", "Several days", "More than half the days", "Nearly every day"]
    restlessness: Literal["Not at all", "Several days", "More than half the days", "Nearly every day"]
    annoyance_irritation: Literal["Not at all", "Several days", "More than half the days", "Nearly every day"]
    feeling_afraid: Literal["Not at all", "Several days", "More than half the days", "Nearly every day"]

class PHQ9Schema(BaseModel):
    # 0–4: none-minimal depression
    # 5–9: mild depression
    # 10–14: moderate depression
    # 15–19: moderately severe depression 
    # 20-27: severe depression 
    interest_in_things: Literal["Not at all", "Several days", "More than half the days", "Nearly every day"]
    depression: Literal["Not at all", "Several days", "More than half the days", "Nearly every day"]
    trouble_sleeping: Literal["Not at all", "Several days", "More than half the days", "Nearly every day"]
    tiredness: Literal["Not at all", "Several days", "More than half the days", "Nearly every day"]
    appetite: Literal["Not at all", "Several days", "More than half the days", "Nearly every day"]
    feeling_bad: Literal["Not at all", "Several days", "More than half the days", "Nearly every day"]
    trouble_concentrating: Literal["Not at all", "Several days", "More than half the days", "Nearly every day"]
    restlessness: Literal["Not at all", "Several days", "More than half the days", "Nearly every day"]
    self_harm: Literal["Not at all", "Several days", "More than half the days", "Nearly every day"]

# class Visualization(BaseModel):
