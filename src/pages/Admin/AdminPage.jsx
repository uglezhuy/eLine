import { Link } from "react-router-dom";
import Requestslist from '../../components/Requests/RequestsList.jsx'
import BottonFilter from './components/BottonFilter.jsx'
import { useState, useEffect } from "react";
import Schedule from '../../components/Schedules/Schedule.jsx'

import ScheduleGenerator from '../../components/Schedules/ScheduleGenerator.jsx'

import Request_history from '../../components/Sequest_history/Sequest_history.jsx'

import { changeStatus, startWork, updateRequestField } from '../../../backend/api/requestApi.js'

import { loadScheduleAdmin } from '../../../backend/api/requestApi.js'

import { loadRequests } from '../../../backend/api/requestApi.js'

import { loadCurrentUser } from '../../../backend/api/requestApi.js'

function AdminPage(props) {

    const [requests, setRequests] = useState([]);
    const [schedule, setSchedule] = useState([]);

    const [userType, setUserType] = useState(null);

    useEffect(() => {
        loadCurrentUser(setUserType)

    }, []);


    useEffect(() => {
        loadRequests(setRequests);
        loadScheduleAdmin(setSchedule);
    }, []);

    const [selectedScheduleId, setSelectedScheduleId] = useState(null);
    const [selectedDay, selectedDaySet] = useState(null);


    const [statusFilter, setStatusFilter] = useState("Все"); //фильтр по статусу

    const [searchText, setSearchText] = useState("");//фильтр по поиску

    const [sortedRequests, setSortedRequests] = useState("");// сортировка 


    const filterRequests =      //filter создаёт новый массив, объекты внутри остаются теми же поэтому мы можем менять статусы
        statusFilter === "Все"
            ? requests
            : requests.filter(
                (request) => request.status === statusFilter
            );



    const filterSearchText = // фильтр по поиску
        searchText === ""
            ? filterRequests
            : filterRequests.filter((request) =>
                request.name
                    .toLowerCase()
                    .includes(searchText.toLowerCase()) || //includes позволяется по чати строки найти результа
                request.studentTicket
                    .toLowerCase()
                    .includes(searchText.toLowerCase()) ||
                request.phone
                    .toLowerCase()
                    .includes(searchText.toLowerCase()) ||
                request.id
                    .toString()
                    .includes(searchText)

            );


    const sorted =
        sortedRequests === ""
            ? filterSearchText
            : sortedRequests === "По убыванию"
                ? [...filterSearchText].sort((a, b) => b.id - a.id)
                : sortedRequests === "По возрастанию"
                    ? [...filterSearchText].sort((a, b) => a.id - b.id)
                    : filterSearchText;







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
        userType.role !== "admin"
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
            {console.log(userType)}
            <Link to="/">
                На главную
            </Link>
            <br />
            <Link to="/student">
                Запись
            </Link>
            <hr />
            <h1>Рабочая область</h1>

            <h3>Тип пользователя: {userType.role}</h3>

            <div className="Cardus">
                {userType.role === "admin" && (
                    <ScheduleGenerator />
                )}
                <Schedule
                    isAdmin={true}
                    requests={requests}
                    schedule={schedule}
                    loadScheduleAdmin={() => loadScheduleAdmin(setSchedule)}
                    selectedScheduleId={selectedScheduleId}
                    setSelectedScheduleId={setSelectedScheduleId}
                    selectedDay={selectedDay}
                    selectedDaySet={selectedDaySet}
                />
            </div>
            <hr />


            <Request_history
                requests={requests}
            />
            <hr />
            <BottonFilter
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}

                searchText={searchText}
                setSearchText={setSearchText}



                sortedRequests={sortedRequests}
                setSortedRequests={setSortedRequests}

            />




            <Requestslist
                requests={sorted}

                changeStatus={changeStatus}
                updateRequestField={updateRequestField}
                isAdmin={true}
                startWork={startWork} //костыль
                schedule={schedule}
                refreshRequests={() => loadRequests(setRequests)}
                setSchedule={setSchedule}

            />
        </>
    );

}

export default AdminPage;