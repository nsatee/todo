import React, { Component } from 'react';
import List from './List';

class ListContainer extends Component {
    render() {
        return (
            <div className="section list-container">
                <h1 className="main-header">List</h1>
                <ul className="list-content">
                    <List listTitle="Today List"/>
                    <List listTitle="Shopping"/>
                </ul>
            </div>
        )
    }
}

export default ListContainer;