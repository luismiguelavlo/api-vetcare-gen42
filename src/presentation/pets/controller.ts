import { Request, Response } from "express";

export class PetController {
  constructor() {}

  createPet(req: Request, res: Response) {
    return res.status(201).json({
      message: "Pet created",
    });
  }

  findAllPets(req: Request, res: Response) {
    return res.status(200).json({
      message: "List of pets",
    });
  }
}
