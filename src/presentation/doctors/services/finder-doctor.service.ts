import { User, UserRole } from '../../../data/postgres/models/user.model';
import { CustomError } from '../../../domain';

export class FinderDoctorService {
  async execute() {
    return User.find({
      where: {
        status: true,
        rol: UserRole.DOCTOR,
      },
      select: [
        'email',
        'created_at',
        'fullname',
        'id',
        'phone_number',
        'photo_url',
      ],
    });
  }

  async executeByFindOne(id: string) {
    const doctor = await User.findOne({
      where: {
        status: true,
        rol: UserRole.DOCTOR,
        id: id,
      },
      select: [
        'email',
        'created_at',
        'fullname',
        'id',
        'phone_number',
        'photo_url',
      ],
    });

    if (!doctor) {
      throw CustomError.notFound('Doctor not found');
    }

    return doctor;
  }
}
