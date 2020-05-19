import React from 'react';
import logo from './logo.svg';
import { renderRoutes } from 'react-router-config';
import routes from './routers';
import NavBar from './components/Navbar';
import './App.css';


const rootPath = process.env.PUBLIC_URL;
class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let style = {
      containerstyle:{
        "padding-top":"10vh",
        "padding-left":"5vw",
        "padding-right":"5vw",
      }
    }
    return (
      <React.Fragment>
        <NavBar />
        <div style={style.containerstyle}>
        {renderRoutes(routes)}
        </div>
      </React.Fragment>
    );
  }
}

export default App;
