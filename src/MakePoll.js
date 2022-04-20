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
      "https://6x0en74zod.execute-api.us-east-2.amazonaws.com/polls", {
      "method": "PUT",
      "headers": {
        "content-type": "application/json",
      },
      "body": body
    });
    window.location.replace(`/getPoll/${JSON.parse(body).id}`);
  };

  return (
    <div className="App">
      <header className='App-header'>

        <input
          className="name"
          onChange={setNameInput}
          value={name}
          placeholder="Title your Poll" />
        <input
          onChange={setOptionOneInput}
          className="opt1"
          value={optOneName}
          placeholder="Option 1" />
        <input
          onChange={setOptionTwoInput}
          className="opt2"
          value={optTwoName}
          placeholder="Option 2" />

        <button onClick={CreatePoll}>
          Create
        </button>

      </header>
    </div>
  );
}

export default MakePoll;
