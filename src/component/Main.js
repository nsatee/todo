import React, { Component } from 'react';
import { connect } from 'react-redux';

import ListContainer from './list/ListContainer';
import ItemContainer from './item/ItemContainer';
import Auth from './Auth';

class Main extends Component {
    state = {
        itemsActive: false,
        selectedList: null,
        listName: ""
    }

    createListPopHandler = () => {
        this.setState({ createListPop: !this.state.createListPop })
    }

    handleSelectedList = (listId, listName) => {
        this.setState({ selectedList: listId, listName });
    }

    handleMobileLayout = (actionBool) => {
        this.setState({itemsActive: actionBool});
    }

    render() {
        const { notSignedIn } = this.props;
        console.log(this.state.listName);
        return (
            <div className="main">
                {notSignedIn ? (
                    <div className="wrapper main-wrapper">

                        <Auth />
                    </div>
                ) : (
                        <div className={`wrapper main-wrapper ${this.state.itemsActive ? 'show-items' : ''}`}>
                            <ListContainer handleSelectedList={this.handleSelectedList} toggleItems={this.handleMobileLayout}/>
                            <ItemContainer selectedList={this.state.selectedList} listName={this.state.listName} toggleItems={this.handleMobileLayout}/>
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