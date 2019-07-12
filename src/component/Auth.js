import React, { Component } from 'react';

class Auth extends Component {
    render() {
        return (
            <div className="auth">
                <div className="section auth-logo">
                    <h1 className="auth-logo_wrapper">
                        simplier with <br /><span>Udo</span>
                    </h1>
                </div>
                <div className="section auth-signup">
                    <h1 className="header">Signup</h1>
                    <form className="auth-signup_form">
                        <input type="text" name="email" placeholder="Email"/>
                        <input type="text" name="username" placeholder="Username"/>
                        <input type="password" name="password" placeholder="Password"/>
                        <input type="password" name="repassword" placeholder="Confirm password"/>
                        <button type="submit" className="auth-signup_submit btn btn-green">Signup</button>
                    </form>
                </div>
            </div>
        )
    }
}


export default Auth;