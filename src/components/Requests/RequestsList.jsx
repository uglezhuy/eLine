
import RequestsCard from './RequestCard'

import { useState } from 'react'




function RequestsList(props) {
    return (
        <>

            <h4>Заявки:</h4>
            {props.requests.map((request, index) => (
                <RequestsCard
                    key={index}
                    request={request}
                    changeStatus={props.changeStatus}
                    isAdmin={props.isAdmin}
                    updateRequestField={props.updateRequestField}
                    startWork={props.startWork}// костыль
                    schedule={props.schedule}
                    refreshRequests={props.refreshRequests}
                    setSchedule={props.setSchedule} />
            ))}
        </>
    )
}







export default RequestsList