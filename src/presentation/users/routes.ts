import { Router } from 'express';
import { UserController } from './controller';
import { RegisterUserService } from './services/register-user.service';
import { EmailService } from '../common/services/email.service';
import { envs } from '../../config';
import { LoginUserService } from './services/login-user.service';

export class UserRoutes {
  static get routes(): Router {
    const router = Router();

    const emailService = new EmailService(
      envs.MAILER_SERVICE,
      envs.MAILER_EMAIL,
      envs.MAILER_SECRET_KEY,
      envs.SEND_MAIL
    );

    const loginUserService = new LoginUserService();
    const registerUserService = new RegisterUserService(emailService);
    const controller = new UserController(
      registerUserService,
      loginUserService
    );

    router.post('/register', controller.register);
    router.post('/login', controller.login);
    router.get('/validate-account/:token', controller.validateAccount);

    return router;
  }
}
