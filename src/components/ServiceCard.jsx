import './ServiceCard.css'


function CardUsluga(usluga) {

    return (

        <div className="Cardusluga">

            <p>ID услуги: {usluga.id} </p>
            <p>📄 Название услуги: {usluga.name}</p>
            <p>⏱Длительность приема: {usluga.whaitMin}минут</p>
            <p>📅Сколко ждат услуги {usluga.resultDays} рабочих дня</p>
            <button className="buttonPodrob" onClick={() =>

                usluga.setUsluga(usluga.name)

            }>Подробнее</button>
        </div>

    )
}

export default CardUsluga
