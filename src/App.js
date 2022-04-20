import React, { useState, useEffect } from 'react';
import { NavLink, Routes, Route } from "react-router-dom"
import './App.css'; //careful about importing css files from multiple locations.
import MakePoll from './MakePoll'
import Poll from './Poll'
function App() {
  const [show, setShow] = useState(true);
  var poll = '';
  // useEffect(() => {
  //     let url = window.location.href;
  //     if (url.includes('getPoll')) {
  // //       setPoll(fetch('https://df7h7a2mb9.execute-api.us-east-2.amazonaws.com/getPoll/' + "cXdyZTE2NTAzMzkxMjc5MDI=")
  // //       .then(response => response.json())
  // //       .then(json=> {return json.item}))
  // //       console.log(poll)
  //       setShow(false)
  //     }
  //   }
  // );

  // window.addEventListener("load",
  //     fetch('https://df7h7a2mb9.execute-api.us-east-2.amazonaws.com/getPoll/cXdyZTE2NTAzMzkxMjc5MDI=')
  //     .then(response => response.json())
  //     .then(json=> {
  //       poll = json.item
  //     }
  //       )
  // )

  return (
    <div className="App">
      {/* <header className="App-header"> */}
      {/* <Navigation /> */}

      { poll.id }
        <Main />
        <Routes>
          <Route path='/' element={<MakePoll />}></Route>
          <Route path='/getPoll/'>
            <Route path=':pollID' element={<Poll />}></Route>
            {/* <Route path=':pollID' element={<Poll params={poll} />}></Route> */}
          </Route>
        </Routes>
        {/* { show?<MakePoll></MakePoll>:<Routes> <Route params={poll} element={<PreVote />} /> </Routes> }
        <Routes> <Route path="getPoll/:pollID" element={<Vote />} /> </Routes> */}
      {/* </header> */}
    </div>
  );
}


// function Navigation() {
//   return (
//     <nav>
//       <ul>
//         {/* <li><NavLink to='/'>Home</NavLink></li> */}
//         {/* <li><NavLink to='/about'>About</NavLink></li> */}
//         {/* <li><NavLink to='/contact'>Contact</NavLink></li> */}
//       </ul>
//     </nav>
//   )
// };

function Main() {
  return (
    <Routes>
      {/* <Route path='/' component={Home}></Route>
      <Route path='/about' component={About}></Route>
      <Route path='/contact' component={Contact}></Route> */}
      <Route path='/' component={MakePoll}></Route>
    </Routes>
  );
}

export default App;
