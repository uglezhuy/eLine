

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

            <h4>Запись</h4>

            <div className="admin-layout">

                {/* Левая часть */}
                <div className="admin-sidebar">

                    <button
                        className={
                            activeSection === "newRequest"
                                ? "sidebar-button active"
                                : "sidebar-button"
                        }
                        onClick={() => setActiveSection("newRequest")}
                    >
                        📝 Новая заявка
                    </button>

                    <button
                        className={
                            activeSection === "myRequests"
                                ? "sidebar-button active"
                                : "sidebar-button"
                        }
                        onClick={() => setActiveSection("myRequests")}
                    >
                        📋 Мои заявки
                    </button>

                    <button
                        className={
                            activeSection === "myBookings"
                                ? "sidebar-button active"
                                : "sidebar-button"
                        }
                        onClick={() => setActiveSection("myBookings")}
                    >

                        📅 Мои записи

                    </button>
                    <button
                        className={
                            activeSection === "services"
                                ? "sidebar-button active"
                                : "sidebar-button"
                        }
                        onClick={() => setActiveSection("services")}
                    >
                        🛠 Услуги(РАЗАРАБОТКА)
                    </button>



                    <button
                        className={
                            activeSection === "profile"
                                ? "sidebar-button active"
                                : "sidebar-button"
                        }
                        onClick={() => setActiveSection("profile")}
                    >
                        👤 Профиль
                    </button>

                </div>


                {/* Правая часть */}
                <div className="admin-content">

                    {activeSection === "newRequest" && (
                        <>
                            <h2>Новая заявка</h2>

                            <div className="Cardus">
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
                            </div>
                        </>
                    )}

                    {activeSection === "myRequests" && (
                        <>
                            <h2>Мои заявки</h2>

                            <div className="Cardus">
                                <Requestslist
                                    requests={requests}
                                    isAdmin={false}
                                    schedule={schedule}
                                />
                            </div>
                        </>
                    )}



                    {activeSection === "myBookings" && (

                        <>

                            <h2>Мои записи</h2>

                            <div className="Cardus">


                                РАЗРАБОТКА(записиси корые уже назначеный повремяни и ожидают приема)

                            </div>

                        </>

                    )}


                    {activeSection === "services" && (
                        <>
                            <h2>Услуги(РАЗАРАБОТКА)</h2>

                            <div className="Cardus">
                                РАЗАРБОТКА
                            </div>
                        </>
                    )}



                    {activeSection === "profile" && (<>
                        <h2>Профиль</h2>
                        <div className="Cardus">



                            <p>Имя: {userType.name}</p>
                            <p>Роль: {userType.role}</p>

                        </div>
                    </>
                    )}

                </div>

            </div>
        </>
    );
}

export default StudentPage;

