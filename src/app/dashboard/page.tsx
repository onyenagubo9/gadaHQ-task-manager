'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

type Task = {
  id: string
  title: string
  description: string
  created_at: string
}

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(true)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const router = useRouter()

  // Get user + fetch tasks
  useEffect(() => {
    const getUserAndTasks = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }
      setUserEmail(user.email ?? null)
      fetchTasks(user.id)
    }
    getUserAndTasks()
  }, [])

  // Fetch tasks from DB
  const fetchTasks = async (userId: string) => {
    setLoading(true)
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) console.error('Error fetching tasks:', error)
    else setTasks(data || [])
    setLoading(false)
  }

  // Create or update task
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return router.push('/login')

    if (editingTask) {
      const { error } = await supabase
        .from('tasks')
        .update({ title, description })
        .eq('id', editingTask.id)
      if (error) alert(error.message)
      else {
        setEditingTask(null)
        setTitle('')
        setDescription('')
        fetchTasks(user.id)
      }
    } else {
      const { error } = await supabase.from('tasks').insert([
        { title, description, user_id: user.id },
      ])
      if (error) alert(error.message)
      else {
        setTitle('')
        setDescription('')
        fetchTasks(user.id)
      }
    }
  }

  // Delete a task
  const deleteTask = async (id: string) => {
    const { error } = await supabase.from('tasks').delete().eq('id', id)
    if (error) alert(error.message)
    else setTasks(tasks.filter((t) => t.id !== id))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-10">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">🗂️ Task Dashboard</h1>
            {userEmail && (
              <p className="text-sm text-gray-500">Logged in as: {userEmail}</p>
            )}
          </div>
          <button
            onClick={async () => {
              await supabase.auth.signOut()
              router.push('/login')
            }}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>

        {/* Add / Edit Task */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-6">
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
          <textarea
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition w-1/2 mr-2"
            >
              {editingTask ? 'Update Task' : 'Add Task'}
            </button>
            {editingTask && (
              <button
                type="button"
                onClick={() => {
                  setEditingTask(null)
                  setTitle('')
                  setDescription('')
                }}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition w-1/2"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* Task List */}
        {loading ? (
          <p className="text-center text-gray-500">Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p className="text-center text-gray-600">No tasks yet.</p>
        ) : (
          <ul className="space-y-3">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="p-4 border rounded-lg shadow-sm flex justify-between items-start hover:shadow-md transition"
              >
                <div>
                  <h3 className="font-semibold text-gray-800">{task.title}</h3>
                  <p className="text-sm text-gray-600">{task.description}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Created: {new Date(task.created_at).toLocaleString()}
                  </p>
                </div>
                <div className="flex flex-col gap-2 ml-3">
                 
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
