import { Router } from 'express';
import { UserController } from './controller';
import { RegisterUserService } from './services/register-user.service';

export class UserRoutes {
  static get routes(): Router {
    const router = Router();

    const registerUserService = new RegisterUserService();
    const controller = new UserController(registerUserService);

    router.post('/register', controller.register);
    router.get('/validate-account/:token', controller.validateAccount);

    return router;
  }
}
