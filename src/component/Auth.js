import React, { Component } from 'react';
import {connect} from 'react-redux';
import { signUp } from '../store/actions/authAction';

class Auth extends Component {
    state = {
        email: '',
        password: '',
        repassword: '',
        username: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        this.props.signUp(this.state);
    }
    render() {
        return (
            <div className="auth">
                <div className="section auth-logo">
                    <h1 className="auth-logo_wrapper">
                        simpler with <br /><span>Udo</span>
                    </h1>
                </div>
                <div className="section auth-signup">
                    <h1 className="header">Signup</h1>
                    <form className="auth-signup_form" onSubmit={this.handleSubmit}>
                        <input type="text" id="email" placeholder="Email" onChange={this.handleChange} />
                        <input type="text" id="username" placeholder="Username" onChange={this.handleChange} />
                        <input type="password" id="password" placeholder="Password" onChange={this.handleChange} />
                        <input type="password" id="repassword" placeholder="Confirm password" onChange={this.handleChange} />
                        <button type="submit" className="auth-signup_submit btn btn-green">Signup</button>
                    </form>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signUp: (newUser) => dispatch(signUp(newUser))
    }
}

const mapStateToProps = ({auth}) => {
    return {auth}
}



export default connect(mapStateToProps, mapDispatchToProps)(Auth);