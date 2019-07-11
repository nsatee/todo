import React, { Component } from 'react';

class Item extends Component {
    state = {
        isDone: this.props.isDone
    }

    render() {
        return (
            <li className="item">
                <button onClick={() => this.setState({ isDone: !this.state.isDone })}>
                    <span className="checkbox">
                        {this.state.isDone ? <span className="check"></span> : null}
                    </span>
                    <span className="item-title">{this.props.itemTitle}</span>
                </button>
            </li>
        )
    }
}

export default Item;