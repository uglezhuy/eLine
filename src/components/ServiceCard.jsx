import './ServiceCard.css'


function CardUsluga(props) {
    return (
        <>
            <div>
                <h3>Название услуги:{props.service.name}</h3>
                <p> Время оказания услуги:{props.service.whaitMin}</p>
                <p> Срок оказания услуги:{props.service.resultDays}</p>
            </div>
            <button>Записаться на: {props.service.name} </button>
            <br />

        </>
    )
}

export default CardUsluga

