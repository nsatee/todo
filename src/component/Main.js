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
        createListPop: false,
        selectedList: null
    }

    createListPopHandler = () => {
        this.setState({ createListPop: !this.state.createListPop })
    }

    handleSelectedList = (listId) => {
        this.setState({ selectedList: listId });
    }


    render() {
        const { notSignedIn, authInfo, profile } = this.props;
        if (!profile.isLoaded) { 
            return (
                <div className="loading" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh'}}>
                    <h1>LOADING</h1>
                </div>
            ) 
        }

        return (
            <BrowserRouter>
                <div className="main">
                    <Navigation notSignedIn={notSignedIn} authInfo={authInfo} pop={this.createListPopHandler} profile={profile} />
                    {notSignedIn ? (
                        <div className="wrapper main-wrapper">
                            <Auth />
                        </div>
                    ) : (
                            <div className="wrapper main-wrapper">
                                {this.state.createListPop ? <CreateList pop={this.createListPopHandler} authInfo={authInfo} /> : null}
                                <ListContainer handleSelectedList={this.handleSelectedList} />
                                <ItemContainer selectedList={this.state.selectedList} />
                            </div>

                        )}
                </div>
            </BrowserRouter>
        )
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

export default connect(mapStateToProp)(Main);