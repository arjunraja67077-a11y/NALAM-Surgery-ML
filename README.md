# NALAM Hospital – Surgery ML Prediction System

A starter machine-learning web application for surgery prediction workflow.

## Stack
- Python
- Pandas / NumPy
- scikit-learn
- Joblib
- FastAPI
- HTML/CSS/JavaScript

## Run
```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python ml/train_model.py
fastapi dev backend/main.py
```
Then open `frontend/index.html`.

> The included dataset is synthetic/demo data only. This project is not a medical diagnostic system and must not be used for clinical decisions without appropriate validation and clinical oversight.
