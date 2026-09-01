from pathlib import Path
import pandas as pd
import joblib
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report

BASE = Path(__file__).resolve().parent
df = pd.read_csv(BASE / 'dataset.csv')
X = df.drop(columns=['target'])
y = df['target']

categorical = [c for c in X.columns if X[c].dtype == 'object']
preprocess = ColumnTransformer([
    ('categorical', OneHotEncoder(handle_unknown='ignore'), categorical)
], remainder='passthrough')

model = Pipeline([
    ('preprocess', preprocess),
    ('classifier', RandomForestClassifier(
        n_estimators=200, random_state=42, class_weight='balanced'
    ))
])

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.20, random_state=42, stratify=y
)
model.fit(X_train, y_train)
pred = model.predict(X_test)
accuracy = accuracy_score(y_test, pred)

print(f'Demo test accuracy: {accuracy:.3f}')
print(classification_report(y_test, pred, zero_division=0))
joblib.dump(model, BASE / 'model.pkl')
print('Model trained and saved to ml/model.pkl')
print('WARNING: dataset is synthetic/demo data; accuracy is not clinical evidence.')
