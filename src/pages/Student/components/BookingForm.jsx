import './ServiceCard.css'
import { useState } from 'react'
import Schedule from '../../../components/Schedules/Schedule';







function BookingForm(props) {





    const [selectedScheduleId, setSelectedScheduleId] = useState(null);
    const [selectedDay, selectedDaySet] = useState(null);


    function handleSubmit() {
        console.log("Данные о пользователе получены");
        console.log(name);
        console.log(phone);
        console.log(props.selectedService);

        //props.setRequests([...props.requests, { id: props.requests.length + 1, service: props.selectedService.name, name: name, studentTicket: studentTicket, phone: phone, commentStudent: commentStudent, selectedScheduleId: selectedScheduleId, status: "Ожидает подтверждения", createdAt: new Date().toLocaleString("ru-RU") }])

        // id: props.requests.length + 1,    createdAt: new Date().toLocaleString("ru-RU") }])



        fetch("http://localhost:8888/backend/api/addRequest.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                service: props.selectedService.name,
                name: name,
                studentTicket: studentTicket,
                phone: phone,
                commentStudent: commentStudent,
                selectedScheduleId: selectedScheduleId,
                status: "Ожидает подтверждения"
            })

        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.success) {
                    props.loadRequests();
                }
            });


        setName("");
        setPhone("");
        setcommentStudent("")
        setStudentTicket("");
    }





    const [name, setName] = useState("");
    const [studentTicket, setStudentTicket] = useState("");
    const [phone, setPhone] = useState("");
    const [commentStudent, setcommentStudent] = useState("");


    //  visitDate, visitTime

    console.log("schedule:", props.schedule);
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
                {props.selectedService === null ? "" : <div>    <button onClick={() => handleSubmit()} >Записаться</button></div>}
            </div>
        </>
    );
}












export default BookingForm


