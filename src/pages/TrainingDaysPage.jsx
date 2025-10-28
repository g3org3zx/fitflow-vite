import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import fitflowLogo from '../assets/react.svg'; // 🟣 replace with your actual FitFlow logo file later

function TrainingDaysPage() {
  const [selectedDays, setSelectedDays] = useState([]);
  const navigate = useNavigate();

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const handleDaySelect = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleNext = () => {
    navigate('/login'); // Go to login page
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-slate-900 to-black flex flex-col items-center justify-center text-white p-4">
      
      {/* 🔹 Logo at the top */}
      <div className="absolute top-6 flex items-center space-x-2">
        <img src={fitflowLogo} alt="FitFlow Logo" className="w-10 h-10" />
        <h1 className="text-2xl font-bold text-purple-400">FitFlow</h1>
      </div>

      {/* 🔹 Main content */}
      <h2 className="text-3xl font-semibold mb-8 text-purple-300 mt-12">
        Choose Your Training Days
      </h2>

      <div className="w-full max-w-xs space-y-4">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => handleDaySelect(day)}
            className={`w-full py-3 rounded-lg text-white font-semibold shadow-md ${
              selectedDays.includes(day)
                ? 'bg-purple-600 scale-105'
                : 'bg-purple-500 hover:bg-purple-600'
            } transition-all duration-200`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* 🔹 Navigation button */}
      <div className="mt-10 flex justify-between items-center w-full max-w-xs">
        <span className="text-gray-400 tracking-widest">••••••••••</span>
        <button
          onClick={handleNext}
          className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center text-xl hover:bg-purple-700 hover:scale-110 transition-transform duration-200"
        >
          →
        </button>
      </div>
    </div>
  );
}

export default TrainingDaysPage;
