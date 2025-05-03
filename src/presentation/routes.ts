import { Request, Response, Router } from "express";
import { PetRoutes } from "./pets/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/v1/pets", PetRoutes.routes);
    //router.use("/api/v1/users");
    //router.use("/api/v1/doctors");

    return router;
  }
}
