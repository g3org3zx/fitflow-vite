import React, { useState, useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  Dumbbell,
  Salad,
  LogOut,
  Home,
  User,
  Settings,
  BarChart3,
  Clock,
  Droplets,
} from "lucide-react";

function DashboardPage() {
  const navigate = useNavigate();
  const auth = getAuth();
  const [activeDay, setActiveDay] = useState("Mon");
  const [workouts, setWorkouts] = useState({
    Mon: [],
    Tue: [],
    Wed: [],
    Thu: [],
    Fri: [],
    Sat: [],
    Sun: [],
  });
  const [currentWorkout, setCurrentWorkout] = useState({
    type: "",
    duration: 0,
    calories: 0,
    isRunning: false,
    startTime: null,
  });
  const [completedWorkouts, setCompletedWorkouts] = useState([]);

// Load workouts from localStorage
useEffect(() => {
  const saved = JSON.parse(localStorage.getItem("fitflow_completedWorkouts")) || [];
  setCompletedWorkouts(saved);
}, []);


  // 💧 Water intake states
  const [waterIntake, setWaterIntake] = useState(0); // litres
  const waterGoal = 3; // litres goal

  // Calories burn rate (kcal/min)
  const calorieRates = {
    running: 10,
    cycling: 8,
    yoga: 5,
    lifting: 12,
    walking: 4,
  };

  const startWorkout = () => {
    setCurrentWorkout({ ...currentWorkout, isRunning: true, startTime: Date.now() });
  };

  const stopWorkout = () => {
    const elapsedMin = (Date.now() - currentWorkout.startTime) / 60000;
    const type = currentWorkout.type.toLowerCase();
    const calories = Math.round((calorieRates[type] || 6) * elapsedMin);

    const updated = {
      ...currentWorkout,
      duration: elapsedMin.toFixed(1),
      calories,
      isRunning: false,
    };

    setWorkouts((prev) => ({
      ...prev,
      [activeDay]: [...prev[activeDay], updated],
    }));

    setCurrentWorkout({ type: "", duration: 0, calories: 0, isRunning: false, startTime: null });
  };

  const handleLogout = () => {
    signOut(auth);
    navigate("/loginpage");
  };

  // ✅ Keep your useEffect exactly as it was
  useEffect(() => {
    console.log("Dashboard mounted");
  }, []);

  // 💧 Add water logic
  const addWater = (amount) => {
    setWaterIntake((prev) => Math.min(prev + amount, waterGoal));
  };

  const resetWater = () => setWaterIntake(0);

  const waterProgress = Math.min((waterIntake / waterGoal) * 100, 100);
  <div className="bg-[#1a1a1d] border border-[#2a2a2d] p-4 rounded-xl shadow-md mt-6">
  <h2 className="text-xl font-semibold text-purple-300 mb-3">Recent Workouts</h2>
  {completedWorkouts.length > 0 ? (
    <ul className="space-y-3">
      {completedWorkouts.slice(-5).reverse().map((w, i) => (
        <li key={i} className="flex justify-between text-gray-300 border-b border-[#2a2a2d] pb-2">
          <div>
            <p className="font-semibold text-gray-200">{w.name}</p>
            <p className="text-xs text-gray-500">{new Date(w.date).toLocaleString()}</p>
          </div>
          <div className="text-right">
            <p className="text-sm">{w.calories} kcal</p>
            <p className="text-xs text-gray-500">{Math.floor(w.timeSpent / 60)} min</p>
          </div>
        </li>
      ))}
    </ul>
  ) : (
    <p className="text-gray-500 text-sm">No workouts completed yet.</p>
  )}
</div>


  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#1a0033] to-[#0b001a] text-white flex">
      {/* Sidebar */}
      <aside className="w-60 bg-black bg-opacity-50 border-r border-purple-900 p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-8 text-purple-400">FitFlow</h1>
          <nav className="space-y-4">
            <button onClick={() => navigate("/dashboard")} className="flex items-center gap-3 hover:text-purple-400">
              <Home size={18} /> Dashboard
            </button>
            <button onClick={() => navigate("/workouts")} className="flex items-center gap-3 hover:text-purple-400">
              <Dumbbell size={18} /> Workouts
            </button>
            <button onClick={() => navigate("/diet")} className="flex items-center gap-3 hover:text-purple-400">
              <Salad size={18} /> Diet
            </button>
            <button onClick={() => navigate("/progress")} className="flex items-center gap-3 hover:text-purple-400">
              <BarChart3 size={18} /> Progress
            </button>
            <button onClick={() => navigate("/settings")} className="flex items-center gap-3 hover:text-purple-400">
              <Settings size={18} /> Settings
            </button>
          </nav>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-3 text-red-400 hover:text-red-500">
          <LogOut size={18} /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Dashboard</h2>
          <button
            onClick={() => navigate("/profile")}
            className="flex items-center gap-2 bg-purple-600 px-4 py-2 rounded-full hover:bg-purple-700 transition"
          >
            <User size={20} /> Profile
          </button>
        </div>

        {/* Day Selector */}
        <div className="flex space-x-3 mb-6">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`px-3 py-1 rounded-lg font-medium ${
                activeDay === day ? "bg-purple-600" : "bg-gray-800 hover:bg-gray-700"
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-900 p-6 rounded-xl shadow-lg text-center">
            <p className="text-sm text-gray-400">Calories Burned</p>
            <p className="text-3xl font-bold text-purple-400">
              {workouts[activeDay].reduce((sum, w) => sum + w.calories, 0)} kcal
            </p>
          </div>
          <div className="bg-gray-900 p-6 rounded-xl shadow-lg text-center">
            <p className="text-sm text-gray-400">Total Duration</p>
            <p className="text-3xl font-bold text-purple-400">
              {workouts[activeDay].reduce((sum, w) => sum + parseFloat(w.duration || 0), 0).toFixed(1)} min
            </p>
          </div>

          {/* 💧 Water Intake */}
          <div className="bg-gray-900 p-6 rounded-xl shadow-lg text-center">
            <p className="text-sm text-gray-400 flex justify-center items-center gap-1">
              <Droplets size={16} /> Water Intake
            </p>
            <div className="relative w-20 h-20 mx-auto my-3">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  stroke="#333"
                  strokeWidth="3"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="3"
                  strokeDasharray="100 100"
                  strokeDashoffset={100 - waterProgress}
                  transform="rotate(-90 18 18)"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-blue-400">
                {Math.round(waterProgress)}%
              </span>
            </div>
            <p className="text-sm text-gray-400 mb-2">
              {waterIntake.toFixed(1)}L / {waterGoal}L
            </p>
            <div className="flex justify-center gap-2">
              <button
                onClick={() => addWater(0.25)}
                className="bg-blue-600 px-2 py-1 rounded-lg hover:bg-blue-700 transition text-sm"
              >
                +0.25L
              </button>
              <button
                onClick={() => addWater(0.5)}
                className="bg-blue-600 px-2 py-1 rounded-lg hover:bg-blue-700 transition text-sm"
              >
                +0.5L
              </button>
              <button
                onClick={resetWater}
                className="bg-gray-700 px-2 py-1 rounded-lg hover:bg-gray-800 transition text-sm"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Workout Tracker */}
        <div className="bg-gray-900 p-6 rounded-xl shadow-lg mb-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Clock size={18} /> Add Workout
          </h3>
          <div className="flex flex-wrap gap-4 mb-4">
            <input
              type="text"
              placeholder="Workout Type (e.g. Running)"
              value={currentWorkout.type}
              onChange={(e) => setCurrentWorkout({ ...currentWorkout, type: e.target.value })}
              className="bg-gray-800 px-3 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 flex-1"
            />
            {currentWorkout.isRunning ? (
              <button
                onClick={stopWorkout}
                className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Stop
              </button>
            ) : (
              <button
                onClick={startWorkout}
                className="bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Start
              </button>
            )}
          </div>
        </div>

        {/* Workouts List */}
        <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Today's Workouts</h3>
          {workouts[activeDay].length === 0 ? (
            <p className="text-gray-400">No workouts logged for {activeDay}.</p>
          ) : (
            <ul className="space-y-2">
              {workouts[activeDay].map((w, i) => (
                <li key={i} className="flex justify-between bg-gray-800 p-3 rounded-lg">
                  <span>{w.type}</span>
                  <span>{w.duration} min</span>
                  <span>{w.calories} kcal</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}

export default DashboardPage;
