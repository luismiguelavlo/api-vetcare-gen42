import { Pet } from '../../../data';
import { CreatePetDto, CustomError } from '../../../domain';

export class CreatorPetService {
  async execute(data: CreatePetDto) {
    const pet = new Pet();
    pet.name = data.name;
    pet.breed = data.breed;
    pet.weight = data.weight;

    try {
      await pet.save();
      return {
        message: 'Pet created successfully',
      };
    } catch (error: any) {
      this.handleError(error);
    }
  }

  private handleError(error: any) {
    if (error.code === '22001') {
      throw CustomError.badRequest('Some fields are too long');
    }
    if (error.code === '23502') {
      throw CustomError.badRequest('Some fields are required');
    }
    throw CustomError.internalServer('Something went very wrong');
  }
}
