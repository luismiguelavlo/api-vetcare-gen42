import { Request, Response } from 'express';
import { CreatorDoctorService } from './services/creator-doctor.service';
import { FinderDoctorService } from './services/finder-doctor.service';
import { handleError } from '../common/handleError';
import { CreateDoctorDto } from '../../domain';

export class DoctorController {
  constructor(
    private readonly creatorDoctorService: CreatorDoctorService,
    private readonly finderDoctorService: FinderDoctorService
  ) {}

  create = (req: Request, res: Response) => {
    const [error, data] = CreateDoctorDto.execute(req.body);

    if (error) {
      return res.status(422).json({
        message: error,
      });
    }

    this.creatorDoctorService
      .execute(data!)
      .then((data) => res.status(201).json(data))
      .catch((err) => handleError(err, res));
  };

  findAll = (req: Request, res: Response) => {
    this.finderDoctorService
      .execute()
      .then((data) => res.status(200).json(data))
      .catch((err) => handleError(err, res));
  };
}
