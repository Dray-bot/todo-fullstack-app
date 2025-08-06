'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Plus, Trash2 } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import { useSnackbar } from 'notistack';
import EmptyState from '../components/EmptyState';




export default function Home() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [deleteId, setDeleteId] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await axios.get(`https://todo-fullstack-app-k5wj.onrender.com/api/todos`);
      setTodos(res.data);
    } catch (error) {
      console.error('Failed to fetch todos:', error);
      enqueueSnackbar('Failed to load tasks ❌', { variant: 'error' });
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo) return;

    try {
      const res = await axios.post(`https://todo-fullstack-app-k5wj.onrender.com/api/todos`, { title: newTodo });
      setTodos([...todos, res.data]);
      setNewTodo('');
      enqueueSnackbar('Task Added ✅', { variant: 'success' });
    } catch (error) {
      console.error('Failed to add todo:', error);
      enqueueSnackbar('Failed to Add Task ❌', { variant: 'error' });
    }
  };

  const confirmDeleteTodo = async () => {
    try {
      await axios.delete(`https://todo-fullstack-app-k5wj.onrender.com/api/todos/${deleteId}`);
      setTodos(todos.filter(todo => todo._id !== deleteId));
      enqueueSnackbar('Task Deleted ❌', { variant: 'error' });
      setDeleteId(null);
    } catch (error) {
      console.error('Failed to delete todo:', error);
      enqueueSnackbar('Failed to Delete ❌', { variant: 'error' });
    }
  };

  return (
    <main className="min-h-screen bg-emerald-50 flex flex-col items-center py-12 px-4 overflow-hidden">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-gray-800 mb-8"
      >
        To-Do List
      </motion.h1>

      <motion.form
        onSubmit={addTodo}
        className="flex mb-6 w-full max-w-md"
        whileTap={{ scale: 0.95 }}
      >
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="What needs to be done?"
          className="flex-grow text-gray-700 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <button type="submit" className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-r-lg flex items-center gap-2">
          <Plus size={18} /> Add
        </button>
      </motion.form>

      {todos.length === 0 ? (
        <EmptyState />
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl">
          {todos.map((todo, index) => (
            <motion.div
              key={todo._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileTap={{ scale: 0.97 }}
              className="bg-white rounded-xl shadow-md p-4 flex justify-between items-center hover:shadow-emerald-200 hover:shadow-xl transition-all"
            >
              <span className="text-gray-700">{todo.title}</span>
              <Dialog.Root>
                <Dialog.Trigger asChild>
                  <button
                    onClick={() => setDeleteId(todo._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={20} />
                  </button>
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay className="fixed inset-0 bg-black/30" />
                  <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-xl p-6 w-80">
                    <Dialog.Title className="text-lg text-gray-700 font-semibold mb-4">Confirm Delete</Dialog.Title>
                    <p className="text-gray-600 mb-6">Are you sure you want to delete this task?</p>
                    <div className="flex justify-end gap-4">
                      <Dialog.Close asChild>
                        <button className="px-4 py-2 text-gray-700 bg-gray-300 rounded-lg">Cancel</button>
                      </Dialog.Close>
                      <Dialog.Close asChild>
                        <button
                          onClick={confirmDeleteTodo}
                          className="px-4 py-2 bg-red-500 text-white rounded-lg"
                        >
                          Delete
                        </button>
                      </Dialog.Close>
                    </div>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
            </motion.div>
          ))}
        </section>
      )}
    </main>
  );
}
