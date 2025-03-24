class DeleteTaskUseCase {
    constructor(taskRepository) {
      this.taskRepository = taskRepository;
    }
  
    async execute(id, userId) {
      const existingTask = await this.taskRepository.getTaskById(id);
      if (!existingTask || existingTask.userId.toString() !== userId.toString()) {
        throw new Error('Task not found or unauthorized');
      }
      return this.taskRepository.deleteTask(id);
    }
  }
  
  module.exports = DeleteTaskUseCase;