import { Request, Response, Router } from 'express';
import { PetRoutes } from './pets/routes';
import { UserRoutes } from './users/routes';
import { AuthMiddleware } from './common/middlewares/auth.middleware';
import { DoctorRoutes } from './doctors/routes';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use('/api/v1/pets', AuthMiddleware.protect, PetRoutes.routes);
    router.use('/api/v1/users', UserRoutes.routes);
    router.use('/api/v1/doctors', DoctorRoutes.routes);

    return router;
  }
}
