import { useState, useEffect } from 'react';
import { taskService } from '../services/task.service';
import { useAuth } from './useAuth.jsx';

export const useTask = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        const fetchedTasks = await taskService.getAllTasks(token);
        setTasks(fetchedTasks);
      } catch (err) {
        setError(err.message || 'Error al cargar las tareas');
      }
    };

    if (user) {
      fetchTasks();
    }
  }, [user]);

  const createTask = async (taskData) => {
    try {
      const token = localStorage.getItem('token');
      const newTask = await taskService.createTask(taskData, token);
      setTasks([...tasks, newTask]);
    } catch (err) {
      setError(err.message || 'Error al crear la tarea');
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      const token = localStorage.getItem('token');
      const updatedTask = await taskService.updateTask(id, taskData, token);
      setTasks(tasks.map((task) => (task._id === id ? updatedTask : task)));
    } catch (err) {
      setError(err.message || 'Error al actualizar la tarea');
    }
  };

  const toggleTaskCompletion = async (id, completed) => {
    try {
      const token = localStorage.getItem('token');
      const updatedTask = await taskService.toggleTaskCompletion(id, completed, token);
      setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
    } catch (err) {
      setError(err.message || 'Error al actualizar el estado de la tarea');
    }
  };

  return {
    tasks,
    error,
    createTask,
    updateTask,
    toggleTaskCompletion,
    taskService,
    setTasks,
    setError,
  };
};
