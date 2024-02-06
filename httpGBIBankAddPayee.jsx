import React, { Component } from "react";
import http from "./httpServiceGBIBank.js";
import auth from "./httpServiceGBIBankAuth.js";

class AddPayee extends Component {
    state = {
        chequeForm: {
            name: auth.getUser().name,
            payeeName: "",
            accNumber: "",
            bankName: "",
            IFSC: "",
        },
        errors: {},
        getBanks: []
    }

    async fetchData() {
        let user = auth.getUser();
        let response = await http.get("/getBanks");
        let { data } = response;
        this.setState({ getBanks: data });
    }
    componentDidMount() {
        this.fetchData();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.prevProps) {
            this.fetchData();
        }
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
        this.props.history.push("/admin");
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let error = this.validateAll();
        let { chequeForm } = this.state;
        if (this.isValid(error)) {
            alert("Details added successfully!");
            this.postData("/addPayee", chequeForm);
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
        let { payeeName, accNumber, bankName } = this.state.chequeForm;
        let errors = {};
        errors.payeeName = this.handlePayeeName(payeeName);
        // errors.bankName = this.handleBankName(bankName);
        errors.accNumber = this.handleAccountNumber(accNumber);
        return errors;
    }

    handleAccountNumber = (accNumber) => !accNumber ? "Account Number is required" : "";
    // handleBankName = (bankName) => !bankName ? "Bank Name is required" : "";
    handlePayeeName = (payeeName) => !payeeName ? "Payee Name is required" : "";

    handleFocusValidation = (e) => {
        let { currentTarget: input } = e;
        let s1 = { ...this.state };

        switch (input.name) {
            case "payeeName": s1.errors.payeeName = this.handlePayeeName(input.value); break;
            // case "bankName": s1.errors.bankName = this.handleBankName(input.value); break;
            case "accNumber": s1.errors.accNumber = this.handleAccountNumber(input.value); break;
            default: break;
        }
        this.setState(s1);
    }

    render() {
        let { payeeName, accNumber, bankName, IFSC } = this.state.chequeForm;
        let { errors, getBanks } = this.state;
        console.log("BankName", bankName)
        return (
            <div className="container mt-3">
                <div className="jumbotron">
                    <h3 className="text-center">Add Payee</h3>

                    <form>
                        <div className="form-group mt-3">
                            <label className="form-group-label">Payee Name<sup className="text-danger">*</sup></label>
                            <input
                                className="form-control"
                                type="text"
                                id="payeeName"
                                name="payeeName"
                                value={payeeName}
                                onChange={this.handleChange}
                                onBlur={this.handleFocusValidation}
                            />
                            {errors.payeeName && <span className="text-danger form-control border" style={{ backgroundColor: 'pink' }}>{errors.payeeName}</span>}
                        </div>

                        <div className="form-group mt-3">
                            <label className="form-group-label">Account Number<sup className="text-danger">*</sup></label>
                            <input
                                className="form-control"
                                type="text"
                                id="accNumber"
                                name="accNumber"
                                value={accNumber}
                                onChange={this.handleChange}
                                onBlur={this.handleFocusValidation}
                            />
                            {errors.accNumber && <span className="text-danger form-control border" style={{ backgroundColor: 'pink' }}>{errors.accNumber}</span>}
                        </div>

                        <div className="form-check mt-3">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="bankName"
                                value="GBI"
                                checked={bankName === "GBI"}
                                onChange={this.handleChange}
                            />
                            <label className="form-check-label" htmlFor="gbiBank">Same Bank</label>
                            <br />
                            <input
                                className="form-check-input"
                                type="radio"
                                name="bankName"
                                id="bankName"
                                value="bankName"
                                checked={bankName}
                                onChange={this.handleChange}
                            />
                            <label className="form-check-label" htmlFor="otherBank">Other Bank</label>
                            <br />
                        </div>

                        {bankName && (
                            <React.Fragment>
                                <div className="form-group mt-3">
                                    <select className="form-control" name="bankName" id="bankName" value={bankName} onChange={this.handleChange} onBlur={this.handleFocusValidation}>
                                        <option value="">Select BankName</option>
                                        {getBanks.map((ele) => (
                                            <option key={ele} value={ele}>{ele}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group mt-3">
                                    <label className="form-group-label">IFSC Code<sup className="text-danger">*</sup></label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="IFSC"
                                        name="IFSC"
                                        value={IFSC}
                                        onChange={this.handleChange}
                                        onBlur={this.handleFocusValidation}
                                    />
                                </div>
                            </React.Fragment>
                        )}

                        <div className="form-group text-center">
                            <button className="btn btn-primary mt-3 rounded-pill" onClick={this.handleSubmit}>Add Payee</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
export default AddPayee;