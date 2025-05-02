import { Request, Response } from "express";

interface Pet {
  id: number;
  name: string;
  breed: string;
}

const pets: Pet[] = [
  {
    id: 1,
    name: "teddy",
    breed: "bulldog",
  },
  {
    id: 2,
    name: "pelusa",
    breed: "siames",
  },
  {
    id: 3,
    name: "atena",
    breed: "pastor collie",
  },
];

export const findAllPets = (req: Request, res: Response) => {
  return res.status(200).json(pets);
};

export const createPet = (req: Request, res: Response) => {
  pets.push(req.body);
  return res.status(201).json({
    message: "Pet created successfully",
  });
};
