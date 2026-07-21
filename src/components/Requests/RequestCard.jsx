import { useState } from 'react'


function RequestsCard(props) {
    const [commentAdmin, setcommentAdmin] = useState("");
    const [nameAdminInWork, setNameAdmin] = useState("");


    function getStatusEmoji(status) {

        if (status === "Ожидает подтверждения") return "🟡";

        if (status === "Подтверждено") return "🟢";

        if (status === "В обработке") return "🔵";

        if (status === "Готово к выдаче") return "🟣";

        if (status === "Завершено") return "⚫";

        if (status === "Отклонено") return "🔴";
        else return "🟢🟡🔴";

    }


    console.log("RequestCard props:", props);

    console.log("RequestCard schedule:", props.schedule);


    return (
        <>

            <br />
            <div className="Cardus">
                <h3>📄 Информация о заявке</h3>

                <hr />
                <h4>Общая информация</h4>
                <div><strong>ID заявки:</strong> {props.request.id}</div>
                <div><strong>Дата создания:</strong> {props.request.createdAt}</div>

                <hr />
                <h4>👤 Информация о студенте</h4>
                <div><strong>Имя:</strong> {props.request.name}</div>
                <div><strong>Телефон:</strong> {props.request.phone}</div>
                <div><strong>Зачётная книжка:</strong> {props.request.studentTicket}</div>
                <div><strong>Комментарий студента:</strong> {props.request.commentStudent}</div>

                <hr />
                <h4>📅 Запись</h4>
                <div><strong>Услуга:</strong> {props.request.service}</div>
                <div><strong>ID времени:</strong> {props.request.selectedScheduleId}</div>
                <div><strong>Дата и время:</strong> {props.schedule.filter((time) => time.id === props.request.selectedScheduleId).map((time) => time.time + " — " + time.day + "." + time.month + "." + time.year)}</div>

                <hr />
                <h4>⚙ Работа администратора</h4>
                <div><strong>Статус:</strong> {getStatusEmoji(props.request.status)} {props.request.status}</div>
                <div><strong>Время смены статуса:</strong> {props.request.statusChangedAt}</div>
                <div><strong>Ответственный сотрудник:</strong> {props.request.nameAdminInWork}</div>
                <div><strong>Комментарий администратора:</strong> {props.request.commentAdmin}</div>





                <div>{props.isAdmin && props.request.status === "Подтверждено" && (
                    <div>
                        <strong>Имя сотрудника, вызвавшего в работу:</strong>
                        <input
                            type="text"
                            value={nameAdminInWork}
                            onChange={(e) => setNameAdmin(e.target.value)}
                        />
                    </div>
                )}</div>


                {
                    props.isAdmin && (
                        <>
                            <div><strong> Добавить комментарий администратора: </strong></div>

                            <input
                                type="text"
                                value={commentAdmin}
                                onChange={(e) => setcommentAdmin(e.target.value)}
                            />

                            <button onClick={() => {
                                props.updateRequestField(props.request.id, commentAdmin, "commentAdmin");
                                // props.updateRequestField(props.request.id, nameAdminInWork, "nameAdminInWork");
                            }
                            } >Добавить комментрий</button>



                        </>
                    )
                }

                {console.log(props.request)}




                {//блое витвления кнопок

                    props.isAdmin && props.request.status === "Ожидает подтверждения" && ( //подтвержение или откоонение + взятие в работу
                        <>
                            <br />
                            <button
                                onClick={() => props.changeStatus(props.request.id, "Подтверждено")}
                            >
                                Подтвердить
                            </button>
                            <button
                                onClick={() => props.changeStatus(props.request.id, "Отклонено")}
                            >
                                Отклонить
                            </button>
                        </>
                    )
                }

                {//блое витвления кнопок
                    props.isAdmin && props.request.status === "Подтверждено" && ( // взятие в работу  тут добавить еще пользователя взявшего в работу и дату взятия в работу
                        <>
                            <br />
                            <button
                                onClick={() => props.startWork(props.request.id, nameAdminInWork)} //костыль
                            >
                                Взять в работу
                            </button>

                        </>
                    )
                }


                {//блое витвления кнопок

                    props.isAdmin && props.request.status === "В обработке" && (
                        <>
                            <br />
                            <button
                                onClick={() => props.changeStatus(props.request.id, "Готово к выдаче")}
                            >
                                Готово к выдаче
                            </button>
                        </>
                    )

                }




                {//блое витвления кнопок

                    props.isAdmin && props.request.status === "Готово к выдаче" && (
                        <>
                            <br />
                            <button
                                onClick={() => props.changeStatus(props.request.id, "Завершено")}
                            >
                                Завершить
                            </button>
                        </>
                    )

                }


            </div>


        </>
    )
}

export default RequestsCard;