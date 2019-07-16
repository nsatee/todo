import React, { Component } from 'react';
import { FiUnderline } from "react-icons/fi";
import { connect } from 'react-redux';
import { signIn } from '../store/actions/authAction'

class LoginForm extends Component {
    state = {
        email: "",
        password: ""
    }

    handdleSubmit = (e) => {
        e.preventDefault();
        this.props.signIn(this.state);
    }

    render() {
        return (
            <div className="wrapper">
                <div className="logo">
                    <a href="/" className="logo-wrapper">
                        <span><FiUnderline /></span>
                    </a>
                </div>
                <form className="login-form" onSubmit={this.handdleSubmit}>
                    <input type="text" placeholder="Email" onChange={(e) => this.setState({ email: e.target.value })} value={this.state.email} />
                    <input type="password" placeholder="Password" onChange={(e) => this.setState({ password: e.target.value })} value={this.state.password} />
                    <button type="submit" className="btn btn-green">Signin</button>
                </form>
            </div>
        )
    }
}

const mapDispatchtoProps = dispatch => {
    return {
        signIn: (creds) => dispatch((signIn(creds)))
    }
}

const mapStateToProps = state => {
    return state;
}

export default connect(mapStateToProps, mapDispatchtoProps)(LoginForm);