const Task = require("../entities/task.entity");

class UpdateTaskUseCase {
    constructor(taskRepository) {
      this.taskRepository = taskRepository;
    }
  
    async execute(id, userId, title, description, completed) {
      const existingTask = await this.taskRepository.getTaskById(id);
      if (!existingTask || existingTask.userId.toString() !== userId.toString()) {
        throw new Error('Task not found or unauthorized');
      }
      const updatedTask = new Task(id, userId, title, description, completed, existingTask.createdAt, new Date());
      return this.taskRepository.updateTask(updatedTask);
    }
  }
  
  module.exports = UpdateTaskUseCase;