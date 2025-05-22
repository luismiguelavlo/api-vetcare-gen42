import { User } from '../../../data/postgres/models/user.model';
import { CustomError } from '../../../domain';

export class FinderUserService {
  async execute(userId: string) {
    const user = await User.findOne({
      where: {
        status: true,
        id: userId,
      },
    });

    if (!user) {
      throw CustomError.notFound('Pet not found');
    }

    return user;
  }
}
