import './ServiceCard.css'


function CardUsluga(props) {
    return (
        <>
            <div className="Cardus">
                <h3>Название услуги:{props.service.name}</h3>
                <p> Время оказания услуги:{props.service.duration}</p>
                <p> Срок оказания услуги:{props.service.readyDays}</p>


                <button onClick={() => props.setSelectedService(props.service)}>
                    Записаться на: {props.service.name}
                </button>            <br />
            </div>
        </>
    )
}

export default CardUsluga

