import React, { Component } from 'react';
import moment from 'moment';
import { FiMoreVertical } from "react-icons/fi";

class List extends Component {
    state = {
        showAction: false,
        activeId: null
    }
    render() {
        console.log(this.props);
        return (
            <li className="list">
                <a className={
                    this.props.selected ? "selected" : ""}
                    onClick={() => this.props.selectedItem(this.props.listId)}>
                    <div className="info">
                        <span className="title">{this.props.listTitle}</span>
                        <span className="date">{moment(this.props.date).fromNow()}</span>
                    </div>
                    <div className="actions">
                        <span className="icon" onClick={(e) => { e.preventDefault(); this.setState({ showAction: !this.state.showAction, activeId: this.props.listId }) }}>
                            <FiMoreVertical />
                        </span>
                        {
                            this.state.showAction && this.props.selected ? (
                                <ul className="dropdown">
                                    <li className="dropdown-list">
                                        <button>Edit</button>
                                    </li>
                                    <li className="dropdown-list">
                                        <button className="delete">Delete</button>
                                    </li>
                                </ul>
                            ) : null
                        }
                    </div>
                </a>
            </li>
        )
    }
}

export default List;