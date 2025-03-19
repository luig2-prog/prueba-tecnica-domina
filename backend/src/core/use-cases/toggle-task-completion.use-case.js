class ToggleTaskCompletionUseCase {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  async execute(id, userId, completed) {
    const existingTask = await this.taskRepository.getTaskById(id);
    if (!existingTask || existingTask.userId !== userId) {
      throw new Error('Task not found or unauthorized');
    }
    existingTask.completed = completed;
    existingTask.updatedAt = new Date();
    return this.taskRepository.updateTask(existingTask);
  }
}

module.exports = ToggleTaskCompletionUseCase;
