class AuthController {
    constructor(registerUserUseCase, loginUserUseCase) {
      this.registerUserUseCase = registerUserUseCase;
      this.loginUserUseCase = loginUserUseCase;
    }
  
    async register(req, res) {
      try {
        const { username, password } = req.body;
        const user = await this.registerUserUseCase.execute(username, password);
        res.status(201).json({ user });
      } catch (error) {
        console.error('Error during registration:', error);
        res.status(400).json({ message: error.message });
      }
    }
  
    async login(req, res) {
      try {
        const { username, password } = req.body;
        const { user, token } = await this.loginUserUseCase.execute(username, password);
        res.status(200).json({ user, token });
      } catch (error) {
        res.status(401).json({ message: error.message });
      }
    }
  }
  
  module.exports = AuthController;