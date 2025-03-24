import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTask } from '../../hooks/useTask.jsx';

function TaskList() {
  const { tasks, error, taskService, setTasks, setError, toggleTaskCompletion } = useTask();
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/tasks/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
      try {
        const token = localStorage.getItem('token');
        await taskService.deleteTask(id, token);
        setTasks(tasks.filter((task) => task.id !== id));
      } catch (err) {
        setError(err.message || 'Error al eliminar la tarea');
      }
    }
  };

  const handleToggleCompletion = async (id, completed) => {
    try {
      await toggleTaskCompletion(id, !completed);
    } catch (err) {
      setError(err.message || 'Error al actualizar el estado de la tarea');
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-3xl font-semibold mb-6 text-center">Lista de Tareas</h2>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      <div className="mb-6 text-center">
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
          onClick={() => navigate('/tasks/add')}
        >
          Agregar Nueva Tarea
        </button>
      </div>
      {tasks.length === 0 ? (
        <p className="text-center text-gray-600">No hay tareas pendientes.</p>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li key={task.id} className="bg-white rounded-md shadow-md p-6 flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h3 className="font-semibold text-xl">{task.title}</h3>
                {task.description && <p className="text-gray-600 text-sm mt-2">{task.description}</p>}
              </div>
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                <button
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => handleEdit(task.id)}
                >
                  Editar
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => handleDelete(task.id)}
                >
                  Eliminar
                </button>
                <button
                  className={`ml-2 ${task.completed ? 'bg-gray-500' : 'bg-blue-500'} hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                  onClick={() => handleToggleCompletion(task.id, task.completed)}
                >
                  {task.completed ? 'Marcar como Incompleta' : 'Marcar como Completa'}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;