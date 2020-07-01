import React, { Component } from 'react';
import './App.css';

import TeamList from './components/team-list/team-list';

const title = "Teams and Channels List";

class App extends Component {
  render() {
    return (
      <div>
        <h1>
          {title}
        </h1>
        <TeamList/>
      </div>
      
    );
  }
}

export default App;
