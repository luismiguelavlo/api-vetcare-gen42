import express, { Request, Response } from "express";
import { createPet, findAllPets } from "./routes";

const app = express();

app.use(express.json()); //* Enseñar a express a entender el formato JSON
app.use(express.urlencoded({ extended: true })); //* Enseñar a express a entender el formato URL-encoded

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

app.get("/pets", findAllPets);
app.post("/pets", createPet);

//para buscar una mascota por id
app.get("/pets/:id", (req: Request, res: Response) => {
  const petId = +req.params.id;

  const pet = pets.find((pet) => pet.id === petId);
  if (!pet) {
    return res.status(404).json({
      message: "Pet not found",
    });
  }
  return res.status(200).json(pet);
});

//hacer un endpoint para actualizar una mascota
app.patch("/pets/:id", (req: Request, res: Response) => {
  //1. obtener el id de la mascota
  const petId = +req.params.id;
  //2. buscar la mascota en el array
  const petIndex = pets.findIndex((pet) => pet.id === petId);
  //3. si la mascota no existe, devolver un error 404
  if (petIndex === -1) {
    return res.status(404).json({
      message: "Pet not found",
    });
  }
  //4. si la mascota existe, actualizarla
  pets[petIndex] = { ...pets[petIndex], ...req.body };
  //5. devolver un mensaje de exito
  return res.status(200).json({
    message: "Pet updated successfully",
  });
});

//endpoint para eliminar una mascota
app.delete("/pets/:id", (req: Request, res: Response) => {
  //1. obtener el id de la mascota que queremos eliminar
  const petId = +req.params.id;
  //2. buscar la mascota en el array
  const petIndex = pets.findIndex((pet) => pet.id === petId);
  //3. si la mascota no existe, devolver un error 404
  if (petIndex === -1) {
    return res.status(404).json({
      message: "Pet not found",
    });
  }
  //4 si la encuentra, eliminarla
  pets.splice(petIndex, 1);

  return res.status(204).json();
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
