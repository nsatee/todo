import React from 'react';
import LoginForm from './LoginForm';
import Menu from './Menu';

const Navigation = (props) => {
    return (
        <nav>
            {props.notSignedIn ? <LoginForm /> : <Menu authInfo={props.authInfo} />}
        </nav>
    )
}



export default Navigation;

