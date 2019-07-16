import React, { Component } from 'react';
import { createList } from '../../store/actions/listAction'
import { FiPlus, FiX } from "react-icons/fi";
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
        this.props.pop();
    }

    render() {
        console.log(this.props)
        return (
            <div className="create-list">
                <div className="fade-cover"></div>
                <div className="create-list_wrapper">
                    <h1 className="header">Create</h1>
                    <form className="create-input" onSubmit={(e) => this.handleCreateList(e)}>
                        <input type="text"
                            className="list-title"
                            placeholder="List name"
                            onChange={(e) => this.setState(
                                { listName: e.target.value }
                            )}
                        />
                        <div className="create-action">
                            <a href="/" className="no" onClick={(e) => {e.preventDefault(); this.props.pop()}}><FiX />close</a>
                            <button type="submit" className="yes"><FiPlus />create</button>
                        </div>
                    </form>
                </div>
            </div>
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