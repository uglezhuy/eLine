import './ServiceCard.css'
import { useState } from 'react'








function BookingForm(props) {

    function handleSubmit() {
        console.log(name);
        console.log(phone);
        console.log(props.serviceZapis);

        props.setRequests([...props.requests, { service: props.serviceZapis, name: name, phone: phone }])


    }

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");





    return (
        <>
            <h3>
                Выбрана услуга: {props.serviceZapis === 0 ? "Услуга не выбрана" : props.serviceZapis}
            </h3>
            {props.serviceZapis === 0 ? "" : <div>    ФИО: <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            /></div>}
            {props.serviceZapis === 0 ? "" : <div>    Телефон: <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            /></div>}
            {props.serviceZapis === 0 ? "" : <div>    <button onClick={() => handleSubmit()} >Записаться</button></div>}
        </>
    );
}












export default BookingForm


