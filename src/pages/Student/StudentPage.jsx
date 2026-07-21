

import { Link } from "react-router-dom";

import CardList from './components/ServiceList.jsx'
import BookingForm from './components/BookingForm.jsx'
import Requestslist from '../../components/Requests/RequestsList.jsx'

import services from '../../data/services.js'


import { useState } from 'react'
import RequestsCard from '../../components/Requests/RequestsList.jsx'



function StudentPage(props) {
    const [selectedService, setSelectedService] = useState(null);

    return (
        <>
            <Link to="/">
                На главную
            </Link>
            <br />
            <Link to="/admin">
                Администратор
            </Link>


            <h1>Студент</h1>
            <h2>  Доступные услуги</h2>



            <CardList
                services={services}
                selectedService={selectedService}
                setSelectedService={setSelectedService}

            />

            <BookingForm
                selectedService={selectedService}

                requests={props.requests}
                schedule={props.schedule}

                setRequests={props.setRequests}

            />
            <Requestslist
                requests={props.requests}
                isAdmin={false}
                schedule={props.schedule}


            />



        </>
    );
}

export default StudentPage;

