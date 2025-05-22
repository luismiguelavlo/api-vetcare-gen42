import { encryptAdapter } from '../../../config';
import { User, UserRole } from '../../../data/postgres/models/user.model';
import { CreateDoctorDto, CustomError } from '../../../domain';

export class CreatorDoctorService {
  async execute(data: CreateDoctorDto) {
    const { email, fullname, phone_number } = data;

    const password = this.generatePassword();
    const encryptedPassowrd = encryptAdapter.hash(password);

    const user = new User();

    user.fullname = fullname;
    user.email = email;
    user.phone_number = phone_number;
    user.password = encryptedPassowrd;
    user.rol = UserRole.DOCTOR;
    user.status = true;

    try {
      await user.save();
      return {
        message: 'Doctor has been created',
        password,
      };
    } catch (error) {
      throw CustomError.internalServer('Something went very wrong!');
    }
  }

  private generatePassword(length: number = 12): string {
    if (length < 12) {
      throw CustomError.badRequest(
        'The minimum password length is 12 characters.'
      );
    }

    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const specialChars = '!@#$%^&*()-_=+[]{}|;:,.<>?';

    const allChars = lowercase + uppercase + numbers + specialChars;

    let password: string[] = [
      lowercase[Math.floor(Math.random() * lowercase.length)],
      uppercase[Math.floor(Math.random() * uppercase.length)],
      numbers[Math.floor(Math.random() * numbers.length)],
      specialChars[Math.floor(Math.random() * specialChars.length)],
    ];

    for (let i = password.length; i < length; i++) {
      password.push(allChars[Math.floor(Math.random() * allChars.length)]);
    }

    password = password.sort(() => Math.random() - 0.5);

    return password.join('');
  }
}
