import './ServiceCard.css'
import { useState } from 'react'
import Schedule from '../../../components/Schedules/Schedule';

import { loadRequests } from '../../../../backend/api/requestApi.js'

import { handleSubmit } from '../../../../backend/api/requestApi.js'



function BookingForm(props) {





    const [selectedScheduleId, setSelectedScheduleId] = useState(null);
    const [selectedDay, selectedDaySet] = useState(null);








    const [name, setName] = useState("");
    const [studentTicket, setStudentTicket] = useState("");
    const [phone, setPhone] = useState("");
    const [commentStudent, setcommentStudent] = useState("");


    //  visitDate, visitTime

    return (
        <>
            <div className="Cardus">
                <h3>
                    Выбрана услуга: {props.selectedService === null ? "Услуга не выбрана" : props.selectedService.name}
                </h3>

                {props.selectedService === null ? "" : <div>    ФИО: <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                /></div>}

                {props.selectedService === null ? "" : <div>    Номер студенческого билета: <input
                    type="text"
                    value={studentTicket}
                    onChange={(e) => setStudentTicket(e.target.value)}
                /></div>}


                {props.selectedService === null ? "" : <div>    Телефон: <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                /></div>}

                {props.selectedService === null ? "" : <div>    Комментарий к обращению студнента: <input
                    type="text"
                    value={commentStudent}
                    onChange={(e) => setcommentStudent(e.target.value)}
                /></div>}

                {props.selectedService === null ? "" : <div> Выберете дуступное время для  услуги: {props.selectedService.name} </div>}





                <>
                    <Schedule
                        isAdmin={false}
                        requests={props.requests}
                        schedule={props.schedule}

                        selectedScheduleId={selectedScheduleId}
                        setSelectedScheduleId={setSelectedScheduleId}

                        selectedDay={selectedDay}
                        selectedDaySet={selectedDaySet}
                    />

                </>

                <br />
                {props.selectedService === null ? "" : <div>    <button onClick={() => handleSubmit(
                    props.selectedService,
                    name,
                    studentTicket,
                    phone,
                    commentStudent,
                    selectedScheduleId,
                    () => {
                        props.loadRequests();
                        props.loadSchedule();
                        setName("");
                        setPhone("");
                        setcommentStudent("");
                        setStudentTicket("");
                    },

                )} >Записаться</button></div>}
            </div>
        </>
    );
}












export default BookingForm

