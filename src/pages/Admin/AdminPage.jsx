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


function AdminPage(props) {

    const [requests, setRequests] = useState([]);
    const [schedule, setSchedule] = useState([]);


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








    return (

        <>
            <Link to="/">
                На главную
            </Link>
            <br />
            <Link to="/student">
                Студент
            </Link>

            <h1>Администратор</h1>
            <div className="Cardus">
                <ScheduleGenerator

                />

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



            <Request_history
                requests={requests}
            />

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