const express = require('express');
const router = express.Router();

module.exports = (app, taskController, authMiddleware) => {
  app.use('/tasks', authMiddleware, router);

  router.post('/', taskController.createTask.bind(taskController));
  router.get('/', taskController.getTasks.bind(taskController));
  router.put('/:id', taskController.updateTask.bind(taskController));
  router.delete('/:id', taskController.deleteTask.bind(taskController));
  router.patch('/:id/toggle', taskController.toggleTaskCompletion.bind(taskController));
};