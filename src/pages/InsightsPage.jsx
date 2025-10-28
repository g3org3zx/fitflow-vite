import React from "react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { motion } from "framer-motion";
import { FaChartLine, FaUtensils, FaDumbbell, FaHome, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

// Register Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

function InsightsPage() {
  const weeklyProgress = [
    { week: "Oct 7", reps: 70 },
    { week: "Oct 14", reps: 100 },
    { week: "Oct 21", reps: 150 },
  ];

  const chartData = {
    labels: weeklyProgress.map((item) => item.week),
    datasets: [
      {
        label: "Completed Reps",
        data: weeklyProgress.map((item) => item.reps),
        borderColor: "#9b87f5",
        backgroundColor: "rgba(155, 135, 245, 0.15)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: "Total Reps", color: "#ccc" },
        ticks: { color: "#aaa" },
        grid: { color: "rgba(255,255,255,0.1)" },
      },
      x: {
        title: { display: true, text: "Date", color: "#ccc" },
        ticks: { color: "#aaa" },
        grid: { color: "rgba(255,255,255,0.1)" },
      },
    },
    plugins: {
      legend: { display: true, position: "bottom", labels: { color: "#ccc" } },
    },
  };

  const exercises = [
    { name: "Squats", progress: 90, target: "12 reps x 3 sets (36 total)" },
    { name: "Bench Press", progress: 80, target: "8 reps x 3 sets (24 total)" },
    { name: "Deadlifts", progress: 95, target: "6 reps x 3 sets (18 total)" },
    { name: "Pull-Ups", progress: 70, target: "8 reps x 3 sets (24 total)" },
    { name: "Planks", progress: 85, target: "30s hold x 3 sets" },
    { name: "Lunges", progress: 75, target: "10 reps x 3 sets (30 total)" },
    { name: "Burpees", progress: 65, target: "10 reps x 3 sets (30 total)" },
    { name: "Running in Place", progress: 90, target: "30s x 3 sets" },
  ];

  const weeklyIntake = 2400;
  const burnedCalories = 450;
  const tdee = 2700;
  const surplusDeficit = weeklyIntake - tdee + burnedCalories;
  const status =
    surplusDeficit < -500
      ? "Deficit (Weight Loss)"
      : surplusDeficit > 500
      ? "Surplus (Weight Gain)"
      : "Balanced";

  const calculateWeeklyLoss = () => {
    const dailyDeficit = surplusDeficit;
    const weeklyDeficit = dailyDeficit * 7;
    const lbPerWeek = Math.abs(weeklyDeficit / 3500);
    return lbPerWeek.toFixed(1);
  };

  const activityLog = [
    { date: "Oct 15", workout: "60 reps", intake: "2300 cal" },
    { date: "Oct 16", workout: "70 reps", intake: "2450 cal" },
    { date: "Oct 17", workout: "80 reps", intake: "2400 cal" },
    { date: "Oct 18", workout: "90 reps", intake: "2350 cal" },
    { date: "Oct 19", workout: "100 reps", intake: "2500 cal" },
    { date: "Oct 20", workout: "110 reps", intake: "2300 cal" },
    { date: "Oct 21", workout: "120 reps", intake: "2400 cal" },
  ];

  return (
    <div className="flex bg-[#0f0f11] min-h-screen text-gray-100">
      {/* Sidebar */}
      <aside className="w-20 md:w-60 bg-[#1a1a1d] flex flex-col p-4 space-y-6 shadow-lg">
        <h1 className="text-xl font-bold text-purple-400 hidden md:block mb-6">FitFlow</h1>
        <nav className="flex flex-col gap-4 text-gray-300">
          <Link to="/dashboard" className="flex items-center gap-2 hover:text-purple-400 transition">
            <FaHome /> <span className="hidden md:block">Dashboard</span>
          </Link>
          <Link to="/workouts" className="flex items-center gap-2 hover:text-purple-400 transition">
            <FaDumbbell /> <span className="hidden md:block">Workouts</span>
          </Link>
          <Link to="/diet" className="flex items-center gap-2 hover:text-purple-400 transition">
            <FaUtensils /> <span className="hidden md:block">Diet Plan</span>
          </Link>
          <Link to="/insights" className="flex items-center gap-2 text-purple-400">
            <FaChartLine /> <span className="hidden md:block">Progress</span>
          </Link>
          <Link to="/profile" className="flex items-center gap-2 hover:text-purple-400 transition">
            <FaUser /> <span className="hidden md:block">Profile</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <motion.h1
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold mb-6"
        >
          Fitness Insights (Oct 21, 2025)
        </motion.h1>

        {/* Chart */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-[#1c1c1f] p-6 rounded-2xl mb-8 shadow-lg"
        >
          <h2 className="text-lg font-semibold mb-4">Workout Progress</h2>
          <Line data={chartData} options={chartOptions} />
        </motion.section>

        {/* Exercise Progress */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-[#1c1c1f] p-6 rounded-2xl mb-8 shadow-lg"
        >
          <h2 className="text-lg font-semibold mb-4">Exercise Completion</h2>
          <ul className="space-y-2">
            {exercises.map((ex, i) => (
              <li key={i} className="flex justify-between bg-[#2a2a2d] p-3 rounded-lg">
                <div>
                  <p className="font-medium">{ex.name}</p>
                  <p className="text-sm text-gray-400">{ex.target}</p>
                </div>
                <p className="font-semibold text-purple-400">{ex.progress}%</p>
              </li>
            ))}
          </ul>
        </motion.section>

        {/* Diet Summary */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-[#1c1c1f] p-6 rounded-2xl mb-8 shadow-lg"
        >
          <h2 className="text-lg font-semibold mb-2">Diet Summary</h2>
          <div className="space-y-1 text-gray-300">
            <p><strong>Average Intake:</strong> {weeklyIntake} cal/day</p>
            <p><strong>TDEE:</strong> {tdee} cal/day</p>
            <p><strong>Status:</strong> {status}</p>
            <p><strong>Estimated Change:</strong> {calculateWeeklyLoss()} lb/week</p>
          </div>
        </motion.section>

        {/* Activity Log */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="bg-[#1c1c1f] p-6 rounded-2xl shadow-lg"
        >
          <h2 className="text-lg font-semibold mb-2">Recent Activity</h2>
          <ul className="space-y-2">
            {activityLog.map((log, i) => (
              <li key={i} className="bg-[#2a2a2d] p-3 rounded-lg">
                <p>
                  <strong>{log.date}</strong> — {log.workout}, {log.intake}
                </p>
              </li>
            ))}
          </ul>
        </motion.section>
      </main>
    </div>
  );
}

export default InsightsPage;
