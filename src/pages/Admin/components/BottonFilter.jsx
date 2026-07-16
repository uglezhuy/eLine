function BottonFilter(props) {
    return (
        <>
            <button onClick={() => props.setStatusFilter("Все")}>
                Все
            </button>

            <button onClick={() => props.setStatusFilter("Ожидает подтверждения")}>
                Ожидають подтверждения
            </button>


            <button onClick={() => props.setStatusFilter("Подтверждено")}>
                Подтвержденные
            </button>

            <button onClick={() => props.setStatusFilter("Отклонено")}>
                Отклоненные
            </button>
        </>
    )
}




export default BottonFilter;