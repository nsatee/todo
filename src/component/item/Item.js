import React, { Component } from 'react';
import { checkItem } from '../../store/actions/listAction'
import { connect } from 'react-redux';

class Item extends Component {
    render() {
        return (
            <li className={`item ${this.props.isDone ? "done" : "notdone"}`}>
                <button onClick={() => this.props.checkToggle(this.props.itemId, this.props.isDone)}>
                    <span className="checkbox">
                        {this.props.isDone ? <span className="check"></span> : null}
                    </span>
                    <span className="item-title">{this.props.itemTitle}</span>
                </button>
            </li>
        )
    }
}

const mapDispatchtoProps = dispatch => {
    return { checkToggle: (itemId, status) => dispatch(checkItem(itemId, status)) }
}

export default connect(null, mapDispatchtoProps)(Item);