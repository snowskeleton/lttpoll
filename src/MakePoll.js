import React, { useState } from 'react';
import BuildBody from './BodyBuilder';

function MakePoll() {
  const [name, setName] = useState('')
  const [optOneName, setOptionOne] = useState('')
  const [optTwoName, setOptionTwo] = useState('')
  const setNameInput = e => { setName(e.target.value); };
  const setOptionOneInput = e => { setOptionOne(e.target.value); };
  const setOptionTwoInput = e => { setOptionTwo(e.target.value); };

  const CreatePoll = async () => {
    const body = BuildBody(name, [optOneName, optTwoName])
    await fetch(
      "https://6x0en74zod.execute-api.us-east-2.amazonaws.com/poll", {
      "method": "PUT",
      "headers": {
        "content-type": "application/json",
      },
      "body": body
    })
    console.log(body)
    window.location.replace(`/poll/${JSON.parse(body).id}`);
  };

  return (
    <div className="App">
      <header className='App-header'>

        <p>Share your controversial opinion with the world</p>
        <input
          onChange={setNameInput}
          className="name large"
          value={name}
          placeholder="title" />

        <p className='large'>Let the internet decide!</p>
        <p>Will it be ...</p>
        <input
          onChange={setOptionOneInput}
          className="opt1 large"
          value={optOneName}
          placeholder="option one" />

          <p>Or ...</p>
        <input
          onChange={setOptionTwoInput}
          className="opt2 large"
          value={optTwoName}
          placeholder="option two" />

        <h6>* please hire me </h6>
        <button
        onClick={CreatePoll}>
          Pose
        </button>

      </header>
    </div>
  );
}

export default MakePoll;
