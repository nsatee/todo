import React, { Component } from 'react';
import List from './List';
import { connect } from 'react-redux';
import { FiPlus } from 'react-icons/fi'
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { compose } from 'redux';
import CreateList from '../createList/CreateList';

class ListContainer extends Component {
    state = {
        selectedItem: null,
        newListActive: false
    }

    selectedItem = (listId) => {
        this.setState({ selectedItem: listId });
        this.props.handleSelectedList(listId);
    }

    handleNewList = () => {
        this.setState({newListActive: !this.state.newListActive})
    }

    render() {
        const { lists } = this.props;
        return (
            <div className="section list-container">
                <div className="header-wrapper">
                    <h1 className="main-header">List</h1>
                    <button className="add-button"
                        onClick={() => {
                            document.querySelector('.list-content').scrollIntoView({block: 'start', behavior: 'smooth'});
                            document.querySelector('.new-list').focus();
                            this.setState({newListActive: true})
                        }}
                    >
                        <FiPlus />
                    </button>
                </div>
                <ul className="list-content">
                    <CreateList active={this.state.newListActive} toggleActive={this.handleNewList} authInfo={this.props.auth}/>
                    {
                        lists.map(
                            list => <List
                                key={list.id}
                                listTitle={list.listName}
                                date={list.createdAt.toDate()}
                                listId={list.id}
                                selected={
                                    list.id === this.state.selectedItem
                                }
                                selectedItem={this.selectedItem} />
                        )
                    }
                </ul>
            </div>
        )
    }
}

const mapStateToProps = ({ firebase: { auth }, firestore: { ordered } }) => {
    return {
        auth,
        lists: ordered.lists || [],
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect(props => {
        return [{
            collection: 'lists',
            where: [['creator', '==', props.auth.uid]],
            orderBy: ["createdAt", "desc"]
        }]
    }),
)(ListContainer);