import React, { Component } from 'react';
import { connect } from 'react-redux';

import Navigation from './Navigation';
import ListContainer from './list/ListContainer';
import ItemContainer from './item/ItemContainer';
import Auth from './Auth';

class Main extends Component {
    render() {
        const { isLoaded, notSignedIn, authInfo } = this.props;
        console.log(isLoaded, notSignedIn, authInfo);
        if(!isLoaded) return <h1>Loading</h1>

        return (
            <div className="main">
                <Navigation notSignedIn={notSignedIn} authInfo={authInfo}/>
                {notSignedIn ? (
                    <div className="wrapper main-wrapper">
                        <Auth />
                    </div>
                ) : (
                    <div className="wrapper main-wrapper">
                        <ListContainer />
                        <ItemContainer />
                    </div>
                )}
            </div>
        )
    }
}

const mapStateToProp = state => {
    // console.log(state)
    return {
        auth: state.auth,
        authInfo: state.firebase.auth,
        notSignedIn: state.firebase.auth.isEmpty,
        isLoaded: state.firebase.auth.isLoaded,
    }
} 

export default connect(mapStateToProp)(Main);