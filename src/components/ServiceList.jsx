import './ServiceCard.css'
import CardUsluga from '../components/ServiceCard'


function CardUslugaList(props) {
    return (
        props.services.map((service) => {
            return (
                <>
                    < CardUsluga
                        service={service} />
                </>)
        }
        )
    );
}


export default CardUslugaList


