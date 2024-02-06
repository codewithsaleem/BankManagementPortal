import React, { Component } from "react";
import http from "./httpServiceGBIBank.js";
class AddCustomer extends Component {
    state = {
        customer: { name: "", password: "", confirmpassword: "" },
        errors: {},
    }
    handleChange = (e) => {
        let { currentTarget: input } = e;
        let s1 = { ...this.state };
        s1.customer[input.name] = input.value;
        this.handleFocusValidation(e);
        this.setState(s1);
    }

    async postData(url, obj) {
        let response = await http.post(url, obj);
        let { data } = response;
        this.props.history.push("/admin")
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let { customer } = this.state;
        let error = this.validateAll();
        if (this.isValid(error)) {
            // Check if password and password confirmation match
            if (customer.password !== customer.confirmpassword) {
                error.confirmpassword = "Passwords do not match";
            } else {
                alert("Customer Added Successfully!!")
                this.postData("/register", customer)
            }
        } else {
            let s1 = { ...this.state };
            s1.errors = error;
            this.setState(s1);
        }
    }

    isValid = (error) => {
        let keys = Object.keys(error);
        let count = keys.reduce((acc, curr) => (error[curr] ? acc + 1 : acc), 0);
        return count === 0;
    }

    validateAll = () => {
        let { name, password, confirmpassword } = this.state.customer;
        let errors = {};
        errors.name = this.handleName(name);
        errors.password = this.handlePassword(password);
        errors.confirmpassword = this.handleConfirmPassword(password, confirmpassword);
        return errors;
    }

    handleName = (name) => !name ? "Required" : "";
    handlePassword = (password) => !password ? "Required" :
        password.length < 8 ||
            (!/[A-Z]/.test(password)) ||
            (!/[a-z]/.test(password)) ||
            (!/[0-9]/.test(password)) ?
            "Password should be Minimum 8 characters with a lowercase, uppercase, and digit" : "";
    handleConfirmPassword = (password, confirmpassword) => password !== confirmpassword ? "Passwords do not match" : "";

    handleFocusValidation = (e) => {
        let { currentTarget: input } = e;
        let s1 = { ...this.state };

        switch (input.name) {
            case "name": s1.errors.name = this.handleName(input.value); break;
            case "password": s1.errors.password = this.handlePassword(input.value); break;
            case "confirmpassword": s1.errors.confirmpassword = this.handleConfirmPassword(s1.customer.password, input.value); break;
            default: break;
        }
        this.setState(s1);
    }
    render() {
        let { name, password, confirmpassword } = this.state.customer;
        let { errors } = this.state;
        return (
            <div className="container mt-3">
                <div className="jumbotron">
                    <h3 className="text-center">Add New Customer</h3>
                    <form action="">
                        <div className="form-group">
                            <label className="form-group-label"><b>Name</b></label>
                            <input
                                className="form-control"
                                type="text"
                                id="name"
                                name="name"
                                value={name}
                                placeholder="Enter name"
                                onChange={this.handleChange}
                                onBlur={this.handleFocusValidation}
                            />
                            {errors.name && <span className="text-danger">{errors.name}</span>}
                        </div>
                        <div className="form-group">
                            <label className="form-group-label"><b>Password</b></label>
                            <input
                                className="form-control"
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                placeholder="Enter password"
                                onChange={this.handleChange}
                                onBlur={this.handleFocusValidation}
                            />
                            {errors.password && <span className="text-danger">{errors.password}</span>}
                        </div>
                        <div className="form-group">
                            <label className="form-group-label"><b>Confirm Password</b></label>
                            <input
                                className="form-control"
                                type="password"
                                id="confirmpassword"
                                name="confirmpassword"
                                value={confirmpassword}
                                placeholder="confirmpassword"
                                onChange={this.handleChange}
                                onBlur={this.handleFocusValidation}
                            />
                            {errors.confirmpassword && <span className="text-danger">{errors.confirmpassword}</span>}
                        </div>
                        <button className="btn btn-primary rounded-pill mt-2 font-weight-bold" onClick={this.handleSubmit}>Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default AddCustomer;