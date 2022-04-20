import { useParams } from "react-router-dom"
import React, { useState, useEffect } from 'react';
// import ProgressBar from './Progress_bar'
// import Poll from "./Poll"

function Poll() {
  // const [poll, setPoll] = useState('')
  let params = useParams()
  // const setPollNow = (e) => {
  //   poll = e;
  // };

  // const params = new URLSearchParams(window.location.search);
  // window.addEventListener("load",
  //     fetch('https://df7h7a2mb9.execute-api.us-east-2.amazonaws.com/getPoll/' + "cXdyZTE2NTAzMzkxMjc5MDI=")
  //     .then(response => response.json())
  //     .then(json=> setPollNow(json.item))
  // )

//   Window.addEventListener("load", {
//       fetch('https://df7h7a2mb9.execute-api.us-east-2.amazonaws.com/getPoll/' + "cXdyZTE2NTAzMzkxMjc5MDI=")
//       .then(response => response.json())
//       .then(json => setPoll(json.item))
// });

  // useEffect(() => {
  //     const params = new URLSearchParams(window.location.search);
  //     fetch('https://df7h7a2mb9.execute-api.us-east-2.amazonaws.com/getPoll/' + "cXdyZTE2NTAzMzkxMjc5MDI=")
  //     .then(response => response.json())
  //     .then(json => setPoll(json.item))
  //     }, []);

  return (
    <div className="App">
      <header className='App-header'>
      <h2>Poll: {params.pollID}</h2>
        <ProgressBar bgcolor='green' progress={poll.options[0]} height={30} width={10} />
        <ProgressBar bgcolor='green' progress={poll.options[1]} height={30} width={10} />

        {/* <button onClick={createPoll}>
          Create
        </button> */}

      </header>
    </div>
  );
}

export default Poll;
