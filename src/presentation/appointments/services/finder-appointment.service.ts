import { Appointment } from '../../../data/postgres/models/appointment.model';
import { CustomError } from '../../../domain';

export class FinderAppointmentService {
  async execute(term: string, status: string, id: string) {
    this.ensureEntry(term, status);

    const query = Appointment.createQueryBuilder('appointment');

    if (status !== 'all') {
      query.where('appointment.status = :status', { status: status });
    }

    if (term === 'doctor') {
      query.andWhere('appointment.doctor_id = :id', { id: id });
    }

    if (term === 'pet') {
      query.andWhere('appointment.pet_id = :id', { id: id });
    }

    return await query.getMany();
  }

  private ensureEntry(term: string, status: string) {
    if (!['doctor', 'pet'].includes(term)) {
      throw CustomError.badRequest('Term must be a doctor or pet');
    }

    if (!['pending', 'completed', 'canceled', 'all'].includes(status)) {
      throw CustomError.badRequest(
        'Status must be: pending, completed, canceled, all'
      );
    }
  }
}
