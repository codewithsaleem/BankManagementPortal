import React, { Component } from "react";
import http from "./httpServiceGBIBank.js";
import auth from "./httpServiceGBIBankAuth.js";

class AddNetBanking extends Component {
    state = {
        addNetForm: { name: auth.getUser().name, payeeName: "", amount: "", comment: "", bankName: "GBI" },
        getPayess: [],
        errors: {},
    }

    async fetchData() {
        let user = auth.getUser();
        let response = await http.get(`/getPayees/${user.name}`);
        let { data } = response;
        this.setState({ getPayess: data });
    }
    componentDidMount() {
        this.fetchData();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.prevProps) this.fetchData();
    }


    handleChange = (e) => {
        let { currentTarget: input } = e;
        let s1 = { ...this.state };
        s1.addNetForm[input.name] = input.value;
        this.handleFocusValidation(e);
        this.setState(s1);
    }

    async postData(url, obj) {
        let response = await http.post(url, obj);
        let { data } = response;
        this.props.history.push("/viewNetBanking");
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let error = this.validateAll();
        let { addNetForm } = this.state;
        if (this.isValid(error)) {
            alert("Details added successfully!");
            this.postData("/postNet", addNetForm);
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
        let { payeeName, amount } = this.state.addNetForm;
        let errors = {};
        errors.payeeName = this.handlePayeeName(payeeName);
        errors.amount = this.handleAmount(amount);
        return errors;
    }

    handlePayeeName = (payeeName) => !payeeName ? "Payee is required" : "";
    handleAmount = (amount) => !amount ? "Amount is required" : "";

    handleFocusValidation = (e) => {
        let { currentTarget: input } = e;
        let s1 = { ...this.state };

        switch (input.name) {
            case "payeeName": s1.errors.payeeName = this.handlePayeeName(input.value); break;
            case "amount": s1.errors.amount = this.handleAmount(input.value); break;
            default: break;
        }
        this.setState(s1);
    }

    render() {
        let { payeeName, amount, comment } = this.state.addNetForm;
        let { getPayess, errors } = this.state;
        let uniquePayeeName = getPayess.reduce((acc, curr) => {
            if (!acc.includes(curr.payeeName)) {
                acc.push(curr.payeeName);
            }
            return acc;
        }, []);

        return (
            <div className="container mt-3">
                <div className="jumbotron">
                    <h3 className="text-center">Net Banking</h3>
                    <form>
                        <div className="form-group mt-3">
                            <label className="form-group-label"><b>Payee Name</b><sup className="text-danger">*</sup></label>
                            <select className="form-control" name="payeeName" id="payeeName" value={payeeName} onChange={this.handleChange} onBlur={this.handleFocusValidation}>
                                <option value="">Select PayeeName</option>
                                {uniquePayeeName.map((ele) => (
                                    <option key={ele} value={ele}>{ele}</option>
                                ))}
                            </select>
                            {errors.payeeName && <span className="text-danger form-control border" style={{ backgroundColor: 'pink' }}>{errors.payeeName}</span>}
                        </div>

                        <div className="form-group mt-3">
                            <label className="form-group-label"><b>Amount</b><sup className="text-danger">*</sup></label>
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

                        <div className="form-group mt-3">
                            <label className="form-group-label"><b>Comment</b></label>
                            <input
                                className="form-control"
                                type="text"
                                id="comment"
                                name="comment"
                                value={comment}
                                onChange={this.handleChange}
                            />
                        </div>

                        <div className="form-group text-center">
                            <button className="btn btn-primary rounded-pill mt-3" onClick={this.handleSubmit}>Add Transaction</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
export default AddNetBanking;