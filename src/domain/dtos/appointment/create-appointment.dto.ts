import {
  custom,
  date,
  nonEmpty,
  object,
  pipe,
  safeParse,
  string,
  transform,
} from 'valibot';

const isValidDateFormat = (value: string) =>
  /^\d{4}-\d{2}-\d{2}$/.test(value) && !isNaN(new Date(value).getTime());

export const AppointmentSchema = object({
  date: pipe(
    string('Date is required'),
    nonEmpty('Date cannot be empty'),
    custom(
      (val: any) => isValidDateFormat(val),
      'Date must be in YYYY-MM-DD format'
    ),
    transform((val) => new Date(val))
  ),
  reason: pipe(
    string('reason is required'),
    nonEmpty('Reason cannot be empty')
  ),
  petId: pipe(string('petId is required'), nonEmpty('petId cannot be empty')),
  userId: pipe(
    string('userId is required'),
    nonEmpty('userId cannot be empty')
  ),
});

export class CreateAppointmentDto {
  constructor(
    public readonly date: Date,
    public readonly reason: string,
    public readonly petId: string,
    public readonly userId: string
  ) {}

  static execute(input: {
    [key: string]: any;
  }): [string?, CreateAppointmentDto?] {
    const result = safeParse(AppointmentSchema, input);

    if (!result.success) {
      const error = result.issues[0]?.message ?? 'Validation Failed';
      return [error];
    }

    const { date, reason, petId, userId } = result.output as {
      date: Date;
      reason: string;
      petId: string;
      userId: string;
    };

    return [undefined, new CreateAppointmentDto(date, reason, petId, userId)];
  }
}
