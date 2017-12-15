import React, { Component } from 'react';
import './App.css';

import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';
import router from './router';

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            {
              router.map((path, i) =>
                path.type === 'route' ?
                <Route {...path} key={i} /> :
                <Redirect {...path} key={i}/>
              )
            }
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
