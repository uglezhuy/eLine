import './ServiceCard.css'
import CardUsluga from '../components/ServiceCard'
import { useEffect, useState } from 'react'
import { loadServices } from '../../../../backend/api/requestApi.js'

function CardUslugaList(props) {


    const [services, setServices] = useState([])


    useEffect(() => {
        loadServices(setServices);
    }, []);

    useEffect(() => {
        console.log("Сервисы:", services);
    }, [services]);


    return (<>
        {services.map((service) => {
            return (
                <CardUsluga
                    key={service.id}
                    service={service}
                    setSelectedService={props.setSelectedService}
                />
            )
        }
        )}
        <hr />
    </>
    );
}


export default CardUslugaList


