/*export class CreatePetDto {
  constructor(
    public readonly name: string,
    public readonly breed: string,
    public readonly weight: number
  ) {}

  static execute(object: { [key: string]: any }): [string?, CreatePetDto?] {
    const { name, breed, weight } = object;

    if (!name) return ['name is required!'];
    if (!breed) return ['breed is required'];
    if (!weight) return ['weight is required'];

    return [undefined, new CreatePetDto(name, breed, weight)];
  }
}*/

import {
  object,
  string,
  number,
  safeParse,
  minLength,
  pipe,
  maxLength,
  minValue,
  maxValue,
} from 'valibot';

import * as v from 'valibot';

export const CreatePetSechema = object({
  name: pipe(
    string('name is required'),
    minLength(3, 'name must be a least 3 characters long'),
    maxLength(30, 'name must be a most 30 characters long')
  ),
  breed: pipe(
    string('breed is required'),
    minLength(3, 'breed must be a least 3 characters long'),
    maxLength(30, 'breed must be a most 30 characters long')
  ),
  weight: pipe(
    number('weight is required'),
    minValue(0.1, 'weight must be a positive number'),
    maxValue(200, 'weight must be a most 200')
  ),
});

export class CreatePetDto {
  constructor(
    public readonly name: string,
    public readonly breed: string,
    public readonly weight: number
  ) {}

  static execute(input: { [key: string]: any }): [string?, CreatePetDto?] {
    const result = safeParse(CreatePetSechema, input);

    if (!result.success) {
      const error = result.issues[0]?.message ?? 'Validation failed';
      return [error];
    }

    const { name, breed, weight } = result.output as {
      name: string;
      breed: string;
      weight: number;
    };
    return [undefined, new CreatePetDto(name, breed, weight)];
  }
}

/*import z from "zod";

const createRepairSchema = z.object({
  date: z
    .string({ message: "date is required" })
    .regex(/^\d{2}-\d{2}-\d{4}$/, {
      message: "Date must be in format MM-DD-YYYY",
    })
    .refine(
      (date) => {
        const [month, day, year] = date.split("-").map(Number);
        const parsedDate = new Date(year, month - 1, day);
        return (
          parsedDate.getMonth() === month - 1 &&
          parsedDate.getDate() === day &&
          parsedDate.getFullYear() === year
        );
      },
      { message: "Invalid date" }
    ),
  motorsNumber: z.string().min(5, { message: "motorsNumber is required" }),
  description: z.string().min(10, { message: "description is required" }),
  userId: z.string().uuid({ message: "userId is required" }),
});

export class CreateRepairDTO {
  constructor(
    public date: Date,
    public userId: string,
    public motorsNumber: string,
    public description: string
  ) {}

  static create(object: {
    [key: string]: any;
  }): [Record<string, string>?, CreateRepairDTO?] {
    const { date, userId, motorsNumber, description } = object;

    const result = createRepairSchema.safeParse(object);

    if (!result.success) {
      const errorMessages = result.error.errors.reduce((acc: any, err: any) => {
        const field = err.path.join(".");
        acc[field] = err.message;
        return acc;
      }, {} as Record<string, string>);

      return [errorMessages];
    }

    return [
      undefined,
      new CreateRepairDTO(date, userId, motorsNumber, description),
    ];
  }
}
*/
