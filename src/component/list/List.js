import React, { Component } from 'react';
import moment from 'moment';
import { FiMoreVertical } from "react-icons/fi";
import { deleteList, updateList } from '../../store/actions/listAction';
import { connect } from 'react-redux';
import { FiX, FiCheck } from "react-icons/fi";

class List extends Component {
    state = {
        showAction: false,
        activeId: null,
        pop: false,
        type: null,
        title: this.props.listTitle
    }

    handleEdit = (e) => {
        e.preventDefault();
        this.setState({ pop: false })
        this.props.updateList(this.props.listId, this.state.title);
    }

    handleDelete = (e) => {
        e.preventDefault();
        this.setState({ pop: false, type: "" });
        this.props.deleteList(this.props.listId);
        this.props.selectedItem(null);
    }

    render() {
        return (
            <li className="list">
                {this.state.pop && this.state.type === "delete" && this.state.activeId === this.props.listId ?
                    (<div className="list-pop">
                        <form className="delete-confirm" onSubmit={e => this.handleDelete(e)}>
                            <p className="msg">{`Delete ${this.props.listTitle} list?`}</p>
                            <div className="decision-btn">
                                <span className="no" onClick={() => this.setState({ pop: false })}><FiX /></span>
                                <button className="yes" type="submit">
                                    <FiCheck />
                                </button>
                            </div>
                        </form>
                    </div>) : null}

                {this.state.pop && this.state.type === "edit" && this.state.activeId === this.props.listId ?
                    (<div className="list-pop">
                        <form className="edit-list" onSubmit={e => this.handleEdit(e)}>
                            <input type="text" placeholder="List title" value={this.state.title} onChange={(e) => this.setState({ title: e.target.value })} autoFocus />
                            <div className="decision-btn">
                                <span className="no"
                                    onClick={() => {
                                        this.setState({ pop: false })
                                    }}
                                >
                                    <FiX />
                                </span>
                                <button className="yes" type="submit"><FiCheck /></button>
                            </div>
                        </form>
                    </div>) : null}

                <a href="/" className={`list-wrapper ${
                    this.props.selected ?
                        "selected" : ""
                    }`}
                    onClick={(e) => {
                        e.preventDefault();
                        this.props.selectedItem(this.props.listId)
                    }
                    }
                >
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
                                <ul className="dropdown" onClick={() => this.setState({ showAction: !this.state.showAction })}>
                                    <li className="dropdown-list">
                                        <button onClick={() => this.setState({ pop: true, type: "edit" })}>Edit</button>
                                    </li>
                                    <li className="dropdown-list">
                                        <button className="delete" onClick={() => this.setState({ pop: true, type: "delete" })}>Delete</button>
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


const mapDispatchToProps = dispatch => {
    return {
        deleteList: (listId) => dispatch(deleteList(listId)),
        updateList: (listId, name) => dispatch(updateList(listId, name))
    }
}

export default connect(null, mapDispatchToProps)(List);