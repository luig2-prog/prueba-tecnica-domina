import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTask } from '../../hooks/useTask.jsx';

function TaskForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const { tasks, createTask, updateTask } = useTask();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const task = tasks.find((task) => {
        console.log("🚀 ~ useEffect ~ task 1:", task)
        return task.id === id
      })
      console.log("🚀 ~ useEffect ~ task: 2", task)
      if (task) {
        setTitle(task.title);
        setDescription(task.description);
      }
    }
  }, [id, tasks]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const taskData = { title, description };
    try {
      if (id) {
        await updateTask(id, taskData);
      } else {
        await createTask(taskData);
      }
      navigate('/');
    } catch (err) {
      setError(err.message || `Error al ${id ? 'actualizar' : 'crear'} la tarea`);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-12 p-8 bg-white rounded-md shadow-md">
      <h2 className="text-3xl font-semibold mb-6 text-center">{id ? 'Editar Tarea' : 'Crear Nueva Tarea'}</h2>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Título:</label>
          <input
            type="text"
            id="title"
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Descripción:</label>
          <textarea
            id="description"
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
          />
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0 md:space-x-2">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {id ? 'Guardar Cambios' : 'Crear Tarea'}
          </button>
          <button
            className="inline-block align-baseline font-semibold text-sm text-gray-500 hover:text-gray-800"
            onClick={() => navigate('/')}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;