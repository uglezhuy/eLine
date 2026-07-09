import './ServiceCard.css'
import CardUsluga from '../components/ServiceCard'

function CardUslugaList(props) {





    return (<>
        {props.services.map((service) => {
            return (
                <CardUsluga

                    key={service.id}

                    service={service}

                    setServiceZapis={props.setServiceZapis}

                />
            )
        }
        )}
    </>
    );
}


export default CardUslugaList


