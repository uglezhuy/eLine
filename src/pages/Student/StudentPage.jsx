

import { Link } from "react-router-dom";

import CardList from './components/ServiceList.jsx'
import BookingForm from './components/BookingForm.jsx'
import Requestslist from '../../components/Requests/RequestsList.jsx'


import RequestsCard from '../../components/Requests/RequestsList.jsx'

import { useState, useEffect } from "react";

import { loadSchedule } from '../../../backend/api/requestApi.js'

import { loadRequests } from '../../../backend/api/requestApi.js'
function StudentPage(props) {
    const [selectedService, setSelectedService] = useState(null);


    const [requests, setRequests] = useState([]);
    const [schedule, setSchedule] = useState([]);



    useEffect(() => {
        loadRequests(setRequests);
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
            <hr />

            <h1>Студент</h1>
            <h2>  Доступные услуги</h2>



            <CardList
                selectedService={selectedService}
                setSelectedService={setSelectedService}

            />

            <BookingForm
                selectedService={selectedService}

                requests={requests}
                schedule={schedule}

                loadRequests={() => loadRequests(setRequests)}
                loadSchedule={() => loadSchedule(setSchedule)}
            />
            <hr />
            <Requestslist
                requests={requests}
                isAdmin={false}
                schedule={schedule}


            />



        </>
    );
}

export default StudentPage;

