import React, { Component } from 'react';
import { FiCheck, FiX, FiPlus } from "react-icons/fi";
import Item from './Item';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createItem } from '../../store/actions/listAction';
import { firestoreConnect } from 'react-redux-firebase';

class ItemContainer extends Component {
    state = {
        addNewItemPop: false,
        itemInput: "",
        filter: "all",
    }

    handleCreatingItem = (e) => {
        e.preventDefault();
        this.props.createItem({
            listId: this.props.selectedList,
            itemInfo: this.state.itemInput,
            creator: this.props.auth.uid
        })
        this.setState({ itemInput: "", addNewItemPop: false });
    }

    render() {
        return (
            <div className={`section item-container ${this.state.filter}`}>
                <div className="item-action">
                    <div className="show-action">
                        <button className={`show-all ${this.state.filter === 'all' ? 'active' : ''}`} onClick={() => this.setState({ filter: "all" })}>All</button>
                        <button className={`show-done  ${this.state.filter === 'done' ? 'active' : ''}`} onClick={() => this.setState({ filter: "done" })}>Completing</button>
                        <button className={`show-notdone  ${this.state.filter === 'notdone' ? 'active' : ''}`} onClick={() => this.setState({ filter: "notdone" })}>Completed</button>
                    </div>
                    <button className={`add ${this.props.selectedList !== null}`}
                        onClick={() => {
                            this.props.selectedList !== null && this.setState({ addNewItemPop: true })
                        }}><FiPlus /></button>
                    {
                        this.state.addNewItemPop ? (
                            <div className="add-item-input">
                                <form class="add-item-form" onSubmit={(e) => this.handleCreatingItem(e)}>
                                    <input type="text"
                                        placeholder="New item"
                                        onChange={(e) => this.setState({ itemInput: e.target.value })}
                                        value={this.state.itemInput}
                                    />
                                    <div className="add-action">
                                        <span className="no"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                this.setState({ addNewItemPop: false })
                                            }}
                                        >
                                            <FiX />
                                        </span>
                                        <button className="yes" type="submit"><FiCheck /></button>
                                    </div>
                                </form>
                            </div>) : null
                    }
                </div>
                <ul className="item-content">
                    {this.props.items.map(item => <Item isDone={item.isDone} itemTitle={item.itemContent} key={item.id} itemId={item.id} />)}
                </ul>
            </div>
        )
    }
}


const mapDispatchToProps = dispatch => {
    return {
        createItem: (itemInfo) => dispatch(createItem(itemInfo))
    }
}

const mapStateToProps = ({ firebase: { auth }, firestore: { ordered } }) => {
    return {
        auth,
        items: ordered.items || [],
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(props => {
        return [{
            collection: 'items',
            where: [['listId', '==', props.selectedList]],
            orderBy: ["createdAt", "desc"]
        }]
    })
)(ItemContainer);