import { useState } from 'react';
import { deleteRequest } from '../../../backend/api/requestApi.js';

import MoveRequest from './MoveRequest.jsx';

function RequestsCard(props) {
    const [commentAdmin, setcommentAdmin] = useState("");
    const [nameAdminInWork, setNameAdmin] = useState("");
    const [CommentAdminForHistory, setCommentAdminForHistory] = useState("");
    const [MoveMode, setMoveMode] = useState(false);

    function getStatusEmoji(status) {
        if (status === "Ожидает подтверждения") return "🟡";
        if (status === "Подтверждено") return "🟢";
        if (status === "В обработке") return "🔵";
        if (status === "Готово к выдаче") return "🟣";
        if (status === "Завершено") return "⚫";
        if (status === "Отклонено") return "🔴";

        return "🟢🟡🔴";
    }

    const selectedTime = props.schedule.find(
        (time) => time.id === props.request.selectedScheduleId
    );

    return (
        <>
            <div className="request-card">

                <div className="request-card-header">
                    <div>
                        <div className="request-card-title">
                            📄 Заявка №{props.request.id}
                        </div>

                        <div className="request-card-date">
                            Создана: {props.request.createdAt}
                        </div>
                    </div>

                    <div>
                        {getStatusEmoji(props.request.status)}
                        <span>{props.request.status}</span>
                    </div>
                </div>



                <div className="request-section">
                    <h4>👤 Информация о студенте</h4>

                    <div className="request-info-grid">
                        <div>
                            <span>Имя</span>
                            <strong>{props.request.name}</strong>
                        </div>

                        <div>
                            <span>Телефон</span>
                            <strong>{props.request.phone}</strong>
                        </div>

                        <div>
                            <span>Зачётная книжка</span>
                            <strong>{props.request.studentTicket}</strong>
                        </div>
                    </div>

                    {props.request.commentStudent && (
                        <div className="request-comment">
                            <span>Комментарий студента</span>
                            <p>{props.request.commentStudent}</p>
                        </div>
                    )}
                </div>



                <div className="request-section">
                    <h4>📅 Запись</h4>

                    <div className="request-info-grid">
                        <div>
                            <span>Услуга</span>
                            <strong>{props.request.service}</strong>
                        </div>

                        <div>
                            <span>ID времени</span>
                            <strong>{props.request.selectedScheduleId}</strong>
                        </div>

                        <div>
                            <span>Дата и время</span>
                            <strong>
                                {selectedTime
                                    ? `${selectedTime.schedule_date} ${selectedTime.schedule_time}`
                                    : "Не назначено"}
                            </strong>
                        </div>
                    </div>
                </div>



                <div className="request-section">
                    <h4>⚙ Работа администратора</h4>

                    <div className="request-info-grid">
                        <div>
                            <span>Статус</span>
                            <strong>
                                {getStatusEmoji(props.request.status)}{" "}
                                {props.request.status}
                            </strong>
                        </div>

                        <div>
                            <span>Изменён</span>
                            <strong>
                                {props.request.statusChangedAt || "—"}
                            </strong>
                        </div>

                        <div>
                            <span>Ответственный</span>
                            <strong>
                                {props.request.nameAdminInWork || "—"}
                            </strong>
                        </div>
                    </div>

                    {props.request.commentAdmin && (
                        <div className="request-comment admin-comment">
                            <span>Комментарий администратора</span>
                            <p>{props.request.commentAdmin}</p>
                        </div>
                    )}
                </div>


                {props.isAdmin && (
                    <div className="request-admin-panel">

                        <h4>🛠 Управление заявкой</h4>

                        {props.request.status === "Подтверждено" && (
                            <div className="request-field">
                                <label>
                                    Имя сотрудника, взявшего заявку в работу
                                </label>

                                <input
                                    type="text"
                                    value={nameAdminInWork}
                                    onChange={(e) =>
                                        setNameAdmin(e.target.value)
                                    }
                                    placeholder="Введите имя сотрудника"
                                />
                            </div>
                        )}


                        <div className="request-field">
                            <label>
                                Добавить комментарий администратора
                            </label>

                            <input
                                type="text"
                                value={commentAdmin}
                                onChange={(e) =>
                                    setcommentAdmin(e.target.value)
                                }
                                placeholder="Комментарий..."
                            />

                            <button
                                className="request-btn"
                                onClick={() => {
                                    props.updateRequestField(
                                        props.request.id,
                                        commentAdmin,
                                        "commentAdmin",
                                        props.refreshRequests
                                    );

                                    setcommentAdmin("");
                                }}
                            >
                                Добавить комментарий
                            </button>
                        </div>


                        <div>

                            {props.request.status === "Ожидает подтверждения" && (
                                <>
                                    <button
                                        className="request-btn success"
                                        onClick={() => {
                                            props.changeStatus(
                                                props.request.id,
                                                "Подтверждено",
                                                props.refreshRequests,
                                                CommentAdminForHistory
                                            );

                                            setCommentAdminForHistory("");
                                        }}
                                    >
                                        ✓ Подтвердить
                                    </button>

                                    <button
                                        className="request-btn danger"
                                        onClick={() => {
                                            props.changeStatus(
                                                props.request.id,
                                                "Отклонено",
                                                props.refreshRequests,
                                                CommentAdminForHistory
                                            );

                                            setCommentAdminForHistory("");
                                        }}
                                    >
                                        ✕ Отклонить
                                    </button>
                                </>
                            )}


                            {props.request.status === "Подтверждено" && (
                                <button
                                    className="request-btn primary"
                                    onClick={() => {
                                        props.startWork(
                                            props.request.id,
                                            nameAdminInWork,
                                            props.refreshRequests,
                                            CommentAdminForHistory
                                        );

                                        setCommentAdminForHistory("");
                                    }}
                                >
                                    ▶ Взять в работу
                                </button>
                            )}


                            {props.request.status === "В обработке" && (
                                <button
                                    className="request-btn purple"
                                    onClick={() => {
                                        props.changeStatus(
                                            props.request.id,
                                            "Готово к выдаче",
                                            props.refreshRequests,
                                            CommentAdminForHistory
                                        );

                                        setCommentAdminForHistory("");
                                    }}
                                >
                                    ✓ Готово к выдаче
                                </button>
                            )}


                            {props.request.status === "Готово к выдаче" && (
                                <button
                                    className="request-btn dark"
                                    onClick={() => {
                                        props.changeStatus(
                                            props.request.id,
                                            "Завершено",
                                            props.refreshRequests,
                                            CommentAdminForHistory
                                        );

                                        setCommentAdminForHistory("");
                                    }}
                                >
                                    ✓ Завершить
                                </button>
                            )}

                        </div>


                        <div>

                            <button
                                className="request-btn secondary"
                                onClick={() => setMoveMode(true)}
                            >
                                📅 Перенести время
                            </button>



                        </div>


                        <div className="request-field history-comment">
                            <label>
                                Комментарий к истории заявки
                            </label>

                            <input
                                type="text"
                                value={CommentAdminForHistory}
                                onChange={(e) =>
                                    setCommentAdminForHistory(e.target.value)
                                }
                                placeholder="Необязательный комментарий..."
                            />
                        </div>

                    </div>
                )}
                <button
                    className="request-btn danger-outline"
                    onClick={() => {
                        deleteRequest(
                            props.request.id,
                            props.refreshRequests,
                            CommentAdminForHistory
                        );

                        setCommentAdminForHistory("");
                    }}
                >
                    🗑 Удалить заявку
                </button>
                {props.isAdmin && MoveMode && (
                    <MoveRequest
                        setMoveMode={setMoveMode}
                        request={props.request}
                        refreshRequests={props.refreshRequests}
                        schedule={props.schedule}
                        setSchedule={props.setSchedule}
                    />
                )}
            </div>




        </>
    );
}

export default RequestsCard;