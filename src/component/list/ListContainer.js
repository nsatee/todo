import React, { Component } from 'react';
import List from './List';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { compose } from 'redux';

class ListContainer extends Component {
    state = {
        selectedItem: null
    }

    selectedItem = (listId) => {
        this.setState({selectedItem: listId});
        this.props.handleSelectedList(listId);
    }

    render() {
        const { lists } = this.props;
        console.log(lists)
        return (
            <div className="section list-container">
                <h1 className="main-header">List</h1>
                <ul className="list-content">
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
                            selectedItem={this.selectedItem}/>
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
            // orderBy: ["createdAt", "desc"]
        }]
    }),
)(ListContainer);