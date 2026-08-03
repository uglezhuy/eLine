import { useState, useEffect } from 'react'


import { getRequestHistoryByID } from '../../../backend/api/requestApi.js'



function Sequest_history(props) {
    const [RequestId, setRequestId] = useState(null)
    const [RequestHistory, setRequestHistory] = useState([]);


    useEffect(() => {
        if (RequestId !== null) {
            getRequestHistoryByID(RequestId, setRequestHistory);
        }
    }, [RequestId]);


    return (
        <>
            <div className="Cardus">
                <h4>История заявок:</h4>

                <div> Выберете id зявки для отображения ее истории:</div>
                <select
                    value={RequestId ?? ""}
                    onChange={(e) =>
                        setRequestId(
                            e.target.value === "" ? null : Number(e.target.value))}>

                    <option value="">-- выберите заявку --</option>
                    {props.requests.map((r) => (
                        <option key={r.id} value={r.id}>
                            {r.id}
                        </option>
                    ))}
                </select>
                <button
                    onClick={() => {
                        setRequestId(null);
                        setRequestHistory([]);
                    }}>
                    Скрыть историю
                </button>
                <div >Истроия по заявки {RequestId}:</div>
                {console.log(RequestHistory)}
                {
                    RequestHistory.map((r) => (
                        <div key={r.id}>
                            <>
                                <div>ID записи: {r.id}</div>
                                <div>ID заявки: {r.request_id}</div>
                                <div>Действие: {r.action}</div>
                                <div>Поле: {r.field_name ?? '-'}</div>
                                <div>Старое значение: {r.old_value ?? '-'}</div>
                                <div>Новое значение: {r.new_value ?? '-'}</div>
                                <div>Тип пользователя: {r.changed_by_type}</div>
                                <div>ID пользователя: {r.changed_by_id ?? '-'}</div>
                                <div>Имя пользователя: {r.changed_by_name ?? '-'}</div>
                                <div>Комментарий: {r.comment ?? '-'}</div>
                                <div>Дата: {r.created_at}</div>
                                <hr />
                            </>
                        </div>
                    ))
                }
            </div>
        </>
    )
}


export default Sequest_history