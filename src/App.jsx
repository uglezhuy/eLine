import './App.css'

import CardList from './components/ServiceList'
import BookingForm from './components/BookingForm'

import services from './data/services.js'
import { useState } from 'react'



function App() {
  const [serviceZapis, setServiceZapis] = useState(0);

  const [requests, setRequests] = useState([]);

  return (
    <>
      {console.log(requests)}
      <h1>  Доступные услуги</h1>



      <CardList
        services={services}
        serviceZapis={serviceZapis}
        setServiceZapis={setServiceZapis}

      />

      <BookingForm
        serviceZapis={serviceZapis}

        requests={requests}
        setRequests={setRequests}

      />

    </>
  );
}

export default App;

