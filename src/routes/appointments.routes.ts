import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import Appointment from '../models/Appointment';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appoinmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appoinmentsRouter.get('/', (request, response) => {
    const appointments = appointmentsRepository.all();

    return response.json(appointments);
});

appoinmentsRouter.post('/', (request, response) => {
    try {
        const { provider, date } = request.body;

        const parsedDate = parseISO(date);

        const createAppointment = new CreateAppointmentService(appointmentsRepository);

        const appointment = createAppointment.execute({
            date: parsedDate,
            provider })

        return response.json(appointment);
    }
    catch (err) {
        return response.status(400).json({ error: err.message });
    }
})

export default appoinmentsRouter;
