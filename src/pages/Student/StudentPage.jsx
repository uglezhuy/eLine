

import { Link } from "react-router-dom";

import CardList from './components/ServiceList.jsx'
import BookingForm from './components/BookingForm.jsx'
import Requestslist from '../../components/Requests/RequestsList.jsx'


import RequestsCard from '../../components/Requests/RequestsList.jsx'

import { useState, useEffect } from "react";

import { loadSchedule } from '../../../backend/api/requestApi.js'

import { loadRequests } from '../../../backend/api/requestApi.js'

import { loadCurrentUser } from '../../../backend/api/requestApi.js'

function StudentPage(props) {
    const [selectedService, setSelectedService] = useState(null);


    const [requests, setRequests] = useState([]);
    const [schedule, setSchedule] = useState([]);

    const [userType, setUserType] = useState(null);

    const [activeSection, setActiveSection] = useState("myRequests"); // выбор секции (заявки, история, генератор)


    useEffect(() => {
        loadCurrentUser(setUserType)

    }, []);


    useEffect(() => {
        loadRequests(setRequests);
        loadSchedule(setSchedule);
    }, []);




    if (!userType) {
        return (
            <>
                <div>Вы не авторизованы</div>
                <Link to="/">На главную</Link>
            </>
        );
    }
    if (
        userType.role !== "employee" &&
        userType.role !== "admin" &&
        userType.role !== "student"
    ) {
        return (
            <>
                <div>У вас нет доступа</div>
                <Link to="/">На главную</Link>
            </>
        );
    }


    return (
        <>
            <Link to="/">
                На главную
            </Link>
            <br />
            <Link to="/admin">
                Рабочая область
            </Link>
            <hr />

            <h1>Запись</h1>
            <h2>  Доступные услуги</h2>
            <button onClick={() => setActiveSection("newRequest")}>
                📝 Новая заявка
            </button>

            <button onClick={() => setActiveSection("myRequests")}>
                📋 Мои заявки
            </button>

            <button onClick={() => setActiveSection("services")}>
                🛠 Услуги(разаработка)
            </button>

            <button onClick={() => setActiveSection("myBookings")}>
                📅 Мои записи(разаработка)
            </button>

            <button onClick={() => setActiveSection("profile")}>
                👤 Профиль
            </button>

            <hr />

            {activeSection === "newRequest" && (
                <>
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
                </>
            )}

            {activeSection === "myRequests" && (<>

                <Requestslist
                    requests={requests}
                    isAdmin={false}
                    schedule={schedule}

                />
            </>
            )}
            {activeSection === "profile" && (

                <div>

                    <h2>Профиль</h2>

                    <p>Имя: {userType.name}</p>

                    <p>Роль: {userType.role}</p>

                </div>

            )}



        </>
    );
}

export default StudentPage;

