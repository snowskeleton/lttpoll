import React from "react"
export default function VoteButton(data, func, condition) {
    return (
        <div>
            <h3>{data.text}</h3>
            {condition ?
                <button
                    value={data.id}
                    onClick={func}
                >
                    vote!
                </button>
                : null}
        </div>
    )

}
