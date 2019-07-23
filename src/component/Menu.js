import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FiUnderline } from "react-icons/fi";
import { signOut } from '../store/actions/authAction';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { Link } from 'react-router-dom';

class Menu extends Component {
    render() {
        return (

            <ul className="menu">
                {/* <li className="create"><a href="/" onClick={(e) => { e.preventDefault(); this.props.pop() }}><FiList /><span>Create</span></a></li> */}
                <li className="profile">
                    <a href="/" onClick={(e) => e.preventDefault()}>
                        <span>{this.props.profile.username[0].toUpperCase()}</span>
                    </a>
                    <ul className="dropdown-main">
                        {/* <li><a href="/" onClick={(e) => {e.preventDefault();}}>Profile</a></li> */}
                        <li><a href="/" onClick={(e) => { e.preventDefault(); this.props.signOut(); }}>Signout</a></li>
                    </ul>
                </li>
            </ul>

        )
    }
}

const mapStateToProps = ({ firebase: { profile } }) => {
    return {
        profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: (history) => dispatch(signOut(history))
    }
}

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
)(Menu);