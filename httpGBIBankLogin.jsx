import React, { Component } from "react";
import http from "./httpServiceGBIBank.js";
import auth from "./httpServiceGBIBankAuth.js";

class Login extends Component {
    state = {
        loginForm: { name: "", password: "" },
        errors: {}
    }

    handleChange = (e) => {
        let { currentTarget: input } = e;
        let s1 = { ...this.state };
        s1.loginForm[input.name] = input.value;
        this.handleFocusValidation(e);
        this.setState(s1);
    }

    async postData(url, obj) {
        let response = await http.post(url, obj);
        let { data } = response;
        auth.login(data);
        window.location = "/admin";
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let error = this.validateAll();
        if (this.isValid(error)) {
            this.postData("/login", this.state.loginForm)
        } else {
            let s1 = { ...this.state };
            s1.errors = error;
            this.setState(s1);
        }
    }

    isValid = (error) => {
        let keys = Object.keys(error);
        let count = keys.reduce((acc, curr) => (error[curr] ? acc + 1 : acc), 0)
        return count === 0;
    }

    validateAll = () => {
        let { name, password } = this.state.loginForm;
        let errors = {};
        errors.name = this.handleName(name);
        errors.password = this.handlePassword(password);
        return errors;
    }

    handleName = (name) => !name ? "Required" : "";
    handlePassword = (password) => !password ? "Required" : password.length < 7 ? "Password must be of 7 characters" : "";

    handleFocusValidation = (e) => {
        let { currentTarget: input } = e;
        let s1 = { ...this.state };

        switch (input.name) {
            case "name": s1.errors.name = this.handleName(input.value); break;
            case "password": s1.errors.password = this.handlePassword(input.value); break;
            default: break;
        }
        this.setState(s1);
    }

    render() {
        let { name, password } = this.state.loginForm;
        let { errors } = this.state;

        return (
            <div className="container mt-2">
                <div className="jumbotron">
                    <form>
                        <h2 className="text-center mb-3 text-secondary">Welcome to GBI Bank</h2>
                        <div className="form-group">
                            <label>Username</label>
                            <input
                                className="form-control"
                                type="text"
                                id="name"
                                name="name"
                                value={name}
                                placeholder="Enter Username"
                                onChange={this.handleChange}
                                onBlur={this.handleFocusValidation}
                            />
                            {errors.name ? (<span className="text-danger">{errors.name}</span>) : ""}
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input
                                className="form-control"
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                placeholder="Password"
                                onChange={this.handleChange}
                                onBlur={this.handleFocusValidation}
                            />
                            {errors.password ? (<span className="text-danger">{errors.password}</span>) : ""}
                        </div>

                        <div className="form-group text-center">
                            <button className="btn rounded-pill text-white font-weight-bold mt-3" style={{backgroundColor: 'rgb(153, 50, 204)' }} onClick={this.handleSubmit}>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login;