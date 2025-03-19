class Task {
    constructor(id, userId, title, description, completed = false, createdAt = new Date(), updatedAt = new Date()) {
      this.id = id;
      this.userId = userId;
      this.title = title;
      this.description = description;
      this.completed = completed;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
  }
  
  module.exports = Task;