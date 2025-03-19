const TaskRepository = require('../../../core/ports/driven/task.repository');
const TaskModel = require('../mongodb/models/task.model');
const TaskEntity = require('../../../core/entities/task.entity');

class MongoDBTaskRepository extends TaskRepository {
  constructor(connection) {
    super();
    this.TaskModel = connection.model('Task', TaskModel.schema);
  }

  async createTask(task) {
    const newTask = new this.TaskModel({ userId: task.userId, title: task.title, description: task.description });
    const savedTask = await newTask.save();
    return new TaskEntity(savedTask._id, savedTask.userId, savedTask.title, savedTask.description, savedTask.completed, savedTask.createdAt, savedTask.updatedAt);
  }

  async getTasksByUserId(userId) {
    const tasks = await this.TaskModel.find({ userId });
    return tasks.map(task => new TaskEntity(task._id, task.userId, task.title, task.description, task.completed, task.createdAt, task.updatedAt));
  }

  async getTaskById(id) {
    const task = await this.TaskModel.findById(id);
    if (!task) return null;
    return new TaskEntity(task._id, task.userId, task.title, task.description, task.completed, task.createdAt, task.updatedAt);
  }

  async updateTask(task) {
    const updatedTask = await this.TaskModel.findByIdAndUpdate(
      task.id,
      { title: task.title, description: task.description, completed: task.completed, updatedAt: task.updatedAt },
      { new: true }
    );
    if (!updatedTask) return null;
    return new TaskEntity(updatedTask._id, updatedTask.userId, updatedTask.title, updatedTask.description, updatedTask.completed, updatedTask.createdAt, updatedTask.updatedAt);
  }

  async deleteTask(id) {
    await this.TaskModel.findByIdAndDelete(id);
  }
}

module.exports = MongoDBTaskRepository;