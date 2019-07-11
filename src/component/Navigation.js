import React from 'react';
import { FiUnderline, FiList } from "react-icons/fi";

const Navigation = () => {
    return (
        <nav>
            {/* <Menu /> */}
            <LoginForm />
        </nav>
    )
}

export const Menu = () => {
    return (
        <div className="wrapper">
            <a href="/" className="logo-wrapper">
                <span><FiUnderline /></span>
            </a>
            <ul className="menu">
                <li className="create"><a href="/"><FiList /><span>Create</span></a></li>
                <li className="profile"><a href="/"><span>N</span></a></li>
            </ul>
        </div>
    )
}

export const LoginForm = () => {
    return (
        <div className="wrapper">
            <div className="logo">
                <a href="/" className="logo-wrapper">
                    <span><FiUnderline /></span>
                </a>
            </div>
            <form className="login-form">
                <input type="text" />
            </form>
        </div>
    )
}

export default Navigation;

