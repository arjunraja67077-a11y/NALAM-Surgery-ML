from pathlib import Path
import joblib
import pandas as pd
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

BASE = Path(__file__).resolve().parents[1]
MODEL = BASE / 'ml' / 'model.pkl'
app = FastAPI(title='NALAM Surgery ML API')
app.add_middleware(CORSMiddleware, allow_origins=['*'], allow_credentials=True, allow_methods=['*'], allow_headers=['*'])

class Patient(BaseModel):
    age: int
    gender: str
    primary_complaint: str
    problem: str
    diagnosis: str
    investigation: str
    surgery_name: str
    surgery_type: str
    anaesthesia: str
    medical_history: str = ''

@app.get('/')
def root():
    return {'message': 'NALAM Surgery ML API', 'model_ready': MODEL.exists()}

@app.post('/predict')
def predict(p: Patient):
    if not MODEL.exists():
        return {'prediction': 'Model not trained', 'model_status': 'Run ml/train_model.py'}
    model = joblib.load(MODEL)
    cols = ['age','gender','primary_complaint','problem','diagnosis','investigation','surgery_name','surgery_type','anaesthesia','medical_history']
    data = pd.DataFrame([[p.age,p.gender,p.primary_complaint,p.problem,p.diagnosis,p.investigation,p.surgery_name,p.surgery_type,p.anaesthesia,p.medical_history]], columns=cols)
    pred = model.predict(data)[0]
    return {'prediction': str(pred), 'model_status': 'trained demo model'}
