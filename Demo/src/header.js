import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    NavLink
} from 'react-router-dom';
import { withCookies, Cookies } from 'react-cookie';
import Home from './home';
import Vault from './vault';
import Selfie from './selfie';
import Selfietoken from './selfie-with-token';
/* import VideoLiveliness from './video-liveliness'; */
/* import ScreenCapture from './screen-capture'; */

class Header extends Component {
    constructor(props) {
        super(props);

        const { cookies } = props;
        let loginData = cookies.get('login');

        this.state = {
            login: loginData
        };

        this.logoutHandler = this.logoutHandler.bind(this);
    }

    logoutHandler() {
        this.props.logout();
    }

    render() {
        return (
            <Router>
                <div className="header-main">
                    <ul className="header-nav">
                        <li>
                            <NavLink to="/" exact>Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/vault" exact>Vault</NavLink>
                        </li>
                        <li>
                            <NavLink to="/selfie" exact>Selfie</NavLink>
                        </li>
                        {/* <li>
                            <NavLink to="/video" exact>Video</NavLink>
                        </li> */}
                        {/* <li>
                            <NavLink to="/capture" exact>Capture</NavLink>
                        </li> */}
                        <li>
                            <NavLink to="/selfie-with-token/5534e3d0-c83d-4b9c-bbc9-3473f4a89260" exact>Selfie with Token</NavLink>
                        </li>
                    </ul>
                    <Route exact path="/" render={() => <Home logout={this.logoutHandler} />} />
                    <Route exact path="/vault" render={() => <Vault logout={this.logoutHandler} />} />
                    <Route exact path="/selfie" render={() => <Selfie logout={this.logoutHandler} />} />
                    <Route exact path="/selfie-with-token/:selfie_token" render={() => <Selfietoken logout={this.logoutHandler} />} />
                    {/* <Route exact path="/video" render={() => <VideoLiveliness logout={this.logoutHandler} />} /> */}
                    {/* <Route exact path="/capture" render={() => <ScreenCapture logout={this.logoutHandler} />} /> */}
                    {this.state.login &&
                        <div className="login-detail">
                            Welcome {this.state.login.name}
                        </div>
                    }
                </div>
            </Router>
        );
    }
}

export default withCookies(Header);
