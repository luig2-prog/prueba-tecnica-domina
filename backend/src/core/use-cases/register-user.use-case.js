const User = require('../entities/user.entity');

class RegisterUserUseCase {
  constructor(authRepository) {
    this.authRepository = authRepository;
  }

  async execute(username, password) {
    console.log("🚀 ~ RegisterUserUseCase ~ execute ~ username:", username)
    console.log("🚀 ~ RegisterUserUseCase ~ execute ~ password:", password)
    const existingUser = await this.authRepository.findUserByUsername(username);
    if (existingUser) {
      throw new Error('Username already exists');
    }
    const newUser = new User(null, username, password);
    return this.authRepository.createUser(newUser);
  }
}

module.exports = RegisterUserUseCase;