import React, { Component } from 'react';
import List from './List';
import { connect } from 'react-redux';

class ListContainer extends Component {
    render() {
        const { lists } = this.props;
        console.log(this.props);
        return (
            <div className="section list-container">
                <h1 className="main-header">List</h1>
                <ul className="list-content">
                    {
                        lists.map(list => <List key={list.id} listTitle={list.listName} />)
                    }
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        lists: state.lists.list,
    }
}

export default connect(mapStateToProps)(ListContainer);