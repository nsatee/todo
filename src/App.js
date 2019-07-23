import React, { Component } from 'react';
import './style/root.scss';
import Main from './component/Main';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Navigation from './component/Navigation';



class App extends Component {
    state = {
        createListPop: false,
        selectedList: null,
        selected: "signin"
    }

    createListPopHandler = () => {
        this.setState({ createListPop: !this.state.createListPop })
    }


    render() {
        const { notSignedIn, authInfo, profile } = this.props;
        if (!profile.isLoaded) {
            return (
                <div className="loading" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh' }}>
                    <h1>LOADING</h1>
                </div>
            )
        }
        return (
            <BrowserRouter>
                <div className={`App ${this.state.selected} ${notSignedIn ? 'not-signedin' : 'signedin'}`}>
                    <Navigation notSignedIn={notSignedIn} authInfo={authInfo} pop={this.createListPopHandler} profile={profile} />
                    {notSignedIn && (<div className="auth-functions">
                        <ul>
                            <li onClick={() => this.setState({ selected: "signin" })}>
                                Signin
                            </li>
                            <li onClick={() => this.setState({ selected: "signup" })}>
                                Signup
                            </li>
                        </ul>
                    </div>)}

                    <Switch>
                        <Route path="/" component={Main} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

const mapStateToProp = state => {
    return {
        auth: state.auth,
        authInfo: state.firebase.auth,
        notSignedIn: state.firebase.auth.isEmpty,
        isLoaded: state.firebase.auth.isLoaded,
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProp)(App);
