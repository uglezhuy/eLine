
import './App.css'

import CardUsluga from './components/ServiceCard'
import CardList from './components/ServiceList'

import services from './data/services.js'
import { useState } from 'react'












function App() {


  return (
    <>
      <h1>  Доступные услуги</h1>



      <CardList
        key={service.id}
        services={services}
      />

    </>
  );
}

export default App;