class FindUserByIdUseCase {
  constructor(authRepository) {
    this.authRepository = authRepository;
  }

  async execute(id) {
    return this.authRepository.findUserById(id);
  }
}

module.exports = FindUserByIdUseCase;
