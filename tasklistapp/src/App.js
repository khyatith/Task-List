import React, { Component } from 'react';
import './App.css';
import TaskManager from './Components/TaskManager';

class App extends Component {
  render() {
    return (
      <div>
        <header className="container-fluid"></header>
        <TaskManager />
      </div>
    );
  }
}

export default App;
