const jwt = require('jsonwebtoken');
const config = require('../../../config/config');
const MongoDBAuthRepository = require('../../database/repositories/mongodb-auth.repository');
const FindUserByIdUseCase = require('../../../core/use-cases/find-user-by-id.use-case');

const authRepository = new MongoDBAuthRepository();
const findUserByIdUseCase = new FindUserByIdUseCase(authRepository);

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: Missing or invalid token' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    const user = await findUserByIdUseCase.execute(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized: Invalid user' });
    }
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};