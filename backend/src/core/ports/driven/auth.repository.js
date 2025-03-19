class AuthRepository {
    async createUser(user) {
      throw new Error('Method createUser must be implemented');
    }
  
    async findUserByUsername(username) {
      throw new Error('Method findUserByUsername must be implemented');
    }
  
    async findUserById(id) {
      throw new Error('Method findUserById must be implemented');
    }
  }
  
  module.exports = AuthRepository;