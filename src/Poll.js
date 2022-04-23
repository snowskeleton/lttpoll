import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"
import { useInterval, api } from "./utils";
import ProgressBar from './Progress_bar'
import VoteButton from './VoteButton'

export default function Poll() {

    let params = useParams()
    const [poll, setPoll] = useState()
    const totalVotes = () => { return options[0].votes + options[1].votes }
    var [showVoteing, setShowVoting] = useState(true)
    var [options, setOptions] = useState(poll ? poll.options : [])

    const vote = (ballot) => {
        if (showVoteing) {
            fetch( api.vote + ballot.target.value, { "method": "PATCH", })
        }
        setShowVoting(false)
    }
    const votePercentage = (optVal) => {
        if (!poll) { return 0 } //null check
        const perc = ((optVal.votes / totalVotes()) * 100) //math
        //if return value shows 'NaN', return 0 instead
        //for some reason, a ternary doesn't work here
        if (perc) {
            return perc.toFixed(1)
        } else {
            return 0
        }
    }

    useEffect(() => {
        fetch(api.getPoll + params.pollID)
            .then(response => response.json())
            .then(data => {
                setPoll(data.body);
                setOptions((data.body.options));
            });
        if (poll) { roachly() }
    }, []);

    function roachly() {
        const aas = poll ?
            ([
                options[0].id,
                options[1].id]
                .join('&'))
            : null;
        fetch(api.getVotes + aas)
            .then(response => response.json())
            .then(data => { setOptions({ ...data.body }); });
    }

    // this runs every x miliseconds
    useInterval(() => { roachly(); },
        5000)

    return (
        <div className="App">
            <h1> {poll ? poll.name : ''} </h1>
            <h2> Total votes: {poll ? totalVotes() : ''}</h2>

            {poll ? VoteButton(options[0], vote, showVoteing) : null}
            {!showVoteing ?
                <ProgressBar
                    className="bar"
                    progress={votePercentage(options[0])}
                />
                : null}

            {poll ? VoteButton( options[1], vote, showVoteing) : null}
            {!showVoteing ?
                <ProgressBar
                    progress={votePercentage(options[1])}
                />
                : null}

            <p>Share your question with the world</p>
            <p><a href={window.location.href}>{window.location.href}</a></p>
            <a href="https://runty.link/lttpoll/">Make another Poll</a>
        </div>
    );
};
