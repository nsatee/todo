import React, { Component } from 'react';
import { connect } from 'react-redux';

import ListContainer from './list/ListContainer';
import ItemContainer from './item/ItemContainer';
import Auth from './Auth';

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
        const { notSignedIn } = this.props;
        return (
            <div className="main">
                {notSignedIn ? (
                    <div className="wrapper main-wrapper">
                        <Auth />
                    </div>
                ) : (
                        <div className="wrapper main-wrapper">
                            {/* {this.state.createListPop ? <CreateList pop={this.createListPopHandler} authInfo={authInfo} /> : null} */}
                            <ListContainer handleSelectedList={this.handleSelectedList} />
                            <ItemContainer selectedList={this.state.selectedList} />
                        </div>

                    )}
            </div>
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