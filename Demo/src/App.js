import React from 'react';
import Home from './components/home';
import Videoliveliness from './components/video-liveliness';
import {
    BrowserRouter as Router,
    Route,
    Link,
    NavLink
} from 'react-router-dom';
import './App.css';
import './index.css'
import './style.css';

function App() {
  return (
    <div className="App">
      <Router>
                <div className="header-main">
                    <ul className="header-nav">
                        <li>
                            <NavLink to="/" exact>Document Capture</NavLink>
                        </li>
                        <li>
                            <NavLink to="/video" exact>Video Liveliness</NavLink>
                        </li>
                    </ul>
                    <Route exact path="/" render={() => <Home/>} />
                    <Route exact path="/video" render={() => <Videoliveliness />} />
                </div>
            </Router>
    </div>
  );
}

export default App;
