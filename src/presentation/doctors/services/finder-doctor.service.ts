import { User, UserRole } from '../../../data/postgres/models/user.model';

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
}
