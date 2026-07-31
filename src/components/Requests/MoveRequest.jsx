import Schedule from "../Schedules/Schedule";

import { moveRequest } from '../../../backend/api/requestApi.js'
import { loadSchedule } from '../../../backend/api/requestApi.js'

import { useState } from 'react'

function MoveRequest(props) {

    const [selectedScheduleId, setSelectedScheduleId] = useState(null);
    const [selectedDay, selectedDaySet] = useState(null);
    console.log(props.request);

    console.log(props.request.selectedScheduleId);

    console.log(props.request.selectedScheduleId);
    return (
        <>
            <br />
            <div>
                Перенос записи
                <div><strong>ID заявки:</strong> {props.request.id}</div>
                <div><strong>Текущая дата создания:</strong> {props.request.createdAt}</div>

                <Schedule
                    isAdmin={false}
                    schedule={props.schedule}

                    selectedScheduleId={selectedScheduleId}
                    setSelectedScheduleId={setSelectedScheduleId}

                    selectedDay={selectedDay}
                    selectedDaySet={selectedDaySet}
                />

                <button onClick={() => props.setMoveMode(false)}>Отмена (Скрыть панель)</button>

                <button
                    disabled={!selectedScheduleId}
                    onClick={() =>
                        moveRequest(
                            props.request.id,
                            selectedScheduleId,
                            props.request.selectedScheduleId,

                            props.refreshRequests,
                            () => loadSchedule(props.setSchedule)
                        )
                    }
                >
                    Перенести
                </button>
            </div>
        </>
    )
}
export default MoveRequest;