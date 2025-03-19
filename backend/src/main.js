const {
  connectAuthDB,
  connectTasksDB,
} = require("./infrastructure/database/mongodb/mongodb.connection");
const createServer = require("./infrastructure/web/server");
const config = require("./config/config");
const MongoDBAuthRepository = require("./infrastructure/database/repositories/mongodb-auth.repository");
const MongoDBTaskRepository = require("./infrastructure/database/repositories/mongodb-task.repository");
const RegisterUserUseCase = require("./core/use-cases/register-user.use-case");
const LoginUserUseCase = require("./core/use-cases/login-user.use-case");
const CreateTaskUseCase = require("./core/use-cases/create-task.use-case");
const GetTasksUseCase = require("./core/use-cases/get-tasks.use-case");
const UpdateTaskUseCase = require("./core/use-cases/update-task.use-case");
const DeleteTaskUseCase = require("./core/use-cases/delete-task.use-case");
const ToggleTaskCompletionUseCase = require("./core/use-cases/toggle-task-completion.use-case");
const AuthController = require("./core/ports/driver/auth.controller");
const TaskController = require("./core/ports/driver/task.controller");
const authRoutes = require("./infrastructure/web/routes/auth.routes");
const taskRoutes = require("./infrastructure/web/routes/task.routes");
const authMiddleware = require("./infrastructure/web/middlewares/auth.middleware");

async function main() {
  await connectAuthDB();
  const tasksConnection = await connectTasksDB();

  const authRepository = new MongoDBAuthRepository();
  const taskRepository = new MongoDBTaskRepository(tasksConnection);

  const registerUserUseCase = new RegisterUserUseCase(authRepository);
  const loginUserUseCase = new LoginUserUseCase(authRepository);
  const createTaskUseCase = new CreateTaskUseCase(taskRepository);
  const getTasksUseCase = new GetTasksUseCase(taskRepository);
  const updateTaskUseCase = new UpdateTaskUseCase(taskRepository);
  const deleteTaskUseCase = new DeleteTaskUseCase(taskRepository);
  const toggleTaskCompletionUseCase = new ToggleTaskCompletionUseCase(taskRepository);

  const authController = new AuthController(registerUserUseCase, loginUserUseCase);
  const taskController = new TaskController(
    createTaskUseCase,
    getTasksUseCase,
    updateTaskUseCase,
    deleteTaskUseCase,
    toggleTaskCompletionUseCase
  );

  const app = createServer();

  authRoutes(app, authController);
  taskRoutes(app, taskController, authMiddleware);

  app.listen(config.port, () => {
    console.log(`Backend server listening on port ${config.port}`);
  });
}

main().catch((error) => {
  console.error("Error starting the application:", error);
  process.exit(1);
});
