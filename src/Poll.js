import { useParams } from "react-router-dom"
import React, { useState, useEffect } from 'react';
import ProgressBar from './Progress_bar'
import { type } from "@testing-library/user-event/dist/type";

function UnPoll(wood) {
    this.id = Object.entries(wood)[0][1]['id']
    this.name = Object.entries(wood)[0][1]['name']
    this.options = Object.entries( Object.entries(wood)[0][1])[0][1]
    this.options = Object.fromEntries( Object.entries(this.options))
    this.options.fir = Object.entries(this.options)[0][0]
    this.options.sec = Object.entries(this.options)[0][1]

    console.log (
        JSON.stringify (
            console.log(Object.entries(this.options)[0][1]['id'])
                // Object.entries(
                // )
        )
    )


    // console.log(this.options)
    // console.log(Object.entries(Object.entries(wood)[0][1])[0][1][1]['id'])
    // this.options.id = Object.entries( Object.entries(wood)[0][1])[0][1][1]['id']
    // this.options.vote = Object.entries( Object.entries(wood)[0][1])[0][1][1]['vote']
    // this.options.text = Object.entries( Object.entries(wood)[0][1])[0][1][1]['text']
    // this.options = Object.entries(wood)[0]['options']['1']
    // this.options.id = Object.entries(wood)[0][1]['options']['id']
    // this.options.votes = Object.entries(wood)[0][1]['options']['votes']
    // this.options.text = Object.entries(wood)[0][1]['options']['text']
}
export default function Poll() {
    let params = useParams()
    const [poll, setPoll] = useState("WRONG")

    useEffect(() => {
        fetch("https://df7h7a2mb9.execute-api.us-east-2.amazonaws.com/getPoll/" + params.pollID)
            .then(response => response.json())
            .then(data => {
                const v = Object.entries(data)
                const a = Object.fromEntries(v)
                setPoll(a)
            })

    }, []);


    return (
        <div className="Poll">
            <h2> {
                // console.log(
                //     JSON.stringify(
                //         Object.entries(
                //             Object.entries(poll)[0][1]
                //         )[0][1][1]

                //     )
                // )
            }</h2>
            <h2> {new UnPoll(poll).id} </h2>
            <h2> {new UnPoll(poll).name} </h2>
            <h2> {JSON.stringify(new UnPoll(poll).options)} </h2>
            {/* <h2> {new JSON.stringify(UnPoll(poll).options)} </h2> */}
            {/* {params.pollID} */}
            {/* <ProgressBar bgcolor='green' progress={params.options[0]} height={30} width={10} /> */}
            {/* <ProgressBar bgcolor='green' progress={poll} height={30} width={10} /> */}

            {/* <button onClick={useEffect}>
                Create
            </button> */}

        </div>
    );
}
