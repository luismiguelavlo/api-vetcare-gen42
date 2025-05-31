import { Request, Response, Router } from 'express';
import { PetRoutes } from './pets/routes';
import { UserRoutes } from './users/routes';
import { AuthMiddleware } from './common/middlewares/auth.middleware';
import { DoctorRoutes } from './doctors/routes';
import { AppointmentRoutes } from './appointments/routes';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.get('/health', (req: Request, res: Response) => {
      return res.status(200).json({
        message: 'app is running',
      });
    });

    router.use('/api/v1/pets', AuthMiddleware.protect, PetRoutes.routes);
    router.use('/api/v1/users', UserRoutes.routes);
    router.use('/api/v1/doctors', DoctorRoutes.routes);
    router.use('/api/v1/appointments', AppointmentRoutes.routes);

    return router;
  }
}
