import { useState } from 'react';

export default function HealthForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    age: 30,
    height: 170, // in cm
    weight: 70,  // in kg
    sleepHours: 7.5,
    exerciseHours: 4.0,
    stressLevel: 5
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseFloat(value) || value
    }));
  };

  // Automatically calculate BMI: weight(kg) / height(m)^2
  const currentBmi = formData.height && formData.weight 
    ? (formData.weight / Math.pow(formData.height / 100, 2)).toFixed(1) 
    : 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Prepare the final payload for the ML model, mapping height/weight to BMI
    const finalData = {
      age: formData.age,
      bmi: parseFloat(currentBmi),
      sleepHours: formData.sleepHours,
      exerciseHours: formData.exerciseHours,
      stressLevel: formData.stressLevel
    };
    onSubmit(finalData);
  };

  return (
    <div className="glass-panel">
      <h1>Vitality AI</h1>
      <p className="subtitle">Discover your personalized healthcare plan based on machine learning analysis.</p>
      
      <form onSubmit={handleSubmit} className="form-grid">
        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} required min="18" max="100" />
        </div>

        <div className="form-group">
          <label htmlFor="sleepHours">Daily Sleep (Hours)</label>
          <input type="number" step="0.5" id="sleepHours" name="sleepHours" value={formData.sleepHours} onChange={handleChange} required min="0" max="24" />
        </div>
        
        <div className="form-group">
          <label htmlFor="height">Height (cm)</label>
          <input type="number" id="height" name="height" value={formData.height} onChange={handleChange} required min="50" max="300" />
        </div>

        <div className="form-group">
          <label htmlFor="weight">Weight (kg)</label>
          <input type="number" step="0.1" id="weight" name="weight" value={formData.weight} onChange={handleChange} required min="20" max="300" />
        </div>

        <div className="form-group full-width" style={{background: 'rgba(79, 70, 229, 0.1)', padding: '1rem', borderRadius: '10px', border: '1px solid rgba(79, 70, 229, 0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <label style={{margin: 0, color: '#818cf8', fontSize: '1rem', fontWeight: '600'}}>Calculated BMI:</label>
          <span style={{fontSize: '1.4rem', fontWeight: 'bold'}}>{currentBmi}</span>
        </div>
        
        <div className="form-group">
          <label htmlFor="exerciseHours">Weekly Exercise (Hours)</label>
          <input type="number" step="0.5" id="exerciseHours" name="exerciseHours" value={formData.exerciseHours} onChange={handleChange} required min="0" max="40" />
        </div>
        
        <div className="form-group">
          <label htmlFor="stressLevel">Stress Level ({formData.stressLevel}/10)</label>
          <input type="range" id="stressLevel" name="stressLevel" value={formData.stressLevel} onChange={handleChange} min="1" max="10" style={{marginTop: '0.5rem'}} />
        </div>
        
        <div className="form-group full-width" style={{marginTop: '1rem'}}>
          <button type="submit" className="btn">Generate Health Plan</button>
        </div>
      </form>
    </div>
  );
}
