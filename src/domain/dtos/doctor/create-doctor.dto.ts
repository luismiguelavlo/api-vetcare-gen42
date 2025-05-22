import {
  object,
  string,
  safeParse,
  minLength,
  pipe,
  maxLength,
  nonEmpty,
  email,
} from 'valibot';

export const DoctorSchema = object({
  fullname: pipe(
    string('fullname is required'),
    minLength(3, 'fullname must be a least 3 characters long'),
    maxLength(70, 'fullname must be a most 30 characters long')
  ),
  email: pipe(
    string(),
    nonEmpty('Please enter your email.'),
    email('The email address is badly formatted.')
  ),
  phone_number: pipe(
    string(),
    nonEmpty('Please enter your phone number.'),
    minLength(5, 'Your phone number must have 5 characters or more.')
  ),
});

export class CreateDoctorDto {
  constructor(
    public readonly fullname: string,
    public readonly email: string,
    public readonly phone_number: string
  ) {}

  static execute(input: { [key: string]: any }): [string?, CreateDoctorDto?] {
    const result = safeParse(DoctorSchema, input);

    if (!result.success) {
      const error = result.issues[0]?.message ?? 'Validation failed';
      return [error];
    }

    const { fullname, email, phone_number } = result.output as {
      fullname: string;
      email: string;
      phone_number: string;
    };
    return [undefined, new CreateDoctorDto(fullname, email, phone_number)];
  }
}
