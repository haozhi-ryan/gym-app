from fastapi import FastAPI, Header, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

app = FastAPI(title="Calorie Calculator API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173","http://127.0.0.1:5173", "*"],
    allow_credentials=False,  # set True only if you use cookies
    allow_methods=["*"],      # or ["POST", "OPTIONS"]
    allow_headers=["*"],      # or ["Authorization", "Content-Type"]
)

ACTIVITY = {
    "sedentary": 1.2,
    "light": 1.375,
    "moderate": 1.55,
    "active": 1.725,
    "very_active": 1.9,
    "extra_active": 2.0,
}

"""
--------- Data models ---------
A data model defines the shape and type of the data your API expects or returns.
It ensures data sent from the client (like your frontend or Postman) is valid.
"""
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

"""
--------- Api endpoints ---------
An endpoint is a URL path that defines what happens when a user or frontend app makes a request to it.
"""

# Post end point - used when the client sends data to the server.
@app.post("/calculate", response_model=CalcOut)
def calculate(payload: CalcIn):

    base = 10 * payload.weightKg + 6.25 * payload.heightCm - 5 * payload.age
    bmr =  base + (5 if payload.sex == "male" else -161)
    factor = ACTIVITY[payload.activity]
    maintenance = bmr * factor

    return CalcOut(
        bmr=round(bmr),
        maintenance=round(maintenance),
        mildLoss=round(maintenance * 0.9),
        loss=round(maintenance * 0.8),
        extremeLoss=round(maintenance * 0.6),
    )

"""
-------------------------------
"""