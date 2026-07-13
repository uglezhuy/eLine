import '../App.css'


function RequestsCard(props) {


    return (
        <>
            <br />
            <div >{props.request.service}</div>
            <div>{props.request.name}</div>
            <div>{props.request.phone}</div>
            <div>Выбранное время  id {props.request.selectedScheduleId}</div>
            <div>{props.request.status}</div>


            <button onClick={() => props.chengeStatus(props.request.id)}>Подтвердить</button>


        </>
    )
}














export default RequestsCard