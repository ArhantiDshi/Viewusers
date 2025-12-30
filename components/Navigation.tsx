"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navigationItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: "📊",
    description: "Overview & Analytics"
  },
  {
    name: "Users",
    path: "/",
    icon: "👥",
    description: "User Management"
  }
];

export default function Navigation() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Menu Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-white rounded-xl shadow-lg"
      >
        <span className="text-2xl">{isCollapsed ? "☰" : "✕"}</span>
      </motion.button>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          width: isCollapsed ? 0 : 280,
          x: isCollapsed ? -280 : 0
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed left-0 top-0 h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-indigo-900 text-white shadow-2xl z-40 overflow-hidden"
      >
        <div className="flex flex-col h-full p-6">
          {/* Logo/Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-gradient-to-br from-white to-blue-100 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-2xl">🚀</span>
              </div>
              <div>
                <h1 className="text-xl font-bold">User Directory</h1>
                <p className="text-blue-200 text-xs">Management Portal</p>
              </div>
            </div>
          </motion.div>

          {/* Navigation Items */}
          <nav className="flex-1 space-y-2">
            {navigationItems.map((item, index) => {
              const isActive = pathname === item.path || 
                             (item.path === "/" && pathname.startsWith("/users")) ||
                             (item.path === "/dashboard" && pathname === "/dashboard");
              
              return (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={item.path}>
                    <motion.div
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                        isActive
                          ? "bg-white text-blue-900 shadow-lg"
                          : "bg-white/10 hover:bg-white/20"
                      }`}
                    >
                      <span className="text-2xl">{item.icon}</span>
                      <div className="flex-1">
                        <div className={`font-semibold ${isActive ? "text-blue-900" : "text-white"}`}>
                          {item.name}
                        </div>
                        <div className={`text-xs ${isActive ? "text-blue-600" : "text-blue-200"}`}>
                          {item.description}
                        </div>
                      </div>
                      {isActive && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="w-1 h-8 bg-blue-600 rounded-full"
                        />
                      )}
                    </motion.div>
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-auto pt-6 border-t border-white/20"
          >
            <div className="flex items-center gap-3 p-3 bg-white/10 rounded-xl">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center font-bold">
                A
              </div>
              <div className="flex-1">
                <div className="font-semibold text-sm">Admin User</div>
                <div className="text-xs text-blue-200">admin@example.com</div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.aside>

      {/* Toggle Button (Desktop) */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="hidden lg:block fixed left-72 top-6 z-50 p-2 bg-white rounded-full shadow-lg transition-all"
        style={{ left: isCollapsed ? "1rem" : "17.5rem" }}
      >
        <span className="text-xl">{isCollapsed ? "→" : "←"}</span>
      </motion.button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCollapsed(true)}
            className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
          />
        )}
      </AnimatePresence>
    </>
  );
}
