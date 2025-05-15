import { Request, Response, Router } from 'express';
import { PetRoutes } from './pets/routes';
import { UserRoutes } from './users/routes';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use('/api/v1/pets', PetRoutes.routes);
    router.use('/api/v1/users', UserRoutes.routes);
    //router.use("/api/v1/doctors");

    return router;
  }
}
