import React from 'react';
import { Routes, Route } from "react-router-dom"
import './App.css'; //careful about importing css files from multiple locations.
import MakePoll from './MakePoll'
import Poll from './Poll'
function App() {
  return (
    <div className="App">

        {/* <Main /> */}
        <Routes>
          <Route path="/getPoll/:pollID" element={<Poll />}></Route>
          <Route path='/' element={<MakePoll />}></Route>
            {/* <Route path=':pollID' element={<Poll />}></Route> */}
          {/* </Route> */}
        </Routes>
        {/* { show?<MakePoll></MakePoll>:<Routes> <Route params={poll} element={<PreVote />} /> </Routes> }
        <Routes> <Route path="getPoll/:pollID" element={<Vote />} /> </Routes> */}
    </div>
  );
}


// function Main() {
//   return (
//     <Routes>
//       <Route path='/getPoll/:pollID' element={Poll}></Route>
//       {/* <Route path='/about' component={About}></Route>
//       <Route path='/contact' component={Contact}></Route> */}
//       <Route path='/' element={MakePoll}></Route>
//     </Routes>
//   );
// }

export default App;
