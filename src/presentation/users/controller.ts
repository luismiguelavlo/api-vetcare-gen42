import { Request, Response } from 'express';
import { RegisterUserService } from './services/register-user.service';
import { handleError } from '../common/handleError';
import { RegisterUserDto } from '../../domain';
import { LoginUserDto } from '../../domain/dtos/users/login-user.dto';
import { LoginUserService } from './services/login-user.service';

export class UserController {
  constructor(
    private readonly registerUserService: RegisterUserService,
    private readonly loginUserService: LoginUserService
  ) {}

  register = (req: Request, res: Response) => {
    const [error, data] = RegisterUserDto.execute(req.body);

    if (error) {
      return res.status(422).json({ message: error });
    }

    this.registerUserService
      .execute(data!)
      .then((message) => res.status(201).json({ ...message }))
      .catch((error) => handleError(error, res));
  };

  login = (req: Request, res: Response) => {
    const [error, data] = LoginUserDto.execute(req.body);

    if (error) {
      return res.status(422).json({ message: error });
    }

    this.loginUserService
      .execute(data!)
      .then((data) => {
        res.cookie('token', data.token, {
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
          maxAge: 3 * 60 * 60 * 1000,
        });
        res.status(201).json(data);
      })
      .catch((error) => handleError(error, res));
  };

  validateAccount = (req: Request, res: Response) => {
    const { token } = req.params;

    this.registerUserService
      .validateAccount(token)
      .then((message) => res.status(201).json({ message }))
      .catch((error) => handleError(error, res));
  };
}
