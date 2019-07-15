import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import Navigation from './Navigation';
import ListContainer from './list/ListContainer';
import ItemContainer from './item/ItemContainer';
import Auth from './Auth';
import CreateList from './createList/CreateList';

class Main extends Component {
    state = {
        createListPop: false
    }

    createListPopHandler = () => {
        this.setState({ createListPop: !this.state.createListPop })
    }


    render() {
        const { isLoaded, notSignedIn, authInfo } = this.props;
        if (!isLoaded) return <h1>Loading</h1>

        return (
            <BrowserRouter>
                <div className="main">
                    <Navigation notSignedIn={notSignedIn} authInfo={authInfo} pop={this.createListPopHandler} />
                    {notSignedIn ? (
                        <div className="wrapper main-wrapper">
                            <Auth />
                        </div>
                    ) : (

                            <div className="wrapper main-wrapper">
                                {this.state.createListPop ? <CreateList pop={this.createListPopHandler} authInfo={authInfo} /> : null}
                                <ListContainer />
                                <ItemContainer />
                            </div>

                        )}
                </div>
            </BrowserRouter>
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