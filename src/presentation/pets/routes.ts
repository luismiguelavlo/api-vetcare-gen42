import { Request, Response, Router } from "express";
import { PetController } from "./controller";

export class PetRoutes {
  static get routes(): Router {
    const router = Router();

    const controller = new PetController();

    router.get("/", controller.findAllPets);
    router.post("/", controller.createPet);
    //get por id
    //router.get("/:id");
    //patch por id
    //delete por id

    return router;
  }
}
