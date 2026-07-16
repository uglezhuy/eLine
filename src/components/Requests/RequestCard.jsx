import { useState } from 'react'


function RequestsCard(props) {
    const [commentAdmin, setcommentAdmin] = useState("");








    return (
        <>
            <br />
            <div>Дата создания: {props.request.createdAt}</div>
            <div>ID заявки: {props.request.id}</div>
            <div >Название услуги: {props.request.service}</div>
            <div> Имя: {props.request.name}</div>
            <div> Телефон: {props.request.phone}</div>
            <div>Выбранное время  id: {props.request.selectedScheduleId}</div>
            <div>Комментарий студента:{props.request.commentStudent}</div>
            <div> Комментарий администратора:{props.request.commentAdmin}</div>
            <div> Текущий статус:{props.request.status}</div>
            {console.log(props.request)}

            {props.isAdmin && (
                <>
                    <div> Добавить комментарий администратора: </div>


                    <input
                        type="text"
                        value={commentAdmin}
                        onChange={(e) => setcommentAdmin(e.target.value)}
                    />
                    <button onClick={() => props.AddAdminComent(props.request.id, commentAdmin)} >Добавить комментрий</button>



                </>
            )
            }



            {
                props.isAdmin && (
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
        </>
    )
}

export default RequestsCard