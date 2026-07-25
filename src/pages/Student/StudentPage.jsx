

import { Link } from "react-router-dom";

import CardList from './components/ServiceList.jsx'
import BookingForm from './components/BookingForm.jsx'
import Requestslist from '../../components/Requests/RequestsList.jsx'

import services from '../../data/services.js'

import RequestsCard from '../../components/Requests/RequestsList.jsx'

import { useState, useEffect } from "react";

import { loadSchedule } from '../../../backend/api/requestApi.js'

function StudentPage(props) {
    const [selectedService, setSelectedService] = useState(null);


    const [requests, setRequests] = useState([]);
    const [schedule, setSchedule] = useState([]);

    function loadRequests() {
        fetch("http://localhost:8888/backend/api/getRequests.php")
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setRequests(data);
            });
    }

    useEffect(() => {
        loadRequests();
        loadSchedule(setSchedule);
    }, []);


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

                requests={requests}
                schedule={schedule}

                setRequests={setRequests}
                loadRequests={props.loadRequests} //обновление запроса к php

            />
            <Requestslist
                requests={requests}
                isAdmin={false}
                schedule={schedule}


            />



        </>
    );
}

export default StudentPage;

