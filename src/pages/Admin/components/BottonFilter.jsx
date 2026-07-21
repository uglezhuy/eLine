function BottonFilter(props) {
    return (
        <>
            <button onClick={() => props.setStatusFilter("Все")}>
                Все
            </button>

            <button onClick={() => props.setStatusFilter("Ожидает подтверждения")}>
                Ожидают подтверждения
            </button>

            <button onClick={() => props.setStatusFilter("Подтверждено")}>
                Подтвержденные
            </button>

            <button onClick={() => props.setStatusFilter("В обработке")}>
                В обработке
            </button>

            <button onClick={() => props.setStatusFilter("Готово к выдаче")}>
                Готово к выдаче
            </button>

            <button onClick={() => props.setStatusFilter("Завершено")}>
                Завершенные
            </button>

            <button onClick={() => props.setStatusFilter("Отклонено")}>
                Отклоненные
            </button>




            <div>

                <strong>Поиск:</strong>

                <input

                    type="text"

                    placeholder="Имя, ID или номер зачётной книжки, телефон"

                    value={props.searchText}

                    onChange={(e) => props.setSearchText(e.target.value)}

                />

            </div>




            <div>
                <strong>Сортировка по id:</strong>
                <button onClick={() => props.setSortedRequests("")}>Сброс</button>

                <button onClick={() => props.setSortedRequests("По убыванию")}>Больше</button>
                <button onClick={() => props.setSortedRequests("По возрастанию")}>Меньше</button>

            </div>


        </>
    )
}




export default BottonFilter;