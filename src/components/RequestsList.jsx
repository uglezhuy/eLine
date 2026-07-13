
import RequestsCard from './RequestCard'

import { useState } from 'react'




function RequestsList(props) {
    return (
        <>
            <br />
            <h4>Заявки:</h4>
            {props.requests.map((request, index) => (
                <RequestsCard
                    key={index}
                    request={request}
                    chengeStatus={props.chengeStatus}

                />
            ))}
        </>
    )
}







export default RequestsList