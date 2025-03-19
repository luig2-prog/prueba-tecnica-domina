class TaskRepository {
  async createTask(task) {
    throw new Error("Method createTask must be implemented");
  }

  async getTasksByUserId(userId) {
    throw new Error("Method getTasksByUserId must be implemented");
  }

  async getTaskById(id) {
    throw new Error("Method getTaskById must be implemented");
  }

  async updateTask(task) {
    throw new Error("Method updateTask must be implemented");
  }

  async deleteTask(id) {
    throw new Error("Method deleteTask must be implemented");
  }
}

module.exports = TaskRepository;
