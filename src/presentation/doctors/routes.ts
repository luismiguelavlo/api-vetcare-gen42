import { Router } from 'express';
import { DoctorController } from './controller';
import { CreatorDoctorService } from './services/creator-doctor.service';
import { FinderDoctorService } from './services/finder-doctor.service';

export class DoctorRoutes {
  static get routes(): Router {
    const router = Router();

    const creatorDoctorService = new CreatorDoctorService();
    const finderDoctorService = new FinderDoctorService();

    const controller = new DoctorController(
      creatorDoctorService,
      finderDoctorService
    );

    router.post('/', controller.create);
    router.get('/', controller.findAll);

    return router;
  }
}
