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
                    value={RequestId}
                    onChange={(e) => setRequestId(Number(e.target.value))}
                >
                    {
                        props.requests.map((r) => <option value={r.id}>{r.id}</option>)
                    }

                </select>
                <div >Истроия по заявки {RequestId}:</div>
                {console.log(RequestHistory)}
            </div>
        </>
    )
}


export default Sequest_history