import React, { Component } from 'react';
import { FiUnderline, FiList } from "react-icons/fi";
import { connect } from 'react-redux';
import { signOut } from '../store/actions/authAction';

class Menu extends Component {
    render() {
        console.log(this.props);
        return (
            <div className="wrapper">
                <a href="/" className="logo-wrapper">
                    <span><FiUnderline /></span>
                </a>
                <ul className="menu">
                    <li><button onClick={this.props.signOut}>signout</button></li>
                    <li className="create"><a href="/"><FiList /><span>Create</span></a></li>
                    <li className="profile"><a href="/"><span>{this.props.authInfo.email[0]}</span></a></li>
                </ul>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(Menu);