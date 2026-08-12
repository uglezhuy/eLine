function BottonFilter(props) {
    return (
        <div className="request-filters">

            <div >

                <button
                    className={props.statusFilter === "Все" ? "filter-btn active" : "filter-btn"}
                    onClick={() => props.setStatusFilter("Все")}
                >
                    Все
                </button>

                <button
                    className={props.statusFilter === "Ожидает подтверждения" ? "filter-btn active" : "filter-btn"}
                    onClick={() => props.setStatusFilter("Ожидает подтверждения")}
                >
                    Ожидают подтверждения
                </button>

                <button
                    className={props.statusFilter === "Подтверждено" ? "filter-btn active" : "filter-btn"}
                    onClick={() => props.setStatusFilter("Подтверждено")}
                >
                    Подтвержденные
                </button>

                <button
                    className={props.statusFilter === "В обработке" ? "filter-btn active" : "filter-btn"}
                    onClick={() => props.setStatusFilter("В обработке")}
                >
                    В обработке
                </button>

                <button
                    className={props.statusFilter === "Готово к выдаче" ? "filter-btn active" : "filter-btn"}
                    onClick={() => props.setStatusFilter("Готово к выдаче")}
                >
                    Готово к выдаче
                </button>

                <button
                    className={props.statusFilter === "Завершено" ? "filter-btn active" : "filter-btn"}
                    onClick={() => props.setStatusFilter("Завершено")}
                >
                    Завершенные
                </button>

                <button
                    className={props.statusFilter === "Отклонено" ? "filter-btn active" : "filter-btn"}
                    onClick={() => props.setStatusFilter("Отклонено")}
                >
                    Отклоненные
                </button>

            </div>


            <div >
                <strong>Поиск:</strong>

                <input
                    type="text"
                    placeholder="Имя, ID, зачётная книжка или телефон"
                    value={props.searchText}
                    onChange={(e) => props.setSearchText(e.target.value)}
                />
            </div>


            <div>
                <strong>Сортировка по ID:</strong>

                <button
                    className="filter-btn"
                    onClick={() => props.setSortedRequests("")}
                >
                    Сброс
                </button>

                <button
                    className="filter-btn"
                    onClick={() => props.setSortedRequests("По убыванию")}
                >
                    Больше
                </button>

                <button
                    className="filter-btn"
                    onClick={() => props.setSortedRequests("По возрастанию")}
                >
                    Меньше
                </button>
            </div>

        </div>
    );
}

export default BottonFilter;