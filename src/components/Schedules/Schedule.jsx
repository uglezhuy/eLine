import { updateScheduleFieldisActive } from '../../../backend/api/requestApi.js'


function Schedule(props) {
    function getUniqueDays(days) {

        const daysList = new Set();
        const uniqueDays = [];

        days.forEach((day) => {
            const dateKey = `${day.schedule_date}`;

            if (!daysList.has(dateKey)) {
                daysList.add(dateKey);
                uniqueDays.push(day);
            };
        })
        return uniqueDays;
    }

    return (
        <>
            {
                props.isAdmin && (
                    <>
                        <div> Администроатор МОД</div >
                    </>
                )
            }

            {
                !props.isAdmin && (
                    <>
                        <div> Студент МОД</div >
                    </>

                )
            }
            <>
                <div>{
                    getUniqueDays(props.schedule).map((day) => {
                        return (
                            <>
                                <button onClick={() => props.selectedDaySet(day)}>

                                    {day.schedule_date}
                                </button>
                                <br />
                            </>
                        );
                    })}
                </div>

                {props.selectedDay === null ? "Дата не выбранна" :

                    <> <div> Выбрана дата: {props.selectedDay.schedule_date}</div>
                        {props.selectedScheduleId !== null && (
                            <div>
                                Выбрано время: {
                                    props.schedule.find(item => item.id === props.selectedScheduleId)?.schedule_time
                                }
                            </div>
                        )}
                        <div>Выберите время:</div>
                        <div>{


                            props.schedule.map((time) => {

                                if (time.schedule_date !== props.selectedDay.schedule_date) {
                                    return null;
                                }


                                const isBusy = props.requests.some(
                                    (request) => request.selectedScheduleId === time.id
                                );

                                if (!props.isAdmin) {
                                    return isBusy ? null : (
                                        <>
                                            <button onClick={() => props.setSelectedScheduleId(time.id)}>
                                                {time.schedule_time + "/" + time.schedule_date}
                                            </button>
                                            <br />
                                        </>
                                    );

                                }


                                if (props.isAdmin) {

                                    if (isBusy) {
                                        return (


                                            <>
                                                <button onClick={() => props.setSelectedScheduleId(time.id)}>
                                                    {time.schedule_time + "/" + time.schedule_date + " " + "is_active" + time.is_active + " " + "🔴Время занято"}
                                                </button>
                                                <br />
                                            </>
                                        )
                                    };
                                    if (!isBusy) {
                                        return (
                                            <>
                                                <button onClick={() => props.setSelectedScheduleId(time.id)}>
                                                    {time.schedule_time + "/" + time.schedule_date + " " + "is_active" + time.is_active + " " + "🟢Время свободно"}
                                                </button>
                                                <label>

                                                    <input
                                                        type="checkbox"
                                                        checked={time.is_active === 1}
                                                        onChange={(e) => {
                                                            updateScheduleFieldisActive(
                                                                time.id,
                                                                e.target.checked ? 1 : 0,
                                                                props.loadScheduleAdmin

                                                            );
                                                        }}
                                                    />
                                                    Активно
                                                </label>
                                                <br />
                                            </>
                                        )
                                    }

                                }









                            }



                            )}
                        </div>

                    </>
                }

            </>



        </>
    )
}

export default Schedule