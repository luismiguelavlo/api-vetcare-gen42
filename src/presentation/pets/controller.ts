import { Request, Response } from 'express';
import { CreatorPetService } from './services/create-pet.service';
import { FinderPetService } from './services/finder-pet.service';
import { DeletePetService } from './services/delete-pet.service';
import { UpdatePetService } from './services/update-pet.service';
import { handleError } from '../common/handleError';
import { CreatePetDto } from '../../domain';

export class PetController {
  constructor(
    private readonly creatorPetService: CreatorPetService,
    private readonly finderPetService: FinderPetService,
    private readonly deletePetService: DeletePetService,
    private readonly updatePetService: UpdatePetService
  ) {}

  createPet = (req: Request, res: Response) => {
    const [error, data] = CreatePetDto.execute(req.body);

    if (error) {
      return res.status(422).json({
        status: 'error',
        message: error,
      });
    }

    this.creatorPetService
      .execute(data!)
      .then((result) => res.status(201).json(result))
      .catch((error) => handleError(error, res));
  };

  findAllPets = (req: Request, res: Response) => {
    this.finderPetService
      .executeByFindAll()
      .then((result) => res.status(200).json(result))
      .catch((error) => handleError(error, res));
  };

  findOne = (req: Request, res: Response) => {
    const { id } = req.params;

    this.finderPetService
      .executeByFindOne(id)
      .then((result) => res.status(200).json(result))
      .catch((error) => handleError(error, res));
  };

  delete = (req: Request, res: Response) => {
    const { id } = req.params;

    this.deletePetService
      .execute(id)
      .then((result) => res.status(200).json(result))
      .catch((error) => handleError(error, res));
  };

  update = (req: Request, res: Response) => {
    const { id } = req.params;
    const [error, data] = CreatePetDto.execute(req.body);

    if (error) {
      return res.status(422).json({
        status: 'error',
        message: error,
      });
    }

    this.updatePetService
      .execute(id, data!)
      .then((result) => res.status(200).json(result))
      .catch((error) => handleError(error, res));
  };
}
