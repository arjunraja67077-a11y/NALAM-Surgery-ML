const form = document.getElementById('predictionForm');
const result = document.getElementById('result');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  result.className = 'result';
  result.innerHTML = '<h2>Predicting...</h2>';

  const payload = {
    age: Number(document.getElementById('age').value),
    gender: document.getElementById('gender').value,
    primary_complaint: document.getElementById('complaint').value,
    problem: document.getElementById('disease').value,
    diagnosis: document.getElementById('diagnosis').value,
    investigation: document.getElementById('investigation').value,
    anaesthesia: document.getElementById('anaesthesia').value,
    medical_history: document.getElementById('history').value
  };

  try {
    const response = await fetch('http://127.0.0.1:8000/predict', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.detail || 'Prediction failed');
    result.innerHTML = `<h2>Prediction Result</h2><p><b>Case category:</b> ${data.prediction}</p><p><b>Demo confidence:</b> ${data.confidence_percent ?? 'N/A'}%</p><small>Demo ML output only — not a medical diagnosis.</small>`;
  } catch (error) {
    result.innerHTML = `<h2>Backend not connected</h2><p>${error.message}</p><p>Start FastAPI with <code>fastapi dev backend/main.py</code>.</p>`;
  }
});
