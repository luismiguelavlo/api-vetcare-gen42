import { CreatePetDto, CustomError } from '../../../domain';
import { FinderPetService } from './finder-pet.service';

export class UpdatePetService {
  constructor(private readonly finderPetService: FinderPetService) {}

  async execute(id: string, data: CreatePetDto) {
    const pet = await this.finderPetService.executeByFindOne(id);

    pet.weight = data.weight;
    pet.breed = data.breed;

    try {
      await pet!.save();
      return {
        message: 'Pet updated successfully',
      };
    } catch (error) {
      throw CustomError.internalServer('Something went very wrong!');
    }
  }
}
