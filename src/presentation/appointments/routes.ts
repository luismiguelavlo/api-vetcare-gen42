import { Router } from 'express';
import { CreatorAppointmentService } from './services/creator-appointment.service';
import { AppointmentController } from './controller';
import { FinderPetService } from '../pets/services/finder-pet.service';
import { FinderDoctorService } from '../doctors/services/finder-doctor.service';

export class AppointmentRoutes {
  static get routes(): Router {
    const router = Router();

    const finderPetService = new FinderPetService();
    const finderDoctorService = new FinderDoctorService();
    const creatorAppointmentService = new CreatorAppointmentService(
      finderPetService,
      finderDoctorService
    );
    const controller = new AppointmentController(creatorAppointmentService);

    router.post('/', controller.create);

    return router;
  }
}
