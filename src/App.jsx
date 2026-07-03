
import './App.css'

import CardUsluga from './components/ServiceCard'
import uslugas from './data/services.js'
import { useState } from 'react'



function App() {

  const [uslugaLog, setUsluga] = useState(null);

  function getUsluga() {

    return (

      <h1>УСЛУГА: {uslugaLog}</h1>

    );

  }
  return (
    <>
      {getUsluga()}


      {uslugas.map((usluga) => (
        <CardUsluga
          key={usluga.id}
          id={usluga.id}
          name={usluga.name}
          whaitMin={usluga.whaitMin}
          resultDays={usluga.resultDays}
          setUsluga={setUsluga}
        />
      ))}


    </>
  );
}










export default App;