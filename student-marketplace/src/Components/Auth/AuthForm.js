// form to be displayed to login
import React from "react";

const AuthForm = ({ user, isLogin, onChange, onSubmit }) => {
    return (
        <form className="login-form" onSubmit={onSubmit}>
            <div>
                    <label className="login-form-label" htmlFor="username">
                    Username:
                    </label>
                    <input
                    className="login-form-input"
                    type="text"
                    id="username"
                    name="username"
                    value={user.username}
                    onChange={onChange}
                    required
                    />
            </div>
            {/* TODO: don't require email for login */}
            {false ? <></>:
            <div>
                <label className="login-form-label" htmlFor="email">
                Email:
                </label>
                <input
                className="login-form-input"
                type="email"
                id="email"
                name="email"
                value={user.email}
                onChange={onChange}
                required = {!isLogin}
                />
            </div>
            }
            <label className="login-form-label" htmlFor="password">
            Password:
            </label>
            <input
            className="login-form-input"
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={onChange}
            required
            />
            {!isLogin ?
                <div>
                    <label className="login-form-label" htmlFor="confirm-password">
                    Retype Password:
                    </label>
                    <input
                    className="login-form-input"
                    type="password"
                    id="confirm-password"
                    required
                    />
                </div>
                    : <></>
             }
            <button className="login-form-button" type="submit">
            {isLogin ? "Login" : "Signup"}
            </button>
        </form>
    );
};

export default AuthForm;