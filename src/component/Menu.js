import React, { Component } from 'react';
import { FiUnderline, FiList } from "react-icons/fi";
import { connect } from 'react-redux';
import { signOut } from '../store/actions/authAction';
import { withRouter } from 'react-router-dom';
import {compose} from 'redux';

class Menu extends Component {
    render() {
        return (
            <div className="wrapper">
                <a href="/" className="logo-wrapper">
                    <span><FiUnderline /></span>
                </a>
                <ul className="menu">
                    <li><button onClick={() => this.props.signOut(this.props.history)}>signout</button></li>
                    <li className="create"><a href="/" onClick={(e) => { e.preventDefault(); this.props.pop() }}><FiList /><span>Create</span></a></li>
                    <li className="profile"><a href="/"><span>{this.props.authInfo.email[0]}</span></a></li>
                </ul>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: (history) => dispatch(signOut(history))
    }
}

export default compose(
    withRouter,
    connect(null, mapDispatchToProps),
    )(Menu);