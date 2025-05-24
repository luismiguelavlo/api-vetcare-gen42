import { Request, Response } from 'express';
import { CreatorAppointmentService } from './services/creator-appointment.service';
import { CreateAppointmentDto } from '../../domain';
import { handleError } from '../common/handleError';

export class AppointmentController {
  constructor(
    private readonly creatorAppointmentService: CreatorAppointmentService
  ) {}

  create = (req: Request, res: Response) => {
    const [error, data] = CreateAppointmentDto.execute(req.body);

    if (error) {
      return res.status(422).json({ message: error });
    }

    this.creatorAppointmentService
      .execute(data!)
      .then((data) => res.status(201).json(data))
      .catch((err) => handleError(err, res));
  };
}
