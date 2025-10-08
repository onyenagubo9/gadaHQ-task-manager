'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiCheckCircle, FiClock, FiUsers } from 'react-icons/fi'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      {/* ===== NAVBAR ===== */}
      <header className="flex justify-between items-center px-8 py-5 bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-blue-600">GadaHQ Task Manager</h1>
        <nav className="flex gap-4">
          <Link href="/login" className="text-gray-700 hover:text-blue-600 font-medium">
            Login
          </Link>
          <Link
            href="/signup"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Sign Up
          </Link>
        </nav>
      </header>

      {/* ===== HERO SECTION ===== */}
      <main className="flex flex-col items-center text-center mt-20 px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-extrabold text-gray-800"
        >
          Manage Your Tasks with <span className="text-blue-600">Ease</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4 max-w-2xl text-gray-600 text-lg"
        >
          Stay productive and organized. Track your tasks, set goals, and accomplish more every day.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 flex gap-4"
        >
          <Link
            href="/signup"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
          >
            Get Started
          </Link>
          <Link
            href="/login"
            className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-50 transition"
          >
            Login
          </Link>
        </motion.div>

        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          src="/task-dashboard-preview.png"
          alt="Task Dashboard Preview"
          className="mt-16 rounded-xl shadow-lg w-full max-w-3xl"
        />
      </main>

      {/* ===== FEATURES ===== */}
      <section className="mt-24 px-8 md:px-20 grid md:grid-cols-3 gap-10 text-center">
        {[
          {
            icon: <FiCheckCircle className="text-blue-600 text-4xl mx-auto mb-3" />,
            title: 'Organize Effortlessly',
            text: 'Create and manage your tasks with an intuitive and clean interface.',
          },
          {
            icon: <FiClock className="text-blue-600 text-4xl mx-auto mb-3" />,
            title: 'Stay on Track',
            text: 'Track your progress and complete tasks on time with daily goals.',
          },
          {
            icon: <FiUsers className="text-blue-600 text-4xl mx-auto mb-3" />,
            title: 'Collaborate Easily',
            text: 'Invite team members to view or manage shared tasks and projects.',
          },
        ].map((feature, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition"
          >
            {feature.icon}
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.text}</p>
          </motion.div>
        ))}
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="mt-24 py-6 bg-gray-100 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} GadaHQ Task Manager. All rights reserved.
      </footer>
    </div>
  )
}
