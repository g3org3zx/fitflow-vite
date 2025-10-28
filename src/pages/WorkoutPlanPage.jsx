import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  Dumbbell,
  Salad,
  User,
  Droplet,
  LogOut,
  PlusCircle,
} from "lucide-react";

const WorkoutPlanPage = () => {
  const navigate = useNavigate();
  const [exercises, setExercises] = useState([]);
  const [customWorkouts, setCustomWorkouts] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newWorkout, setNewWorkout] = useState({
    name: "",
    sets: "",
    reps: "",
    muscleGroup: "",
  });
  const [timers, setTimers] = useState({});
  const [isRunning, setIsRunning] = useState({});
  const [completedWorkouts, setCompletedWorkouts] = useState([]);

  // Default exercises
  const baseExercises = [
    { name: "Shoulder Press", muscleGroup: "Shoulders", sets: 3, reps: 10, videoUrl: "https://www.youtube.com/embed/B-aVuyhvLHU" },
    { name: "Lateral Raises", muscleGroup: "Shoulders", sets: 3, reps: 12, videoUrl: "https://www.youtube.com/embed/3VcKaXpzqRo" },
    { name: "Pull-Ups", muscleGroup: "Upper Back", sets: 3, reps: 8, videoUrl: "https://www.youtube.com/embed/eGo4IYlbE5g" },
    { name: "Romanian Deadlift", muscleGroup: "Hamstrings", sets: 3, reps: 8, videoUrl: "https://www.youtube.com/embed/7j-2Z0E4J3A" },
    { name: "Standing Calf Raises", muscleGroup: "Calves", sets: 4, reps: 15, videoUrl: "https://www.youtube.com/embed/YMmgqO8Jo-k" },
    { name: "Plank Hold", muscleGroup: "Core", sets: 3, reps: "Hold 30s", videoUrl: "https://www.youtube.com/embed/pSHjTRCQxIw" },
    { name: "Bicep Curls", muscleGroup: "Arms", sets: 3, reps: 12, videoUrl: "https://www.youtube.com/embed/in7PaeYlhrM" },
    { name: "Tricep Dips", muscleGroup: "Arms", sets: 3, reps: 10, videoUrl: "https://www.youtube.com/embed/6kALZikXxLc" },
    { name: "Mountain Climbers", muscleGroup: "Full Body Cardio", sets: 3, reps: "30s", videoUrl: "https://www.youtube.com/embed/nmwgirgXLYM" },
    { name: "Leg Press", muscleGroup: "Legs", sets: 4, reps: 10, videoUrl: "https://www.youtube.com/embed/IZxyjW7MPJQ" },
  ];

  useEffect(() => setExercises(baseExercises), []);

  // Timer logic
  const toggleTimer = (idx) => setIsRunning((prev) => ({ ...prev, [idx]: !prev[idx] }));
  const resetTimer = (idx) => {
    setIsRunning((prev) => ({ ...prev, [idx]: false }));
    setTimers((prev) => ({ ...prev, [idx]: 0 }));
  };

  useEffect(() => {
    const intervals = Object.keys(isRunning).map((key) => {
      if (isRunning[key]) {
        return setInterval(() => {
          setTimers((prev) => ({ ...prev, [key]: (prev[key] || 0) + 1 }));
        }, 1000);
      }
      return null;
    });
    return () => intervals.forEach((int) => clearInterval(int));
  }, [isRunning]);

  const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  // Custom workout handler
  const handleAddWorkout = () => {
    if (!newWorkout.name) return;
    setCustomWorkouts([...customWorkouts, newWorkout]);
    setNewWorkout({ name: "", sets: "", reps: "", muscleGroup: "" });
    setIsAdding(false);
  };

  // Completion logic
  const handleComplete = (exercise, timeSpent) => {
    const calories = Math.floor((timeSpent / 60) * 5);
    const record = { ...exercise, timeSpent, calories, date: new Date().toISOString() };
    const updated = [...completedWorkouts, record];
    setCompletedWorkouts(updated);
    localStorage.setItem("fitflow_completedWorkouts", JSON.stringify(updated));
  };

  return (
    <div className="flex min-h-screen bg-[#0f0f10] text-gray-100 transition-all duration-500">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-20 bg-[#161616] border-r border-[#2a2a2d] text-white items-center py-6 space-y-8 shadow-xl transition-all duration-500 hover:w-24">
        <h1
          className="text-2xl font-extrabold mb-10 text-purple-400 cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          🏋️‍♀️
        </h1>
        <button onClick={() => navigate("/dashboard")} className="hover:text-purple-300"><Home size={22} /></button>
        <button onClick={() => navigate("/workouts")} className="text-purple-400 scale-110"><Dumbbell size={22} /></button>
        <button onClick={() => navigate("/nutrition")} className="hover:text-purple-300"><Salad size={22} /></button>
        <button onClick={() => navigate("/hydration")} className="hover:text-purple-300"><Droplet size={22} /></button>
        <div className="mt-auto space-y-6">
          <button onClick={() => navigate("/profile")} className="hover:text-purple-300"><User size={22} /></button>
          <button className="hover:text-red-400"><LogOut size={22} /></button>
        </div>
      </aside>

      {/* Main Section */}
      <div className="flex-1 flex flex-col">
        <header className="flex justify-between items-center bg-[#161616] border-b border-[#2a2a2d] px-6 py-4 shadow-lg">
          <h1 className="text-3xl font-bold text-purple-300 tracking-wide">FitFlow Workouts</h1>
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 bg-[#29292b] hover:bg-[#3a3a3d] text-purple-300 px-4 py-2 rounded-md transition-all"
          >
            <PlusCircle size={18} /> Add Workout
          </button>
        </header>

        <main className="p-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exercises.concat(customWorkouts).map((ex, idx) => (
            <div
              key={idx}
              className="bg-[#1a1a1d] border border-[#2a2a2d] rounded-xl p-4 shadow-md hover:shadow-purple-800/20 transition-all transform hover:-translate-y-1 duration-300"
            >
              <h3 className="text-xl font-semibold text-gray-200">{ex.name}</h3>
              <p className="text-sm text-gray-400">{ex.muscleGroup}</p>
              <p className="text-xs text-gray-500 mb-2">Sets: {ex.sets} | Reps: {ex.reps}</p>

              {ex.videoUrl && (
                <iframe
                  width="100%"
                  height="180"
                  src={ex.videoUrl}
                  title={ex.name}
                  frameBorder="0"
                  allowFullScreen
                  className="rounded-lg mb-3"
                ></iframe>
              )}

              <p className="text-center text-purple-300 font-semibold mb-2">
                ⏱ {formatTime(timers[idx] || 0)}
              </p>
              <div className="flex space-x-2">
                <button
                  onClick={() => toggleTimer(idx)}
                  className={`flex-1 ${
                    isRunning[idx]
                      ? "bg-yellow-500 hover:bg-yellow-400"
                      : "bg-purple-700 hover:bg-purple-600"
                  } text-white py-2 rounded-md text-sm transition-all`}
                >
                  {isRunning[idx] ? "Pause" : "Start"}
                </button>
                <button
                  onClick={() => {
                    resetTimer(idx);
                    handleComplete(ex, timers[idx] || 0);
                  }}
                  className="flex-1 bg-[#2a2a2d] hover:bg-[#3a3a3d] text-purple-300 py-2 rounded-md text-sm transition-all"
                >
                  Finish
                </button>
              </div>
            </div>
          ))}
        </main>

        {/* Add Custom Workout Modal */}
        {isAdding && (
          <div className="fixed inset-0 bg-black/60 flex justify-center items-center">
            <div className="bg-[#161616] border border-[#2a2a2d] text-gray-100 rounded-lg shadow-2xl p-6 w-96">
              <h3 className="text-lg font-semibold text-purple-300 mb-4">Add Custom Workout</h3>
              <input
                type="text"
                placeholder="Workout Name"
                value={newWorkout.name}
                onChange={(e) => setNewWorkout({ ...newWorkout, name: e.target.value })}
                className="bg-[#0f0f10] border border-[#2a2a2d] p-2 w-full mb-2 rounded text-gray-200 placeholder-gray-500"
              />
              <input
                type="text"
                placeholder="Muscle Group"
                value={newWorkout.muscleGroup}
                onChange={(e) => setNewWorkout({ ...newWorkout, muscleGroup: e.target.value })}
                className="bg-[#0f0f10] border border-[#2a2a2d] p-2 w-full mb-2 rounded text-gray-200 placeholder-gray-500"
              />
              <div className="flex space-x-2 mb-4">
                <input
                  type="number"
                  placeholder="Sets"
                  value={newWorkout.sets}
                  onChange={(e) => setNewWorkout({ ...newWorkout, sets: e.target.value })}
                  className="bg-[#0f0f10] border border-[#2a2a2d] p-2 w-1/2 rounded text-gray-200"
                />
                <input
                  type="number"
                  placeholder="Reps"
                  value={newWorkout.reps}
                  onChange={(e) => setNewWorkout({ ...newWorkout, reps: e.target.value })}
                  className="bg-[#0f0f10] border border-[#2a2a2d] p-2 w-1/2 rounded text-gray-200"
                />
              </div>
              <div className="flex justify-between">
                <button
                  onClick={() => setIsAdding(false)}
                  className="px-4 py-2 bg-[#2a2a2d] hover:bg-[#3a3a3d] rounded text-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddWorkout}
                  className="px-4 py-2 bg-purple-700 hover:bg-purple-600 rounded text-white"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkoutPlanPage;
