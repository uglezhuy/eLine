import './ServiceCard.css'
import { useState } from 'react'








function BookingForm(props) {



    const [selectedScheduleId, setSelectedScheduleId] = useState(null);


    function handleSubmit() {
        console.log("Данные о пользователе получены");
        console.log(name);
        console.log(phone);
        console.log(props.selectedService);

        props.setRequests([...props.requests, { service: props.selectedService.name, name: name, phone: phone, selectedScheduleId: selectedScheduleId, status: "Ожидает подтверждения" }])

        setName("");
        setPhone("");

    }

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");





    return (
        <>
            <h3>
                Выбрана услуга: {props.selectedService === null ? "Услуга не выбрана" : props.selectedService.name}
            </h3>
            {props.selectedService === null ? "" : <div>    ФИО: <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            /></div>}
            {props.selectedService === null ? "" : <div>    Телефон: <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            /></div>}


            {props.selectedService === null ? "" : <div> Выберете дуступное время для  услуги: {props.selectedService.name} </div>}




            <>
                <div>{
                    props.schedule.map((time) => {

                        const isBusy = props.requests.some(
                            (request) =>

                                request.selectedScheduleId === time.id
                        );

                        return isBusy ? null : (
                            <>
                                <button onClick={() => setSelectedScheduleId(time.id)}>
                                    {time.time}
                                </button>
                                <br />
                            </>
                        );
                    })}
                </div>
            </>

            <br />
            {props.selectedService === null ? "" : <div>    <button onClick={() => handleSubmit()} >Записаться</button></div>}
        </>
    );
}












export default BookingForm


