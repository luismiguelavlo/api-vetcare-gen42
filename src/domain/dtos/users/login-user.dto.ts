import {
  object,
  string,
  safeParse,
  minLength,
  pipe,
  nonEmpty,
  email,
} from 'valibot';

export const LoginUserSchema = object({
  password: pipe(
    string(),
    nonEmpty('Please enter your password.'),
    minLength(8, 'Your password must have 8 characters or more.')
  ),
  email: pipe(
    string(),
    nonEmpty('Please enter your email.'),
    email('The email address is badly formatted.')
  ),
});

export class LoginUserDto {
  constructor(
    public readonly password: string,
    public readonly email: string
  ) {}

  static execute(input: { [key: string]: any }): [string?, LoginUserDto?] {
    const result = safeParse(LoginUserSchema, input);

    if (!result.success) {
      const error = result.issues[0]?.message ?? 'Validation failed';
      return [error];
    }

    const { password, email } = result.output as {
      password: string;
      email: string;
    };
    return [undefined, new LoginUserDto(password, email)];
  }
}
