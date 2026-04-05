import { useState } from 'react'
import HealthForm from './components/HealthForm'
import RecommendationDashboard from './components/RecommendationDashboard'
import './index.css'

function App() {
  const [userData, setUserData] = useState(null);

  const handleFormSubmit = (data) => {
    setUserData(data);
  };

  const handleReset = () => {
    setUserData(null);
  };

  return (
    <div className="app-container">
      {!userData ? (
        <HealthForm onSubmit={handleFormSubmit} />
      ) : (
        <RecommendationDashboard data={userData} onReset={handleReset} />
      )}
    </div>
  )
}

export default App
