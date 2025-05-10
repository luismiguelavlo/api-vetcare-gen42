import { Request, Response } from "express";
import { CreatorPetService } from "./services/create-pet.service";
import { FinderPetService } from "./services/finder-pet.service";
import { DeletePetService } from "./services/delete-pet.service";
import { UpdatePetService } from "./services/update-pet.service";

export class PetController {
  constructor(
    private readonly creatorPetService: CreatorPetService,
    private readonly finderPetService: FinderPetService,
    private readonly deletePetService: DeletePetService,
    private readonly updatePetService: UpdatePetService
  ) {}

  createPet = (req: Request, res: Response) => {
    const data = req.body;

    this.creatorPetService
      .execute(data)
      .then((result) => res.status(201).json(result))
      .catch((error) => res.status(500).json(error));
  };

  findAllPets = (req: Request, res: Response) => {
    this.finderPetService
      .executeByFindAll()
      .then((result) => res.status(200).json(result))
      .catch((error) => res.status(500).json(error));
  };

  findOne = (req: Request, res: Response) => {
    const { id } = req.params;

    this.finderPetService
      .executeByFindOne(id)
      .then((result) => res.status(200).json(result))
      .catch((error) => res.status(500).json(error));
  };

  delete = (req: Request, res: Response) => {
    const { id } = req.params;

    this.deletePetService
      .execute(id)
      .then((result) => res.status(200).json(result))
      .catch((error) => res.status(500).json(error));
  };

  update = (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;

    this.updatePetService
      .execute(id, data)
      .then((result) => res.status(200).json(result))
      .catch((error) => res.status(500).json(error));
  };
}
