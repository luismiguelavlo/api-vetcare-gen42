import { Appointment } from '../../../data/postgres/models/appointment.model';
import { CreateAppointmentDto, CustomError } from '../../../domain';
import { FinderDoctorService } from '../../doctors/services/finder-doctor.service';
import { FinderPetService } from '../../pets/services/finder-pet.service';
import moment from 'moment';

export class CreatorAppointmentService {
  constructor(
    private readonly finderPetService: FinderPetService,
    private readonly finderDoctorService: FinderDoctorService
  ) {}

  async execute(data: CreateAppointmentDto) {
    //buscar el doctor y validar que exista (usar un metodo de otro servicion DI)
    const doctorPromise = this.finderDoctorService.executeByFindOne(
      data.userId
    );
    const petPromise = this.finderPetService.executeByFindOne(data.petId); //0segundos

    const [doctor, pet] = await Promise.all([doctorPromise, petPromise]);

    const formatDate = moment(data.date).format('YYYY-MM-DD h:mm:ss');
    await this.ensureAppointmentExist(data, formatDate); //TODO: validar porque no esta funcionando

    const appointment = new Appointment();
    appointment.date = data.date;
    appointment.reason = data.reason;
    appointment.user = doctor;
    appointment.pet = pet;

    try {
      await appointment.save();
      return {
        message: 'Appointment created sucessfully',
      };
    } catch (error) {
      throw CustomError.internalServer('Something went very wrong!');
    }
  }

  private async ensureAppointmentExist(
    appointmentData: CreateAppointmentDto,
    formatDate: string
  ) {
    console.log(formatDate);
    const appointment = await Appointment.createQueryBuilder('appointment')
      .where('appointment.doctor_id = :userId', {
        userId: appointmentData.userId,
      })
      .andWhere('appointment.date = :appointmentDate', {
        appointmentDate: formatDate,
      })
      .getOne();

    if (appointment) {
      throw CustomError.badRequest('Appointment date Already in use');
    }
  }
}
