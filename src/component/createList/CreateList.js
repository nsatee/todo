import React, { Component } from 'react';
import { createList } from '../../store/actions/listAction'
import { FiX, FiCheck } from "react-icons/fi";
import { connect } from 'react-redux';

class CreateList extends Component {
    state = {
        listName: "",
        isValid: false
    }

    handleCreateList = (e) => {
        e.preventDefault();

        if (this.state.isValid) {
            this.props.createList({
                listName: this.state.listName,
                creator: this.props.authInfo.uid
            });
            this.setState({ listName: "", isValid: false });
            this.props.toggleActive();
        }

        return;
    }

    render() {
        return (
            <li className="list new-list-container">
                <div
                    className={`new-list-wrapper list-wrapper ${
                        this.props.active ? "active" : ""
                        }`}
                >
                    <div className="info">
                        <form className="new-list-form" onSubmit={(e) => this.handleCreateList(e)}>
                            <input
                                type="text"
                                className="new-list"
                                placeholder="List title"
                                name="list-name"
                                onChange={
                                    (e) => {
                                        e.target.value.trim().length > 0 ?
                                            this.setState({ isValid: true }) :
                                            this.setState({ isValid: false });

                                        this.setState({ listName: e.target.value });
                                    }
                                }
                                value={this.state.listName}
                            />

                            <div className="new-list-action decision-btn">
                                <span className={`no`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        this.props.toggleActive();
                                    }}
                                >
                                    <FiX />
                                </span>
                                <button className={`yes ${this.state.isValid ? "" : "invalid"}`} type="submit"><FiCheck /></button>
                            </div>
                        </form>
                    </div>
                </div>
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