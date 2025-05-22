import { Pet } from '../../../data';
import { CustomError } from '../../../domain';

export class FinderPetService {
  async executeByFindAll() {
    const pets = await Pet.find({
      where: {
        status: true,
      },
    });
    return pets;
  }

  async executeByFindOne(id: string) {
    const pet = Pet.createQueryBuilder('pet')
      .where('pet.id = :petId', { petId: id })
      .andWhere('pet.status = :status', { status: true })
      .getOne();

    if (!pet) {
      throw CustomError.notFound('Pet not found');
    }

    return pet;
  }
}
