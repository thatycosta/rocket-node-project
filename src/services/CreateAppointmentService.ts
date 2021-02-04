import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import { startOfHour} from 'date-fns';

interface Request{
    provider: string;
    date: Date;
}

class CreateAppointmentService {
    private appointmentsRepository: AppointmentsRepository;

    constructor(appointmentsRepository: AppointmentsRepository){
        this.appointmentsRepository = appointmentsRepository;
    }

    public execute({ date, provider}: Request): Appointment {
        const appoimentDate = startOfHour(date);

        const findAppointmentInSameDate = this.appointmentsRepository.findByDate(appoimentDate);

        if (findAppointmentInSameDate) {
            throw Error('This appointment is already booked');
        }

        const appointment = this.appointmentsRepository.create({
            provider,
            date: appoimentDate,
        });

        return appointment;
    }

}

export default CreateAppointmentService;
