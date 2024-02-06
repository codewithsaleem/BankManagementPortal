import React, { Component } from "react";
import http from "./httpServiceGBIBank.js";
import auth from "./httpServiceGBIBankAuth.js";

class NomineeForm extends Component {
    state = {
        customerForm: { name: auth.getUser().name, nomineeName: "", gender: "", dob: "", relationship: "", jointsignatory: false },
        errors: {},

        years: ["1985", "1986", "1987", "1988", "1989", "1990", "1991", "1992", "1993", "1994", "1995", "1996", "1997", "1998", "1999", "2000", "2001", "2002", "2003", "2004", "2005",
            "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018"],
        months: ["Jan", "Feb", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        dates: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
            "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"],
        stateCity: [],
        errorMsg: "",
    }

    handleChange = (e) => {
        let { currentTarget: input } = e;
        let s1 = { ...this.state };
        if (input.name === "jointsignatory") {
            s1.customerForm[input.name] = input.checked ? true : false;
        } else {
            s1.customerForm[input.name] = input.value;
        }
        this.handleFocusValidation(e);
        this.setState(s1);
    }

    async fetchData() {
        try {
            let user = auth.getUser();
            if (user.name) {
                let response = await http.get(`/getNominee/${user.name}`);
                let { data } = response;
                this.setState({ customerForm: data });
            }
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                this.setState({ errorMsg: ex.response.data });
            }
        }
    }
    componentDidMount() {
        this.fetchData();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
            this.fetchData();
        }
    }

    async postData(url, obj) {
        // Combine the selected date, month, and year into dob
        const { dob, month, year, ...rest } = obj;
        const combinedStayStartDate = `${dob}-${month}-${year}`;

        // Update the obj with the combined staystartdate 
        const updatedObj = { ...rest, dob: combinedStayStartDate };

        let response = await http.post(url, updatedObj);
        let { data } = response;
        this.props.history.push("/admin");
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let error = this.validateAll();
        let { customerForm } = this.state;
        if (this.isValid(error)) {
            alert(auth.getUser().name + " Details added successfully!");
            this.postData("/nomineeDetails", customerForm);
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
        let { nomineeName, dob, gender, relationship } = this.state.customerForm;
        let errors = {};
        errors.gender = this.handleGender(gender);
        errors.dob = this.handleDOB(dob);
        errors.nomineeName = this.handleNomineeName(nomineeName);
        errors.relationship = this.handleRealtionship(relationship);
        return errors;
    }

    handleGender = (gender) => !gender ? "Gender is required" : "";
    handleDOB = (dob) => !dob ? "DOB is required" : "";
    handleNomineeName = (nomineeName) => !nomineeName ? "NomineeName is required" : "";
    handleRealtionship = (relationship) => !relationship ? "Realtionship is required" : "";

    handleFocusValidation = (e) => {
        let { currentTarget: input } = e;
        let s1 = { ...this.state };

        switch (input.name) {
            case "gender": s1.errors.gender = this.handleGender(input.value); break;
            case "dob": s1.errors.dob = this.handleDOB(input.value); break;
            case "nomineeName": s1.errors.nomineeName = this.handleNomineeName(input.value); break;
            case "relationship": s1.errors.relationship = this.handleRealtionship(input.value); break;
            default: break;
        }
        this.setState(s1);
    }

    render() {
        let { gender, dob, nomineeName, relationship, jointsignatory } = this.state.customerForm;
        let { years, months, dates, customerForm, errorMsg } = this.state;
        console.log(customerForm)

        // Assuming your dob is in "YYYY-MM-DD" format
        const dateParts = dob ? dob.split('-') : [];
        const selectedDate = dateParts[0];
        const selectedMonth = dateParts[1];
        const selectedYear = dateParts[2];

        return (
            <div className="container mt-3">
                <div className="jumbotron text-secondary">
                    <h3>Nominee Details</h3>

                    <form>
                        <div className="row mt-3">
                            <div className="col-sm-12">
                                <b>Name</b> <sup className="text-danger">*</sup>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="nomineeName"
                                    name="nomineeName"
                                    value={nomineeName}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col-sm-12 col-md-6 col-lg-3"> <b>Gender</b><sup className="text-danger">*</sup></div>
                            <div className="col-sm-12 col-md-6 col-lg-3 ms-3">
                                <input class="form-check-input" type="radio" name="gender" id="gender" value="Male" checked={gender === "Male"} onChange={this.handleChange} />
                                <label class="form-check-label">Male</label>
                            </div>
                            <div className="col-sm-12 col-md-6 col-lg-3 ms-3">
                                <input class="form-check-input" type="radio" name="gender" id="gender" value="Female" checked={gender === "Female"} onChange={this.handleChange} />
                                <label class="form-check-label">Female</label>
                            </div>
                        </div>

                        <div className="row mt-3">
                            <b>Date of Birth</b><sup className="text-danger">*</sup>
                            <div className="col-sm-4">
                                <select
                                    className="form-control"
                                    type="text"
                                    id="year"
                                    name="year"
                                    value={selectedYear}
                                    onChange={this.handleChange}
                                >
                                    <option value="">Select Year</option>
                                    {years.map((ele, index) => (
                                        <option key={index} value={ele}>{ele}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-sm-4">
                                <select
                                    className="form-control"
                                    type="text"
                                    id="month"
                                    name="month"
                                    value={selectedMonth}
                                    onChange={this.handleChange}
                                >
                                    <option value="">Select Month</option>
                                    {months.map((ele, index) => (
                                        <option key={index} value={ele}>{ele}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-sm-4">
                                <select
                                    className="form-control"
                                    type="text"
                                    id="dob"
                                    name="dob"
                                    value={selectedDate}
                                    onChange={this.handleChange}
                                >
                                    <option value="">Select Date</option>
                                    {dates.map((ele, index) => (
                                        <option key={index} value={ele}>{ele}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col-sm-12">
                                <b>Relationship</b> <sup className="text-danger">*</sup>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="relationship"
                                    name="relationship"
                                    value={relationship}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col-sm-12">
                                <input
                                    type="checkbox"
                                    id="jointsignatory"
                                    name="jointsignatory"
                                    value="jointsignatory"
                                    checked={jointsignatory === true}
                                    onChange={this.handleChange}
                                />
                                <b className="ms-3">Joint Signatory</b>
                            </div>
                        </div>
                        {errorMsg && <button className="btn btn-primary mt-3" onClick={this.handleSubmit} >Add Details</button>}
                    </form>
                </div>
            </div>
        )
    }
}
export default NomineeForm;