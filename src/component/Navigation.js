import React from 'react';
import LoginForm from './LoginForm';
import { FiUnderline } from "react-icons/fi";
import { Link } from 'react-router-dom';
import Menu from './Menu';

const Navigation = (props) => {
    return (
        <nav>
            <div className="wrapper">
                <div className="logo">
                    <Link className="logo" to="/" style={{ fontWeight: 'lighter' }}>
                        <span style={{ fontSize: '0.8em' }}><FiUnderline /></span><span>Do</span>
                    </Link>
                </div>
                {props.notSignedIn ? <LoginForm /> : <Menu authInfo={props.authInfo} pop={props.pop} />}
            </div>
        </nav>
    )
}



export default Navigation;

