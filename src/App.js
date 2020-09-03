import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Search from './Search';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppBar>
            <Toolbar>
              <Typography variant="h6" color="inherit">
                React Issues
              </Typography>
            </Toolbar>
        </AppBar>
        <Search>
        </Search>
      </div>
    );
  }
}

export default App;
