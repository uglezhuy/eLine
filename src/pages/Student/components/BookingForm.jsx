import './ServiceCard.css'
import { useState } from 'react'








function BookingForm(props) {



    console.log("===== PROPS =====");

    console.log(props);

    console.log("===== SCHEDULE =====");

    console.log(props.schedule);

    console.log("===== END =====");

    const [selectedScheduleId, setSelectedScheduleId] = useState(null);
    const [selectedDay, selectedDaySet] = useState(null);


    function handleSubmit() {
        console.log("Данные о пользователе получены");
        console.log(name);
        console.log(phone);
        console.log(props.selectedService);

        props.setRequests([...props.requests, { id: props.requests.length + 1, service: props.selectedService.name, name: name, studentTicket: studentTicket, phone: phone, commentStudent: commentStudent, selectedScheduleId: selectedScheduleId, status: "Ожидает подтверждения", createdAt: new Date().toLocaleString("ru-RU") }])

        setName("");
        setPhone("");

    }

    function getUniqueDays(days) {

        const daysList = new Set();
        const uniqueDays = [];

        days.forEach((day) => {
            const dateKey = `${day.day}-${day.month}-${day.year}`;

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
                                        {day.day + "/" + day.month + "/" + day.year}
                                    </button>
                                    <br />
                                </>
                            );
                        })}
                    </div>

                    {selectedDay === null ? "Дата не выбранна" :
                        <> <div> Выбрана дата: {selectedDay.day + "/" + selectedDay.month + "/" + selectedDay.year}</div>
                            <div>Выберите время:</div>
                            <div>{
                                props.schedule.map((time) => {

                                    if (time.day !== selectedDay.day || time.month !== selectedDay.month || time.year !== selectedDay.year) {
                                        return null;
                                    }

                                    const isBusy = props.requests.some(
                                        (request) =>

                                            request.selectedScheduleId === time.id
                                    );

                                    return isBusy ? null : (
                                        <>
                                            <button onClick={() => setSelectedScheduleId(time.id)}>
                                                {time.time + "/" + time.day + "/" + time.month + "/" + time.year}
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


