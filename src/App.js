import React, { Component } from 'react';
import './style/root.scss';
import Main from './component/Main';

import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Navigation from './component/Navigation';



class App extends Component {
    state = {
        createListPop: false,
        selectedList: null
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
                <div className="App">
                    <Navigation notSignedIn={notSignedIn} authInfo={authInfo} pop={this.createListPopHandler} profile={profile} />
                    <Main />
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
