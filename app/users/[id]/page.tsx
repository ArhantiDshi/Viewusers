"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Counter from "@/components/Counter";

type User = {
  id: number;
  name: string;
  email: string;
  phone?: string;
  website?: string;
};

export default function UserPage() {
  const params = useParams();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/users/${params.id}`);
      
      if (!res.ok) {
        throw new Error('User not found');
      }
      
      const data = await res.json();
      setUser(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load user');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center"
        >
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">User Not Found</h1>
          <p className="text-gray-600 mb-6">{error || 'The user you are looking for does not exist.'}</p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition shadow-lg"
          >
            Back to Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 md:p-8">
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => router.push('/')}
        className="mb-6 px-4 py-2 bg-white/80 backdrop-blur-sm text-gray-700 font-semibold rounded-lg hover:bg-white transition shadow-md flex items-center gap-2"
      >
        ← Back to Directory
      </motion.button>

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24" />
            
            <div className="relative z-10 flex items-center gap-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-xl"
              >
                <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </motion.div>
              
              <div>
                <motion.h1
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl font-bold text-white mb-2"
                >
                  {user.name}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-blue-100 text-lg"
                >
                  User ID: #{user.id}
                </motion.p>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8 md:p-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border-2 border-blue-200"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">📧</span>
                    <h3 className="font-semibold text-gray-700">Email</h3>
                  </div>
                  <p className="text-gray-800 font-medium break-all">{user.email}</p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl border-2 border-green-200"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">📱</span>
                    <h3 className="font-semibold text-gray-700">Phone</h3>
                  </div>
                  <p className="text-gray-800 font-medium">{user.phone || 'Not provided'}</p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl border-2 border-purple-200 md:col-span-2"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">🌐</span>
                    <h3 className="font-semibold text-gray-700">Website</h3>
                  </div>
                  {user.website ? (
                    <a
                      href={user.website.startsWith('http') ? user.website : `https://${user.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 font-medium hover:underline break-all"
                    >
                      {user.website}
                    </a>
                  ) : (
                    <p className="text-gray-800 font-medium">Not provided</p>
                  )}
                </motion.div>
              </div>

              {/* Interactive Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-8 pt-8 border-t-2 border-gray-200"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Interactive Demo</h2>
                <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 rounded-2xl border-2 border-indigo-200">
                  <Counter />
                  <div className="mt-4 pt-4 border-t border-indigo-200">
                    <p className="text-gray-600 text-sm">
                      Current time: <span className="font-semibold text-gray-800">{new Date().toLocaleTimeString()}</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
