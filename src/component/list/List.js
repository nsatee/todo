import React, { Component } from 'react';

class List extends Component {
    render() {
        return (
            <li className="list">
                <button>
                    {this.props.listTitle}
                </button>
            </li>
        )
    }
}

export default List;