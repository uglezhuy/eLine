import './ServiceCard.css'
import { useState } from 'react'








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


    function getUniqueDays(days) {

        const daysList = new Set();
        const uniqueDays = [];

        days.forEach((day) => {
            const dateKey = `${day.schedule_date}`;

            if (!daysList.has(dateKey)) {
                daysList.add(dateKey);
                uniqueDays.push(day);
            };
        })
        return uniqueDays;
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
                    <div>{
                        getUniqueDays(props.schedule).map((day) => {
                            return (
                                <>
                                    <button onClick={() => selectedDaySet(day)}>

                                        {day.schedule_date}
                                    </button>
                                    <br />
                                </>
                            );
                        })}
                    </div>

                    {selectedDay === null ? "Дата не выбранна" :

                        <> <div> Выбрана дата: {selectedDay.schedule_date}</div>
                            {selectedScheduleId !== null && (
                                <div>
                                    Выбрано время: {
                                        props.schedule.find(item => item.id === selectedScheduleId)?.schedule_time
                                    }
                                </div>
                            )}
                            <div>Выберите время:</div>
                            <div>{


                                props.schedule.map((time) => {

                                    if (time.schedule_date !== selectedDay.schedule_date) {
                                        return null;
                                    }


                                    const isBusy = props.requests.some(
                                        (request) =>

                                            request.selectedScheduleId === time.id
                                    );
                                    console.log(time.id, isBusy);
                                    return isBusy ? null : (
                                        <>
                                            <button onClick={() => setSelectedScheduleId(time.id)}>
                                                {time.schedule_time + "/" + time.schedule_date}
                                            </button>
                                            <br />
                                        </>
                                    );
                                })}
                            </div>

                        </>
                    }

                </>

                <br />
                {props.selectedService === null ? "" : <div>    <button onClick={() => handleSubmit()} >Записаться</button></div>}
            </div>
        </>
    );
}












export default BookingForm


