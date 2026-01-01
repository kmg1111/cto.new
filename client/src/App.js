import React from 'react';
import Scene from './components/Scene';
import ControlPanel from './components/ControlPanel';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="viewport">
        <Scene />
      </div>
      <ControlPanel />
    </div>
  );
}

export default App;
