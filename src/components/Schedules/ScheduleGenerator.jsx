import { addScheduleGenerator } from '../../../backend/api/requestApi.js'
import { useState } from 'react'


function ScheduleGenerator(props) {


    const [employee_id, setemployee_id] = useState("");

    const [dateStart, setDateStart] = useState("");
    const [dateEnd, setDateEnd] = useState("");

    const [timeStart, setTimeStart] = useState("");
    const [timeEnd, setTimeEnd] = useState("");

    const [interval, setInterval] = useState(30);

    const [workingDays, setWorkingDays] = useState({
        mon: true,
        tue: true,
        wed: true,
        thu: true,
        fri: true,
        sat: false,
        sun: false,
    });

    const weekDays = [
        { key: "mon", label: "Пн" },
        { key: "tue", label: "Вт" },
        { key: "wed", label: "Ср" },
        { key: "thu", label: "Чт" },
        { key: "fri", label: "Пт" },
        { key: "sat", label: "Сб" },
        { key: "sun", label: "Вс" },
    ];

    return (
        <>

            <div>Генерация расписания:</div>


            <div>id сотрудника</div>
            <input
                type="text"
                placeholder="Введите id сотрудника"
                value={employee_id}
                onChange={(e) => setemployee_id(e.target.value)}
            />

            <div>Дата начала</div>
            <input
                type="date"
                value={dateStart}
                onChange={(e) => setDateStart(e.target.value)}
            />
            <div>Дата окончания</div>
            <input
                type="date"
                value={dateEnd}
                onChange={(e) => setDateEnd(e.target.value)}
            />

            <div> Рабочие дни</div>

            <>{
                weekDays.map((day) => (
                    <label key={day.key}>
                        <input
                            type="checkbox"
                            checked={workingDays[day.key]}
                            onChange={(e) =>
                                setWorkingDays({
                                    ...workingDays,
                                    [day.key]: e.target.checked
                                })
                            }
                        />
                        {day.label}
                    </label>
                ))}
            </>

            <div>Начало рабочего дня</div>
            <input
                type="time"
                value={timeStart}
                onChange={(e) => setTimeStart(e.target.value)}
            />

            <div>Конец рабочего дня</div>
            <input
                type="time"
                value={timeEnd}
                onChange={(e) => setTimeEnd(e.target.value)}
            />

            <div> Интервал</div>
            <select
                value={interval}
                onChange={(e) => setInterval(Number(e.target.value))}
            >
                <option value="15">15 минут</option>
                <option value="30">30 минут</option>
            </select>

            <button

                onClick={() => {

                    addScheduleGenerator(employee_id, dateStart, dateEnd, timeStart, timeEnd, interval, workingDays)
                        .then((data) => {
                            alert("Расписание создано");
                        })
                        .catch((err) => {
                            console.error(err);
                            if (err.message) {
                                alert(err.message);
                            } else {
                                alert("Ошибка создания расписания");
                            }
                        });
                }}
            >
                Сгенерировать расписание
            </button>

        </>
    )
}
export default ScheduleGenerator