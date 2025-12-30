"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-center gap-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setCount(count - 1)}
          className="w-12 h-12 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white font-bold text-xl shadow-lg hover:shadow-xl transition flex items-center justify-center"
        >
          −
        </motion.button>

        <motion.div
          key={count}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-xl"
        >
          <span className="text-4xl font-bold text-white">{count}</span>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setCount(count + 1)}
          className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold text-xl shadow-lg hover:shadow-xl transition flex items-center justify-center"
        >
          +
        </motion.button>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setCount(0)}
        className="w-full rounded-lg bg-gradient-to-r from-gray-600 to-gray-700 px-4 py-2 text-white font-medium hover:from-gray-700 hover:to-gray-800 transition shadow-md"
      >
        Reset Counter
      </motion.button>

      <p className="text-center text-sm text-gray-600">
        You've clicked <span className="font-bold text-blue-600">{count}</span> times
      </p>
    </div>
  );
}
