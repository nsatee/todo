import React, { Component } from 'react';
import { checkItem, deleteItem } from '../../store/actions/listAction'
import { connect } from 'react-redux';
import { FiX } from 'react-icons/fi'

class Item extends Component {
    render() {
        return (
            <li className={`item ${this.props.isDone ? "done" : "notdone"}`}>
                <div className="delete-icon">
                    <button className="icon" onClick={() => this.props.deleteItem(this.props.itemId)}>
                        <FiX />
                        <span>delete</span>
                    </button>
                </div>
                <a href="/"
                    onClick={(e) => {
                        e.preventDefault();
                        this.props.checkToggle(this.props.itemId, this.props.isDone);
                    }}
                >
                    <span className="checkbox">
                        {this.props.isDone ? <span className="check"></span> : null}
                    </span>
                    <span className="item-title">{this.props.itemTitle}</span>
                </a>
            </li>
        )
    }
}

const mapDispatchtoProps = dispatch => {
    return { 
        checkToggle: (itemId, status) => dispatch(checkItem(itemId, status)),
        deleteItem: (itemId) => dispatch(deleteItem(itemId))
    }
}

export default connect(null, mapDispatchtoProps)(Item);