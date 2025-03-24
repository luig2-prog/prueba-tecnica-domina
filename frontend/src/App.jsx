import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import TaskList from './components/Tasks/TaskList';
import TaskForm from './components/Tasks/TaskForm';
import { AuthProvider, useAuth } from './hooks/useAuth.jsx';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

function AppRoutes() {
  const { isAuthenticated, logout } = useAuth();

  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <nav className="bg-blue-500 text-white p-4">
          <div className="container mx-auto flex flex-wrap justify-between items-center">
            <Link to="/" className="text-xl font-bold">Gestor de tareas</Link>
            {isAuthenticated && (
              <div>
                <button onClick={logout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
                  Logout
                </button>
              </div>
            )}
          </div>
        </nav>
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<PrivateRoute><TaskList /></PrivateRoute>} />
            <Route path="/tasks/add" element={<PrivateRoute><TaskForm /></PrivateRoute>} />
            <Route path="/tasks/edit/:id" element={<PrivateRoute><TaskForm /></PrivateRoute>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;