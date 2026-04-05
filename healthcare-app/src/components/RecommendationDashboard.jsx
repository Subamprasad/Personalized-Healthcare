import { useEffect, useState } from 'react';
import { predictRecommendation } from '../recommendation_model';

const generateDynamicAdvice = (data, recommendation) => {
  let tips = [];

  if (recommendation === 'Weight Management & Cardio Plan') {
    tips.push(`With a BMI of ${data.bmi}, maintaining a moderate caloric deficit through balanced meals will yield the best long-term results.`);
    if (data.exerciseHours < 3) {
      tips.push(`You currently exercise ${data.exerciseHours} hours/week. Try slowly increasing this to at least 3 hours of cardiovascular activity.`);
    } else {
      tips.push(`You're already active for ${data.exerciseHours} hours/week! Consider adding 2 days of strength training to build metabolism-boosting muscle.`);
    }
    tips.push("Ensure you stay hydrated and replace processed sugars with whole, fiber-rich foods.");
  } 
  else if (recommendation === 'Stress Reduction & Sleep Therapy Plan') {
    if (data.stressLevel > 6) {
      tips.push(`Your stress level is currently recorded at ${data.stressLevel}/10. Implementing daily mindfulness or deep-breathing exercises is essential.`);
    }
    if (data.sleepHours < 7) {
      tips.push(`Getting only ${data.sleepHours} hours of sleep prevents proper nervous system recovery. Commit to a 7-9 hour sleep window in a cool, dark room.`);
    } else {
      tips.push(`You get a healthy ${data.sleepHours} hours of sleep. To further reduce stress, limit caffeine and screen-time 60 minutes prior to bedtime.`);
    }
    tips.push("Focus on magnesium-rich foods to naturally calm your nervous system throughout the day.");
  }
  else if (recommendation === 'High Performance & Nutrition Maintenance') {
    tips.push(`Your health metrics are excellent! At ${data.age} years old, your focus should be on maintaining this momentum.`);
    tips.push(`With your high activity level (${data.exerciseHours} hours/week), prioritize macronutrient-dense meals for peak muscle recovery.`);
    tips.push("Consider incorporating active recovery days (like light yoga or swimming) to prevent physical burnout and joint stress.");
  }
  else if (recommendation === 'Senior Wellness & Joint Care Plan') {
    tips.push(`At ${data.age} years old, prioritizing longevity and joint health is the most critical metric.`);
    if (data.exerciseHours > 4) {
      tips.push(`You are highly active! Stick to low-impact exercises like swimming or yoga to protect cartilage while staying fit.`);
    } else {
      tips.push("Try to incorporate light, low-impact daily walks or water aerobics to keep joints lubricated and mobile.");
    }
    tips.push("Ensure a calcium-rich diet accompanied by Vitamin D to maintain strong bone density.");
    tips.push("Emphasize balance and flexibility training daily to improve overall mobility and prevent accidental falls.");
  }
  else {
    // General Balanced Health Routine
    tips.push(`Your baseline metrics are well-balanced for someone who is ${data.age} years old.`);
    tips.push(`Since you sleep ${data.sleepHours} hours, continue to maintain a strict circadian rhythm.`);
    tips.push(`Combine your ${data.exerciseHours} hours of weekly activity with full-body stretching and mobility work.`);
    if (data.stressLevel > 5) {
      tips.push(`Your stress level is moderate (${data.stressLevel}/10). Make sure to set firm work-life boundaries.`);
    } else {
      tips.push("Eat a varied, colorful diet rich in leafy greens, whole grains, and healthy fats to maintain this great baseline.");
    }
  }

  return tips;
};

export default function RecommendationDashboard({ data, onReset }) {
  const [recommendation, setRecommendation] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate slight loading for dramatic effect
    const timer = setTimeout(() => {
      try {
        const result = predictRecommendation(
          data.age,
          data.bmi,
          data.sleepHours,
          data.exerciseHours,
          data.stressLevel
        );
        setRecommendation(result);
      } catch (err) {
        console.error("Prediction error:", err);
        setRecommendation("General Balanced Health Routine");
      }
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [data]);

  const adviceList = recommendation ? generateDynamicAdvice(data, recommendation) : [];

  return (
    <div className="glass-panel" style={{minWidth: '100%'}}>
      <h2 style={{fontSize: '2rem', marginBottom: '0.5rem'}}>Analysis Complete</h2>
      <p className="subtitle">Based on your metabolic and lifestyle profile.</p>
      
      <div className="metric-grid">
        <div className="metric-card">
          <div className="metric-value">{data.age}</div>
          <div className="metric-label">Years Old</div>
        </div>
        <div className="metric-card">
          <div className="metric-value">{data.bmi}</div>
          <div className="metric-label">BMI</div>
        </div>
        <div className="metric-card">
          <div className="metric-value">{data.sleepHours}h</div>
          <div className="metric-label">Daily Sleep</div>
        </div>
        <div className="metric-card">
          <div className="metric-value">{data.exerciseHours}h</div>
          <div className="metric-label">Weekly Activity</div>
        </div>
        <div className="metric-card">
          <div className="metric-value">{data.stressLevel}/10</div>
          <div className="metric-label">Stress Level</div>
        </div>
      </div>

      <div className="dashboard-result">
        {loading ? (
          <div style={{margin: '3rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div className="loader" style={{border: '4px solid rgba(255,255,255,0.1)', borderTop: '4px solid var(--primary-color)', borderRadius: '50%', width: '40px', height: '40px', animation: 'spin 1s linear infinite'}}></div>
            <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
            <p style={{marginTop: '1rem', color: 'var(--text-muted)'}}>AI analyzing your profile...</p>
          </div>
        ) : (
          <div className="result-card" style={{textAlign: 'left'}}>
            <h3 style={{color: 'rgb(203, 213, 225)', textTransform: 'uppercase', fontSize: '0.9rem', letterSpacing: '0.1em', textAlign: 'center'}}>Recommended Plan</h3>
            <div className="result-title" style={{textAlign: 'center'}}>{recommendation}</div>
            
            <div style={{marginTop: '1.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '1.5rem'}}>
              <h4 style={{color: '#818cf8', marginBottom: '1rem', fontSize: '1.1rem'}}>Actionable Advice:</h4>
              <ul style={{listStyleType: 'none', padding: 0, margin: 0}}>
                {adviceList.map((item, index) => (
                  <li key={index} style={{marginBottom: '0.8rem', paddingLeft: '1.5rem', position: 'relative', lineHeight: 1.5, color: '#f8fafc', fontSize: '0.95rem'}}>
                    <span style={{position: 'absolute', left: 0, top: '2px', color: '#10b981'}}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      <button onClick={onReset} className="btn btn-secondary">Analyze Another Profile</button>
    </div>
  );
}
