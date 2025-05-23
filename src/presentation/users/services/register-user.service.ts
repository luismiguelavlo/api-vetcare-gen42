import { encryptAdapter, envs, JwtAdapter } from '../../../config';
import { User } from '../../../data/postgres/models/user.model';
import { CustomError, RegisterUserDto } from '../../../domain';
import { EmailService } from '../../common/services/email.service';

export class RegisterUserService {
  constructor(private readonly emailService: EmailService) {}

  async execute(data: RegisterUserDto) {
    const user = new User();

    user.fullname = data.fullname;
    user.email = data.email;
    user.password = encryptAdapter.hash(data.password);
    user.phone_number = data.phone_number;

    try {
      await user.save();
      this.sendLinkToEmailFronValidationAccount(data.email);
      return {
        message: 'User created sucessfully',
      };
    } catch (error) {
      if (envs.LOGGER) {
        console.log(error);
      }
      throw CustomError.internalServer('Something went very wrong!');
    }
  }

  private sendLinkToEmailFronValidationAccount = async (email: string) => {
    const token = await JwtAdapter.generateToken({ email }, '300s');
    if (!token) throw CustomError.internalServer('Error gettin token');

    const link = `http://localhost:3000/api/v1/users/validate-account/${token}`;
    const html = `
      <h1>Validate Your email</h1>
      <p>Click on the following link to validate your email</p>
      <a href="${link}">Validate your email: ${email}</a>
    `;

    const isSent = await this.emailService.sendEmail({
      to: email,
      subject: 'Validate your account!',
      htmlBody: html,
    });
    if (!isSent) throw CustomError.internalServer('Error sending email');
    return true;
  };

  public validateAccount = async (token: string) => {
    const payload = await this.validateToken(token);

    const { email } = payload as { email: string };
    if (!email) throw CustomError.internalServer('Email not found in token');

    const user = await this.ensureUserExistWhitEmail(email);

    user.status = true;

    try {
      await user.save();
      return 'user activated';
    } catch (error) {
      throw CustomError.internalServer('Something went very wrong');
    }
  };

  private async ensureUserExistWhitEmail(email: string) {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw CustomError.internalServer('Email no registered in db');
    }
    return user;
  }

  private async validateToken(token: string) {
    const payload = await JwtAdapter.validateToken(token);
    if (!payload) throw CustomError.badRequest('Invalid Token');
    return payload;
  }
}
