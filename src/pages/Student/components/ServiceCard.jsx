


function CardUsluga(props) {
    return (
        <>
            <div className="Cardus">

                <h3>Название услуги: {props.service.name}</h3>

                <p>Категория: {props.service.category}</p>

                <p>Время оказания услуги: {props.service.duration_minutes} мин.</p>

                <p>Срок оказания услуги: {props.service.ready_days} дн.</p>

                <p>{props.service.description}</p>

                <button onClick={() => props.setSelectedService(props.service)}>

                    Записаться на: {props.service.name}

                </button>

                <br />

            </div>
        </>
    )
}

export default CardUsluga

