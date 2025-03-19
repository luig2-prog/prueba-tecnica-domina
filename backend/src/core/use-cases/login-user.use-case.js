const jwt = require('jsonwebtoken');
const config = require('../../config/config');

class LoginUserUseCase {
  constructor(authRepository) {
    this.authRepository = authRepository;
  }

  async execute(username, password) {
    console.log("🚀 ~ LoginUserUseCase ~ execute ~ username:", username)
    const user = await this.authRepository.findUserByUsername(username);
    console.log("🚀 ~ LoginUserUseCase ~ execute ~ password:", password)
    console.log("🚀 ~ LoginUserUseCase ~ execute ~ user:", user)
    if (!user) {
      throw new Error('Invalid credentials');
    }
    const isPasswordValid = password === user.password;
    console.log("🚀 ~ LoginUserUseCase ~ execute ~ isPasswordValid:", isPasswordValid)
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }
    const token = jwt.sign({ id: user.id }, config.jwtSecret, { expiresIn: '1h' });
    return { user, token };
  }
}

module.exports = LoginUserUseCase;