import { Link } from "react-router-dom";

import Requestslist from '../../components/Requests/RequestsList.jsx'

import BottonFilter from './components/BottonFilter.jsx'

import { useState } from 'react'


function AdminPage(props) {

    const [statusFilter, setStatusFilter] = useState("Все");

    const filterRequests =      //filter создаёт новый массив, объекты внутри остаются теми же поэтому мы можем менять статусы
        statusFilter === "Все"
            ? props.requests
            : props.requests.filter(
                (request) => request.status === statusFilter
            );

    function changeStatus(id, newStatus) {
        props.setRequests(
            props.requests.map((r) =>
                r.id === id
                    ? { ...r, status: newStatus }
                    : r
            )
        );
    }

    function AddAdminComent(id, commentAdmin) {
        props.setRequests(
            props.requests.map((r) =>
                r.id === id
                    ? { ...r, commentAdmin: commentAdmin }
                    : r
            )
        );

    }


    console.log(statusFilter);

    console.log(filterRequests);


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
            />


            <br />
            <div>Заявки после фильтрации:</div>
            <br />
            <Requestslist
                requests={filterRequests}

                changeStatus={changeStatus}
                AddAdminComent={AddAdminComent}
                isAdmin={true}
            />
        </>
    );

}

export default AdminPage;