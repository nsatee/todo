import React, { Component } from 'react';
import moment from 'moment';
import { FiMoreVertical } from "react-icons/fi";
import { deleteList } from '../../store/actions/listAction';
import { connect } from 'react-redux';

class List extends Component {
    state = {
        showAction: false,
        activeId: null,
        pop: false
    }
    render() {
        return (
            <li className="list">
                {this.state.pop ?
                    (<div className="list-pop">
                        <div className="delete-confirm">
                            <p className="msg">{`Delete ${this.props.listTitle} list?`}</p>
                            <div className="delete-chices">
                                <button className="no" onClick={() => this.setState({pop: false})}>Cancle</button>
                                <button className="yes" 
                                    onClick={() => {
                                        this.setState({pop: false})
                                        this.props.deleteList(this.props.listId)
                                    }}
                                    >
                                        Delete
                                </button>
                            </div>
                        </div>
                    </div>) : null}
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
                                <ul className="dropdown" onClick={() => this.setState({showAction: !this.state.showAction})}>
                                    {/* <li className="dropdown-list">
                                        <button>Edit</button>
                                    </li> */}
                                    <li className="dropdown-list">
                                        <button className="delete" onClick={() => this.setState({pop: true})}>Delete</button>
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
        deleteList: (listId) => dispatch(deleteList(listId))
    }
}

export default connect(null, mapDispatchToProps)(List);