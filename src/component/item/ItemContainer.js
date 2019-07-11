import React, { Component } from 'react';
import Item from './Item';

class ItemContainer extends Component {
    render() {
        return (
            <div className="section item-container">
                <ul className="item-content">
                    <Item isDone={true} itemTitle="Take a shower" />
                    <Item isDone={false} itemTitle="Feed JB" />
                    <Item isDone={false} itemTitle="Take JB out for a walk" />
                </ul>
            </div>
        )
    }
}

export default ItemContainer;