import React, { Component } from 'react';
import { createList } from '../../store/actions/listAction'
import { FiX, FiCheck } from "react-icons/fi";
import { connect } from 'react-redux';

class CreateList extends Component {
    state = {
        listName: ""
    }

    handleCreateList = (e) => {
        e.preventDefault();
        this.props.createList({
            listName: this.state.listName,
            creator: this.props.authInfo.uid
        });
        this.setState({ listName: "" });
        this.props.toggleActive();
    }

    render() {
        return (
            <li className="list new-list-container">
                <a
                    className={`new-list-wrapper ${
                        this.props.active ? "active" : ""
                        }`}
                >
                    <div className="info">
                        <form className="new-list-form" onSubmit={(e) => this.handleCreateList(e)}>
                            <input 
                                type="text" 
                                className="new-list" 
                                placeholder="List title" 
                                onChange={
                                    (e) => this.setState({ listName: e.target.value })
                                    } 
                                value={this.state.listName} 
                                pattern="[A-Za-z0-9]{1,20}"
                            />

                            <div className="new-list-action decision-btn">
                                <span className="no"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        this.props.toggleActive();
                                    }}
                                >
                                    <FiX />
                                </span>
                                <button className="yes" type="submit"><FiCheck /></button>
                            </div>
                        </form>
                    </div>
                </a>
            </li>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createList: (list) => dispatch(createList(list))
    }
}

const mapStateToProps = state => {
    return {
        list: state.lists
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateList);