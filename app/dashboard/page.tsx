"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

type User = {
  id: number;
  name: string;
  email: string;
};

type StatCardProps = {
  title: string;
  value: string | number;
  icon: string;
  color: string;
  delay: number;
};

function StatCard({ title, value, icon, color, delay }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ scale: 1.05, y: -5 }}
      className={`bg-gradient-to-br ${color} rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-shadow`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-white/80 text-sm font-medium mb-1">{title}</p>
          <h3 className="text-4xl font-bold text-white">{value}</h3>
        </div>
        <div className="text-5xl opacity-80">{icon}</div>
      </div>
    </motion.div>
  );
}

export default function DashboardPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/users');
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Dashboard Overview
          </h1>
          <p className="text-gray-600">Welcome back! Here's your summary.</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Users"
            value={loading ? "..." : users.length}
            icon="👥"
            color="from-blue-500 to-blue-600"
            delay={0.1}
          />
          <StatCard
            title="Active Sessions"
            value={loading ? "..." : Math.floor(users.length * 0.7)}
            icon="⚡"
            color="from-green-500 to-green-600"
            delay={0.2}
          />
          <StatCard
            title="New This Week"
            value={loading ? "..." : Math.floor(users.length * 0.2)}
            icon="📈"
            color="from-purple-500 to-purple-600"
            delay={0.3}
          />
          <StatCard
            title="Total Activity"
            value={loading ? "..." : `${users.length * 42}%`}
            icon="🎯"
            color="from-orange-500 to-orange-600"
            delay={0.4}
          />
        </div>

        {/* Recent Users Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl shadow-xl p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Recent Users</h2>
            <Link
              href="/"
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition shadow-md"
            >
              View All
            </Link>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-40">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full"
              />
            </div>
          ) : (
            <div className="space-y-4">
              {users.slice(0, 5).map((user, index) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{user.name}</h3>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                  <Link
                    href={`/users/${user.id}`}
                    className="px-4 py-2 bg-white border-2 border-blue-200 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition"
                  >
                    View
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg cursor-pointer"
          >
            <div className="text-4xl mb-3">📊</div>
            <h3 className="text-xl font-bold mb-2">View Reports</h3>
            <p className="text-blue-100 text-sm">Detailed analytics and insights</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg cursor-pointer"
          >
            <div className="text-4xl mb-3">⚙️</div>
            <h3 className="text-xl font-bold mb-2">Settings</h3>
            <p className="text-purple-100 text-sm">Customize your preferences</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg cursor-pointer"
          >
            <div className="text-4xl mb-3">📩</div>
            <h3 className="text-xl font-bold mb-2">Messages</h3>
            <p className="text-green-100 text-sm">Check your notifications</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
