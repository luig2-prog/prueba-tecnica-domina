class GetTasksUseCase {
    constructor(taskRepository) {
      this.taskRepository = taskRepository;
    }
  
    async execute(userId) {
      return this.taskRepository.getTasksByUserId(userId);
    }
  }
  
  module.exports = GetTasksUseCase;