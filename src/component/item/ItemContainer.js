import React, { Component } from 'react';
import { FiCheck, FiX, FiPlus, FiChevronLeft } from "react-icons/fi";
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
        isValid: null,
    }

    handleCreatingItem = (e) => {
        e.preventDefault();
        if (this.state.isValid) {
            this.props.createItem({
                listId: this.props.selectedList,
                itemInfo: this.state.itemInput,
                creator: this.props.auth.uid
            })
            this.setState({ itemInput: "", addNewItemPop: false, isValid: false });
        }
        return;
    }

    render() {
        return (
            <div className={`section item-container ${this.state.filter} ${this.state.isValid === null ? "show" : ""}`}>
                <div className="item-action">
                    <div className="show-action">
                        <button className={`show-all ${this.state.filter === 'all' ? 'active' : ''}`} onClick={() => this.setState({ filter: "all" })}>All</button>
                        <button className={`show-done  ${this.state.filter === 'done' ? 'active' : ''}`} onClick={() => this.setState({ filter: "done" })}>Completing</button>
                        <button className={`show-notdone  ${this.state.filter === 'notdone' ? 'active' : ''}`} onClick={() => this.setState({ filter: "notdone" })}>Completed</button>
                    </div>
                    <button className={`add add-button ${this.props.selectedList !== null ? "" : "invalid"}`}
                        onClick={() => {
                            this.props.selectedList !== null && this.setState({ addNewItemPop: true })
                        }}><FiPlus /></button>
                    {
                        this.state.addNewItemPop ? (
                            <div className="add-item-input">
                                <form className="add-item-form" onSubmit={(e) => this.handleCreatingItem(e)}>
                                    <input type="text"
                                        placeholder="New item"
                                        onChange={(e) => {
                                            e.target.value.trim().length > 0 ?
                                            this.setState({ isValid: true }) :
                                            this.setState({ isValid: false });
                                            this.setState({ itemInput: e.target.value});
                                        }}
                                        value={this.state.itemInput}
                                        autoFocus
                                    />
                                    <div className="add-action decision-btn">
                                        <span className="no"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                this.setState({ addNewItemPop: false })
                                            }}
                                        >
                                            <FiX />
                                        </span>
                                        <button className={`yes ${this.state.isValid ? '' : 'invalid'}`} type="submit"><FiCheck /></button>
                                    </div>
                                </form>
                            </div>) : null
                    }
                </div>
                <ul className="item-content">
                    <li 
                        className={`list-header`}
                        onClick={() => {this.props.toggleItems(false)}}
                    >
                        <h1><FiChevronLeft />{this.props.listName}</h1>
                    </li>
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

const mapStateToProps = ({ firebase: { auth }, firestore: { ordered }, lists }) => {
    return {
        auth,
        items: ordered.items || [],
        lists
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