import { Link } from "react-router-dom";
import Requestslist from '../../components/Requests/RequestsList.jsx'
import BottonFilter from './components/BottonFilter.jsx'
import { useState } from 'react'

import { changeStatus, startWork, updateRequestField } from '../../../backend/api/requestApi.js'




function AdminPage(props) {

    const [statusFilter, setStatusFilter] = useState("Все"); //фильтр по статусу

    const [searchText, setSearchText] = useState("");//фильтр по поиску

    const [sortedRequests, setSortedRequests] = useState("");// сортировка 


    const filterRequests =      //filter создаёт новый массив, объекты внутри остаются теми же поэтому мы можем менять статусы
        statusFilter === "Все"
            ? props.requests
            : props.requests.filter(
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




    console.log(statusFilter);

    console.log(filterRequests);

    console.log(filterSearchText);
    console.log(sorted);


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
            <BottonFilter
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}

                searchText={searchText}
                setSearchText={setSearchText}



                sortedRequests={sortedRequests}
                setSortedRequests={setSortedRequests}

            />


            <br />
            <div>Заявки после фильтрации:</div>
            <br />
            <Requestslist
                requests={sorted}

                changeStatus={changeStatus}
                updateRequestField={updateRequestField}
                isAdmin={true}
                startWork={startWork} //костыль
                schedule={props.schedule}
                loadRequests={props.loadRequests}

            />
        </>
    );

}

export default AdminPage;