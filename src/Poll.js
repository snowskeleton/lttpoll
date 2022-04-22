import { useParams } from "react-router-dom"
import React, { useState, useEffect } from 'react';
import ProgressBar from './Progress_bar'
import { useInterval } from "./utils";

export default function Poll() {
    const sendVote = (vote) => {
        setShowVoting(false)
        fetch(
            "https://6x0en74zod.execute-api.us-east-2.amazonaws.com/option/" +
            vote.target.value, { "method": "PATCH", })
    }
    let params = useParams()

    const [poll, setPoll] = useState()

    var [showVoteing, setShowVoting] = useState(true)
    var [options, setOptions] = useState(poll ? poll.options : [])

    useEffect(() => {
        fetch("https://6x0en74zod.execute-api.us-east-2.amazonaws.com/poll/" + params.pollID)
            .then(response => response.json())
            .then(data => { setPoll(data.body); setOptions((data.body.options)) })
    }, []);

    useInterval(() => { roachly() },
        10000)

    const roachly = () => {
        const baseUrl = 'https://6x0en74zod.execute-api.us-east-2.amazonaws.com/votes/';
        const arrayAsString = poll ? ([options[0].id, options[1].id].join('&')) : null
        fetch(baseUrl + arrayAsString)
            .then(response => response.json())
            .then(data => { setOptions({ ...data.body }) })
    }

    const optVal = (optVal) => {
        if (!poll) { return 0 }
        let total = options[0].votes + options[1].votes
        var perc = ((optVal.votes / total) * 100)
        return perc.toFixed(1)
    }
    const totalVotes = () => {
        return options[0].votes + options[1].votes
    }


    // const optVal = () => {
    //     if (!poll) { return 0 }
    //     let total = options[0].votes + options[1].votes
    //     var perc = ((options[1].votes / total) * 100)
    //     return perc.toFixed()
    // }

    return (
        <div className="App">
            <header className="App-header">
                <h1> {poll ? poll.name : ''} </h1>
                <h2> Total votes: {poll? totalVotes() : ''}</h2>

                {poll ?
                    button(
                        options[0],
                        sendVote,
                        'vote!',
                        showVoteing
                    )
                    : null}
                <ProgressBar bgcolor='green' progress={optVal(options[0])} height={30} width={10} />

                {poll ?
                    button(
                        options[1],
                        sendVote,
                        'vote!',
                        showVoteing
                    )
                    : null}
                <ProgressBar bgcolor='green' progress={optVal(options[1])} height={30} width={10} />

            </header>
        </div>
    );
};

function button(data, func, label, show) {
    return (
        <div>
            <h3>{data.text}</h3>
            {show ?
                <button
                    value={data.id}
                    onClick={func}>
                    {label}
                </button>
                : null}
        </div>
    )

}
