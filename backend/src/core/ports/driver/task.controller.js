class TaskController {
    constructor(createTaskUseCase, getTasksUseCase, updateTaskUseCase, deleteTaskUseCase, toggleTaskCompletionUseCase) {
      this.createTaskUseCase = createTaskUseCase;
      this.getTasksUseCase = getTasksUseCase;
      this.updateTaskUseCase = updateTaskUseCase;
      this.deleteTaskUseCase = deleteTaskUseCase;
      this.toggleTaskCompletionUseCase = toggleTaskCompletionUseCase;
    }
  
    async createTask(req, res) {
      try {
        const { title, description } = req.body;
        const userId = req.userId;
        const newTask = await this.createTaskUseCase.execute(userId, title, description);
        res.status(201).json(newTask);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    }
  
    async getTasks(req, res) {
      try {
        const userId = req.userId;
        const tasks = await this.getTasksUseCase.execute(userId);
        res.status(200).json(tasks);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }
  
    async updateTask(req, res) {
      try {
        const { id } = req.params;
        const { title, description, completed } = req.body;
        const userId = req.userId; 
        const updatedTask = await this.updateTaskUseCase.execute(id, userId, title, description, completed);
        res.status(200).json(updatedTask);
      } catch (error) {
        if (error.message === 'Task not found or unauthorized') {
          return res.status(404).json({ message: error.message });
        }
        res.status(400).json({ message: error.message });
      }
    }
  
    async deleteTask(req, res) {
      try {
        const { id } = req.params;
        const userId = req.userId; 
        await this.deleteTaskUseCase.execute(id, userId);
        res.status(204).send();
      } catch (error) {
        if (error.message === 'Task not found or unauthorized') {
          return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: error.message });
      }
    }

    async toggleTaskCompletion(req, res) {
      try {
        const { id } = req.params;
        const { completed } = req.body;
        const userId = req.userId;
        const updatedTask = await this.toggleTaskCompletionUseCase.execute(id, userId, completed);
        res.status(200).json(updatedTask);
      } catch (error) {
        if (error.message === 'Task not found or unauthorized') {
          return res.status(404).json({ message: error.message });
        }
        res.status(400).json({ message: error.message });
      }
    }
  }
  
  module.exports = TaskController;