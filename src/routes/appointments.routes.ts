import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import Appointment from '../models/Appointment';

const appoinmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appoinmentsRouter.get('/', (request, response) => {
    const appointments = appointmentsRepository.all();

    return response.json(appointments);
});

appoinmentsRouter.post('/', (request, response) => {
    const { provider, date } = request.body;

    const parsedDate = startOfHour(parseISO(date));

    const findAppointmentInSameDate = appointmentsRepository.findByDate(parsedDate);

    if(findAppointmentInSameDate){
        return response.status(400).json({ message: 'This appointment is already booked' });
    }

    const appointment = appointmentsRepository.create({
        provider,
        date: parsedDate
    });

    return response.json(appointment) ;
})

export default appoinmentsRouter;