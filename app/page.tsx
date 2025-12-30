"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import UserCard from "@/components/UserCard";
import UserForm from "@/components/UserForm";

export type User = {
  id: number;
  name: string;
  email: string;
  phone?: string;
  website?: string;
};

export default function HomePage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/users');
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (userData: Omit<User, 'id'>) => {
    try {
      setIsSubmitting(true);
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (res.ok) {
        await fetchUsers();
        setShowForm(false);
      }
    } catch (error) {
      console.error('Failed to create user:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (userData: Omit<User, 'id'>) => {
    if (!editingUser) return;

    try {
      setIsSubmitting(true);
      const res = await fetch(`/api/users/${editingUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (res.ok) {
        await fetchUsers();
        setEditingUser(undefined);
      }
    } catch (error) {
      console.error('Failed to update user:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        await fetchUsers();
      }
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingUser(undefined);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-30 border-b border-gray-200"
      >
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              >
                User Directory
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-gray-600 mt-1 text-sm lg:text-base"
              >
                Manage your users with style ✨
              </motion.p>
            </div>
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowForm(true)}
              className="px-4 lg:px-6 py-2 lg:py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition shadow-lg hover:shadow-xl text-sm lg:text-base"
            >
              <span className="hidden sm:inline">➕ Add New User</span>
              <span className="sm:hidden">➕ Add</span>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="container mx-auto px-4 lg:px-8 py-8 lg:py-12">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full"
            />
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {users.map((user, index) => (
                <UserCard
                  key={user.id}
                  user={user}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  index={index}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {!loading && users.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">👤</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No users yet</h2>
            <p className="text-gray-600">Click "Add New User" to get started!</p>
          </motion.div>
        )}
      </main>

      {/* Forms */}
      <AnimatePresence>
        {showForm && (
          <UserForm
            onSubmit={handleCreate}
            onCancel={handleCancel}
            isSubmitting={isSubmitting}
          />
        )}
        {editingUser && (
          <UserForm
            user={editingUser}
            onSubmit={handleUpdate}
            onCancel={handleCancel}
            isSubmitting={isSubmitting}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
