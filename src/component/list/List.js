import React, { Component } from 'react';

class List extends Component {
    render() {
        return (
            <li className="list">
                <button className={
                    this.props.selected ? "selected" : ""} 
                    onClick={() => this.props.selectedItem(this.props.listId)}>
                    {this.props.listTitle}
                </button>
            </li>
        )
    }
}

export default List;