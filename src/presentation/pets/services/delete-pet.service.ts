import { CustomError } from '../../../domain';
import { FinderPetService } from './finder-pet.service';

export class DeletePetService {
  constructor(private readonly finderPetService: FinderPetService) {}

  async execute(id: string) {
    const pet = await this.finderPetService.executeByFindOne(id);

    pet.status = false;

    try {
      await pet.save();
      return {
        message: 'Pet deleted successfully',
      };
    } catch (error) {
      throw CustomError.internalServer('Something went very wrong!');
    }
  }
}
