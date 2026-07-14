import './App.css'

import CardList from './components/ServiceList'
import BookingForm from './components/BookingForm'
import Requestslist from './components/RequestsList'

import services from './data/services.js'
import schedule from './data/schedule.js'

import { useState } from 'react'
import RequestsCard from './components/RequestsList.jsx'



function App() {
    const [selectedService, setSelectedService] = useState(null);


    const [requests, setRequests] = useState([]);



    function chengeStatus(id) {
        setRequests(
            requests.map((r) =>
                r.id === id
                    ? { ...r, status: "Подтверждено" }
                    : r
            )
        );
    }

    return (
        <>
            {console.log(requests)}
            <h1>  Доступные услуги</h1>



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

            />
            <Requestslist
                requests={requests}
                chengeStatus={chengeStatus}
            />



        </>
    );
}

export default App;

