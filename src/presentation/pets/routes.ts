import { Request, Response, Router } from "express";
import { PetController } from "./controller";
import { CreatorPetService } from "./services/create-pet.service";
import { FinderPetService } from "./services/finder-pet.service";
import { DeletePetService } from "./services/delete-pet.service";
import { UpdatePetService } from "./services/update-pet.service";

export class PetRoutes {
  static get routes(): Router {
    const router = Router();

    const createPetService = new CreatorPetService();
    const finderPetService = new FinderPetService();
    const deletePetService = new DeletePetService();
    const updatePetService = new UpdatePetService();
    const controller = new PetController(
      createPetService,
      finderPetService,
      deletePetService,
      updatePetService
    );

    router.get("/", controller.findAllPets);
    router.post("/", controller.createPet);
    router.get("/:id", controller.findOne);
    router.patch("/:id", controller.update);
    router.delete("/:id", controller.delete);

    return router;
  }
}
