import { Request, Response } from 'express';
import { RegisterUserService } from './services/register-user.service';
import { handleError } from '../common/handleError';
import { RegisterUserDto } from '../../domain';

export class UserController {
  constructor(private readonly registerUserService: RegisterUserService) {}

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

  validateAccount = (req: Request, res: Response) => {
    const { token } = req.params;

    this.registerUserService
      .validateAccount(token)
      .then((message) => res.status(201).json({ message }))
      .catch((error) => handleError(error, res));
  };
}
