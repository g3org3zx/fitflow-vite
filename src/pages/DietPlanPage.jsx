import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

function DietPlanPage() {
  const [dailyDiet, setDailyDiet] = useState(null);
  const [mealCategories, setMealCategories] = useState([]);
  const [suggestedFoods, setSuggestedFoods] = useState([]);

  // Mock diet fetch
  const fetchDietData = async () => {
    try {
      const mockData = {
        dailyDiet: {
          title: "Today's Balanced Meal Plan",
          meal: "Grilled Chicken Salad",
          calories: "350 kcal",
          protein: "35g",
          carbs: "20g",
          fats: "12g",
          image:
            "https://images.unsplash.com/photo-1604908177225-d67c17a2d96c?auto=format&fit=crop&w=800&q=80",
        },
        mealCategories: [
          {
            name: "Breakfast",
            icon: "☕",
            examples: ["Oatmeal + Banana", "Greek Yogurt + Berries"],
          },
          {
            name: "Lunch",
            icon: "🥗",
            examples: ["Grilled Chicken + Rice", "Tuna Wrap"],
          },
          {
            name: "Dinner",
            icon: "🍛",
            examples: ["Salmon + Veggies", "Lentil Soup + Bread"],
          },
          {
            name: "Snacks",
            icon: "🍎",
            examples: ["Almonds", "Apple Slices + Peanut Butter"],
          },
        ],
        suggestedFoods: [
          {
            image:
              "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=200&q=80",
          },
          {
            image:
              "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&w=200&q=80",
          },
          {
            image:
              "https://images.unsplash.com/photo-1617196039703-6c6e7e2937b7?auto=format&fit=crop&w=200&q=80",
          },
        ],
      };

      setDailyDiet(mockData.dailyDiet);
      setMealCategories(mockData.mealCategories);
      setSuggestedFoods(mockData.suggestedFoods);
    } catch (err) {
      console.error("Error fetching diet:", err);
    }
  };

  useEffect(() => {
    fetchDietData();
  }, []);

  return (
    <div className="min-h-screen bg-[#0f0f10] text-gray-100 flex flex-col items-center py-6 px-4 transition-all duration-300">
      {/* HEADER */}
      <motion.div
        className="w-full max-w-3xl flex justify-between items-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-gray-200 tracking-wide">
          🥦 FitFlow Diet Plan
        </h1>
        <span className="text-sm text-gray-400">Today</span>
      </motion.div>

      {/* MAIN DIET CARD */}
      {dailyDiet && (
        <motion.div
          className="bg-[#18181b] w-full max-w-3xl rounded-2xl p-4 mb-8 shadow-lg hover:shadow-purple-900/20 transition"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <img
            src={dailyDiet.image}
            alt={dailyDiet.meal}
            className="w-full h-56 object-cover rounded-xl mb-4"
          />
          <h2 className="text-xl font-semibold mb-1 text-gray-100">
            {dailyDiet.meal}
          </h2>
          <p className="text-sm text-gray-400">{dailyDiet.calories}</p>

          {/* MACRONUTRIENT BAR */}
          <div className="flex justify-between text-xs mt-4 text-gray-400">
            <span>Protein: {dailyDiet.protein}</span>
            <span>Carbs: {dailyDiet.carbs}</span>
            <span>Fats: {dailyDiet.fats}</span>
          </div>

          <div className="mt-3 w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-purple-600"
              initial={{ width: 0 }}
              animate={{ width: "70%" }}
              transition={{ duration: 1.5 }}
            />
          </div>
        </motion.div>
      )}

      {/* MEAL CATEGORIES */}
      <div className="w-full max-w-3xl">
        <h2 className="text-lg font-semibold mb-4 text-gray-200">
          🍽️ Meal Categories
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {mealCategories.map((cat, i) => (
            <motion.div
              key={i}
              className="bg-[#1c1c1f] rounded-xl p-4 shadow-md hover:bg-[#222226] hover:scale-[1.02] transition duration-300"
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center mb-2">
                <span className="text-2xl mr-2">{cat.icon}</span>
                <p className="text-sm font-medium text-gray-100">{cat.name}</p>
              </div>
              <ul className="text-xs text-gray-400 space-y-1">
                {cat.examples.map((ex, idx) => (
                  <li key={idx}>• {ex}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* SUGGESTED FOODS */}
      <div className="w-full max-w-3xl mt-10">
        <h2 className="text-lg font-semibold mb-4 text-gray-200">
          🍉 Suggested Foods
        </h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {suggestedFoods.map((food, index) => (
            <motion.img
              key={index}
              src={food.image}
              alt="Food"
              className="w-28 h-28 object-cover rounded-lg hover:scale-105 transition"
              whileHover={{ rotate: 1 }}
            />
          ))}
        </div>
      </div>

      {/* NAVIGATION */}
      <motion.div
        className="mt-10 flex justify-around w-full max-w-3xl border-t border-gray-800 pt-4 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {["Dashboard", "Workout", "Diet", "Profile"].map((nav, i) => (
          <button
            key={i}
            className="text-gray-400 hover:text-purple-400 transition"
            onClick={() => {
              window.location.href = `/${nav.toLowerCase()}`;
            }}
          >
            {nav}
          </button>
        ))}
      </motion.div>
    </div>
  );
}

export default DietPlanPage;
