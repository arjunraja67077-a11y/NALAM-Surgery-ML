from pathlib import Path
import pandas as pd
import joblib
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestClassifier

BASE = Path(__file__).resolve().parent
df = pd.read_csv(BASE / 'dataset.csv')
X = df.drop(columns=['target'])
y = df['target']
cat = [c for c in X.columns if X[c].dtype == 'object']
pre = ColumnTransformer([('cat', OneHotEncoder(handle_unknown='ignore'), cat)], remainder='passthrough')
model = Pipeline([('preprocess', pre), ('classifier', RandomForestClassifier(n_estimators=200, random_state=42))])
model.fit(X, y)
joblib.dump(model, BASE / 'model.pkl')
print('Model trained and saved to ml/model.pkl')
