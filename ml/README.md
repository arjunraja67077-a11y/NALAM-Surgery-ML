# ML training

`dataset.csv` is synthetic/demo data for software development.

Run:

```bash
python train_model.py
```

The script performs an 80/20 stratified train/test split, trains a Random Forest pipeline with one-hot encoding, prints accuracy and a classification report, and writes `model.pkl` locally.

The current demo target is `target`, representing a synthetic case category. It is not a clinical outcome and must not be interpreted as medical advice.
