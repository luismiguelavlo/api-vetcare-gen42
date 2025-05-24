import { Request, Response } from 'express';
import { CreatorAppointmentService } from './services/creator-appointment.service';
import { CreateAppointmentDto } from '../../domain';
import { handleError } from '../common/handleError';
import { FinderAppointmentService } from './services/finder-appointment.service';

export class AppointmentController {
  constructor(
    private readonly creatorAppointmentService: CreatorAppointmentService,
    private readonly finderAppointmentService: FinderAppointmentService
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

  getAppointmentByTerm = (req: Request, res: Response) => {
    const { term, id } = req.params;
    const { status = 'pending' } = req.query;

    this.finderAppointmentService
      .execute(term, status as string, id)
      .then((data) => res.status(200).json(data))
      .catch((err) => handleError(err, res));
  };
}
