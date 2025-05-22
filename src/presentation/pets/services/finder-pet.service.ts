import { Pet } from '../../../data';
import { CustomError } from '../../../domain';

export class FinderPetService {
  async executeByFindAll() {
    const pets = await Pet.find({
      where: {
        status: true,
      },
      relations: ['user'],
      select: {
        user: {
          id: true,
          fullname: true,
          phone_number: true,
          photo_url: true,
          email: true,
        },
      },
    });
    return pets;
  }

  async executeByFindOne(id: string) {
    const pet = await Pet.createQueryBuilder('pet')
      .leftJoinAndSelect('pet.user', 'user')
      .select([
        'pet',
        'user.id',
        'user.fullname',
        'user.email',
        'user.phone_number',
        'user.photo_url',
      ])
      .where('pet.id = :petId', { petId: id })
      .andWhere('pet.status = :status', { status: true })
      .getOne();

    if (!pet) {
      throw CustomError.notFound('Pet not found');
    }

    return pet;
  }
}
