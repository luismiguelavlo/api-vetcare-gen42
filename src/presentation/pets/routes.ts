import { Request, Response, Router } from 'express';
import { PetController } from './controller';
import { CreatorPetService } from './services/create-pet.service';
import { FinderPetService } from './services/finder-pet.service';
import { DeletePetService } from './services/delete-pet.service';
import { UpdatePetService } from './services/update-pet.service';
import { AuthMiddleware } from '../common/middlewares/auth.middleware';
import { UserRole } from '../../data/postgres/models/user.model';

export class PetRoutes {
  static get routes(): Router {
    const router = Router();

    const createPetService = new CreatorPetService();
    const finderPetService = new FinderPetService();
    const deletePetService = new DeletePetService(finderPetService);
    const updatePetService = new UpdatePetService(finderPetService);
    const controller = new PetController(
      createPetService,
      finderPetService,
      deletePetService,
      updatePetService
    );

    router.get(
      '/',
      AuthMiddleware.restrictTo(UserRole.ADMIN, UserRole.DOCTOR),
      controller.findAllPets
    );
    router.post('/', controller.createPet);
    router.get('/:id', controller.findOne);
    router.patch('/:id', controller.update);
    router.delete('/:id', controller.delete);

    return router;
  }
}
