from fastapi import FastAPI, Header, HTTPException
from pydantic import BaseModel, Field
import os, jwt

app = FastAPI(title="Calorie Calculator API")

ACTIVITY = {
    "sedentary": 1.2,
    "light": 1.375,
    "moderate": 1.55,
    "active": 1.725,
    "very_active": 1.9,
    "extra_active": 2.0,
}

class CalcIn(BaseModel):
    sex: str = Field(pattern="^(male|female)$")
    weightKg: float = Field(gt=0)
    heightCm: float = Field(gt=0)
    age: int = Field(gt=0)
    activity: str = Field(pattern="^(sedentary|light|moderate|active|very_active|extra_active)$")

class CalcOut(BaseModel):
    bmr: int
    maintenance: int
    mildLoss: int
    loss: int
    extremeLoss: int

@app.post("/calculate", response_model=CalcOut)
def calculate(payload: CalcIn, authorization: str | None = Header(default=None)):

    base = 10 * payload.weightKg + 6.25 * payload.heightCm - 5 * payload.age + (5 if payload.sex == "male" else -161)
    maintenance = base * ACTIVITY[payload.activity]
    return CalcOut(
        bmr=round(base),
        maintenance=round(maintenance),
        mildLoss=round(maintenance * 0.9),
        loss=round(maintenance * 0.8),
        extremeLoss=round(maintenance * 0.6),
    )
