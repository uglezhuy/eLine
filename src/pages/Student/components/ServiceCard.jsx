import './ServiceCard.css'


function CardUsluga(props) {
    return (
        <>
            <div>
                <h3>Название услуги:{props.service.name}</h3>
                <p> Время оказания услуги:{props.service.duration}</p>
                <p> Срок оказания услуги:{props.service.readyDays}</p>
            </div>

            <button onClick={() => props.setSelectedService(props.service)}>
                Записаться на: {props.service.name}
            </button>            <br />

        </>
    )
}

export default CardUsluga

