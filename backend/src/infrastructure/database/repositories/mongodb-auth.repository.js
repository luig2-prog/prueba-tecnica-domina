const AuthRepository = require('../../../core/ports/driven/auth.repository');
const UserModel = require('../mongodb/models/user.model');
const UserEntity = require('../../../core/entities/user.entity');

class MongoDBAuthRepository extends AuthRepository {
  async createUser(user) {
    const newUser = new UserModel({ username: user.username, password: user.password });
    const savedUser = await newUser.save();
    return new UserEntity(savedUser._id, savedUser.username, savedUser.password);
  }

  async findUserByUsername(username) {
    const user = await UserModel.findOne({ username });
    if (!user) return null;
    return new UserEntity(user._id, user.username, user.password);
  }

  async findUserById(id) {
    const user = await UserModel.findById(id);
    if (!user) return null;
    return new UserEntity(user._id, user.username, user.password);
  }
}

module.exports = MongoDBAuthRepository;