import React from 'react';
import { Routes, Route } from "react-router-dom"
import './App.css'; //careful about importing css files from multiple locations.
import MakePoll from './MakePoll'
import Poll from './Poll'
function App() {
  return (
    <div className="App">

        <Routes>
          <Route path="/poll/:pollID" element={<Poll />}></Route>
          <Route path='/' element={<MakePoll />}></Route>
        </Routes>
    </div>
  );
}

export default App;
