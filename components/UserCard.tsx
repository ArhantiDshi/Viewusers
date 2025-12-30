"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export type User = {
  id: number;
  name: string;
  email: string;
  phone?: string;
  website?: string;
};

type UserCardProps = {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
  index: number;
};

export default function UserCard({ user, onEdit, onDelete, index }: UserCardProps) {
  const [showActions, setShowActions] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
      setIsDeleting(true);
      await onDelete(user.id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -5 }}
      onHoverStart={() => setShowActions(true)}
      onHoverEnd={() => setShowActions(false)}
      className={`bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 relative overflow-hidden ${
        isDeleting ? 'opacity-50' : ''
      }`}
    >
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-bl-full" />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
              {user.name}
            </h2>
            <div className="space-y-2">
              <p className="text-sm text-gray-600 flex items-center gap-2">
                <span className="text-blue-600">📧</span>
                <span className="line-clamp-1">{user.email}</span>
              </p>
              {user.phone && (
                <p className="text-sm text-gray-600 flex items-center gap-2">
                  <span className="text-green-600">📱</span>
                  <span>{user.phone}</span>
                </p>
              )}
              {user.website && (
                <p className="text-sm text-gray-600 flex items-center gap-2">
                  <span className="text-purple-600">🌐</span>
                  <a 
                    href={user.website.startsWith('http') ? user.website : `https://${user.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-600 transition line-clamp-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {user.website}
                  </a>
                </p>
              )}
            </div>
          </div>
          
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold text-lg shadow-lg">
            {user.name.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: showActions ? 1 : 0, y: showActions ? 0 : 10 }}
          transition={{ duration: 0.2 }}
          className="flex gap-2 mt-4 pt-4 border-t border-gray-200"
        >
          <button
            onClick={() => onEdit(user)}
            disabled={isDeleting}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ✏️ Edit
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-semibold rounded-lg hover:from-red-600 hover:to-red-700 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDeleting ? '...' : '🗑️ Delete'}
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
