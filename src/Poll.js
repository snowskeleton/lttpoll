// import { useParams } from "react-router-dom"
import React, { useState, useEffect } from 'react';
// import ProgressBar from './Progress_bar'

export default function Poll() {
    // let params = useParams()
    const [dat, setPoll] = useState(" not yet an object ")

    useEffect(() => {
        fetch("https://df7h7a2mb9.execute-api.us-east-2.amazonaws.com/getPoll/cXdyZTE2NTAzMzkxMjc5MDI=")
            .then(response => response.json())
            .then(data => { setPoll(data)})
    }, []);


    return (
        <div className="Poll">
            <h2>Poll:  {JSON.stringify(dat.Item)} </h2>
            {/* <ProgressBar bgcolor='green' progress={poll.options[0]} height={30} width={10} />
        <ProgressBar bgcolor='green' progress={poll.options[1]} height={30} width={10} /> */}

            <button onClick={useEffect}>
                Create
            </button>

        </div>
    );
}
