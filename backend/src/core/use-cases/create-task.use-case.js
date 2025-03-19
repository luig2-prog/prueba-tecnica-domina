const Task = require('../entities/task.entity');

class CreateTaskUseCase {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  async execute(userId, title, description) {
    const newTask = new Task(null, userId, title, description);
    return this.taskRepository.createTask(newTask);
  }
}

module.exports = CreateTaskUseCase;