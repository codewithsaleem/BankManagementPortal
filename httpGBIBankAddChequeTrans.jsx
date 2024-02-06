import React, { Component } from "react";
import http from "./httpServiceGBIBank.js";
import auth from "./httpServiceGBIBankAuth.js";

class AddCheque extends Component {
    state = {
        chequeForm: {
            chequeNumber: "",
            bankName: "",
            branch: "",
            amount: "",
            name: auth.getUser().name, // Access user's name here
        },
        allBanks: [],
        errors: {},
    }

    async fetchData() {
        let response = await http.get("/getBanks");
        let { data } = response;
        this.setState({ allBanks: data });
    }
    componentDidMount() {
        this.fetchData();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) this.fetchData();
    }

    handleChange = (e) => {
        let { currentTarget: input } = e;
        let s1 = { ...this.state };
        s1.chequeForm[input.name] = input.value;
        this.handleFocusValidation(e);
        this.setState(s1);
    }

    async postData(url, obj) {
        let response = await http.post(url, obj);
        let { data } = response;
        this.props.history.push("/viewCheque");
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let error = this.validateAll();
        let { chequeForm } = this.state;
        if (this.isValid(error)) {
            alert("Details added successfully!");
            this.postData("/postCheque", chequeForm);
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
        let { chequeNumber, bankName, amount, branch } = this.state.chequeForm;
        let errors = {};
        errors.chequeNumber = this.handleChequeNumber(chequeNumber);
        errors.bankName = this.handleBankName(bankName);
        errors.amount = this.handleAmount(amount);
        errors.branch = this.handleBranch(branch);
        return errors;
    }

    handleChequeNumber = (chequeNumber) => chequeNumber.length < 11 ? "Enter your 11 digit cheque number" : "";
    handleBankName = (bankName) => !bankName ? "Required" : "";
    handleBranch = (branch) => !branch ? "Enter 4 digit code of branch" : "";
    handleAmount = (amount) => !amount ? "Required" : "";

    handleFocusValidation = (e) => {
        let { currentTarget: input } = e;
        let s1 = { ...this.state };

        switch (input.name) {
            case "chequeNumber": s1.errors.chequeNumber = this.handleChequeNumber(input.value); break;
            case "bankName": s1.errors.bankName = this.handleBankName(input.value); break;
            case "branch": s1.errors.branch = this.handleBranch(input.value); break;
            case "amount": s1.errors.amount = this.handleAmount(input.value); break;
            default: break;
        }
        this.setState(s1);
    }

    render() {
        let { chequeNumber, bankName, branch, amount } = this.state.chequeForm;
        let { allBanks, errors } = this.state;
        return (
            <div className="container mt-3">
                <div className="jumbotron">
                    <h3 className="text-center">Deposite Cheque</h3>

                    <form>
                        <div className="form-group mt-3">
                            <label className="form-group-label">Cheque Number<sup className="text-danger">*</sup></label>
                            <input
                                className="form-control"
                                type="text"
                                id="chequeNumber"
                                name="chequeNumber"
                                value={chequeNumber}
                                placeholder="Enter Cheque Number"
                                onChange={this.handleChange}
                                onBlur={this.handleFocusValidation}
                            />
                            {errors.chequeNumber && <span className="text-danger form-control border" style={{ backgroundColor: 'pink' }}>{errors.chequeNumber}</span>}
                        </div>

                        <div className="form-group mt-3">
                            <label className="form-group-label">Bank Name<sup className="text-danger">*</sup></label>
                            <select className="form-control" name="bankName" id="bankName" value={bankName} onChange={this.handleChange} onBlur={this.handleFocusValidation}>
                                <option value="">Select BankName</option>
                                {allBanks.map((ele) => (
                                    <option key={ele} value={ele}>{ele}</option>
                                ))}
                            </select>
                            {errors.bankName && <span className="text-danger form-control border" style={{ backgroundColor: 'pink' }}>{errors.bankName}</span>}
                        </div>

                        <div className="form-group mt-3">
                            <label className="form-group-label">Branch<sup className="text-danger">*</sup></label>
                            <input
                                className="form-control"
                                type="text"
                                id="branch"
                                name="branch"
                                value={branch}
                                onChange={this.handleChange}
                                onBlur={this.handleFocusValidation}
                            />
                            {errors.branch && <span className="text-danger form-control border" style={{ backgroundColor: 'pink' }}>{errors.branch}</span>}
                        </div>

                        <div className="form-group mt-3">
                            <label className="form-group-label">Amount<sup className="text-danger">*</sup></label>
                            <input
                                className="form-control"
                                type="text"
                                id="amount"
                                name="amount"
                                value={amount}
                                onChange={this.handleChange}
                                onBlur={this.handleFocusValidation}
                            />
                            {errors.amount && <span className="text-danger form-control border" style={{ backgroundColor: 'pink' }}>{errors.amount}</span>}
                        </div>

                        <div className="form-group text-center">
                            <button className="btn btn-primary rounded-pill mt-3" onClick={this.handleSubmit}>Add Cheque</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
export default AddCheque;