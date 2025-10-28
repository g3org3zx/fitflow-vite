import React from "react";
import { motion } from "framer-motion";
import { FaHome, FaDumbbell, FaUtensils, FaChartLine, FaUser, FaCog } from "react-icons/fa";
import { Link } from "react-router-dom";

const SettingsPage = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black text-gray-100">
      {/* Sidebar */}
      <aside className="w-20 bg-black/30 backdrop-blur-md border-r border-gray-800 flex flex-col items-center py-8">
        <Link to="/dashboard" className="mb-8 text-purple-400 text-xl font-semibold tracking-wider">
          🌀
        </Link>
        <nav className="space-y-6">
          <Link to="/dashboard" className="hover:text-purple-400"><FaHome size={20} /></Link>
          <Link to="/workouts" className="hover:text-purple-400"><FaDumbbell size={20} /></Link>
          <Link to="/diet" className="hover:text-purple-400"><FaUtensils size={20} /></Link>
          <Link to="/insights" className="hover:text-purple-400"><FaChartLine size={20} /></Link>
          <Link to="/profile" className="hover:text-purple-400"><FaUser size={20} /></Link>
          <Link to="/settings" className="text-purple-400"><FaCog size={20} /></Link>
        </nav>
      </aside>

      {/* Settings Section */}
      <motion.main
        className="flex-1 p-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-8 text-purple-300">Settings</h1>

        <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800 shadow-lg max-w-3xl space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Theme</h2>
            <select className="bg-gray-800 text-gray-200 p-3 rounded-lg w-full">
              <option>Dark Mode (Default)</option>
              <option>Light Mode</option>
            </select>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Notifications</h2>
            <label className="flex items-center gap-3">
              <input type="checkbox" defaultChecked className="accent-purple-500" />
              Enable progress notifications
            </label>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Account</h2>
            <button className="bg-purple-700 hover:bg-purple-800 px-5 py-3 rounded-lg transition">
              Manage Account
            </button>
          </div>
        </div>
      </motion.main>
    </div>
  );
};

export default SettingsPage;
