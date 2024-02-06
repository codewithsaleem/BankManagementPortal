import React, { Component } from "react";
import http from "./httpServiceGBIBank.js";
import queryString from "query-string";
import Radio from "./httpGBIBankRadioboxes.jsx";
import auth from "./httpServiceGBIBankAuth.js";

class NetBankingByName extends Component {
    state = {
        cheques: { items: [], },
    }

    async fetchData() {
        let queryParams = queryString.parse(this.props.location.search);
        let searchString = this.makeSearchString(queryParams);
        let user = auth.getUser();

        let response = null;
        if (searchString) {
            response = await http.get(`/getNetBankingByName/${user.name}?${searchString}`);
        }
        else {
            response = await http.get(`/getNetBankingByName/${user.name}?page=1`);
        }

        let { data } = response;
        this.setState({ cheques: data });
    }

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) this.fetchData();
    }

    handlePage = (num) => {
        let queryParams = queryString.parse(this.props.location.search);
        let { page = "1" } = queryParams;
        let newPage = +page + num;
        queryParams.page = newPage;
        this.callURL("/viewNetBanking", queryParams);
    }

    handleOptionChange = (options) => {
        this.callURL("/viewNetBanking", options)
    }

    callURL = (url, options) => {
        let searchStr = this.makeSearchString(options);
        this.props.history.push({
            pathname: url,
            search: searchStr,
        })
    }

    makeSearchString = (options) => {
        let { page, bank, amount } = options;
        let searchStr = "";
        searchStr = this.addToQueryString(searchStr, "page", page);
        searchStr = this.addToQueryString(searchStr, "bank", bank);
        searchStr = this.addToQueryString(searchStr, "amount", amount);
        return searchStr;
    }

    addToQueryString = (str, paramName, paramValue) =>
        paramValue ? str ? `${str}&${paramName}=${paramValue}` : `${paramName}=${paramValue}` : str;

    render() {
        let { cheques } = this.state;

        // Assuming your items have the totalNum and totalItems properties
        let size = 5;
        let startIndex = (cheques.page - 1) * size + 1;
        let endIndex;
        if (cheques.page * size > cheques.totalNum) {
            endIndex = cheques.totalNum;
        } else {
            endIndex = cheques.page * size;
        }

        return (
            <div className="container mt-3">
                <div className="jumbotron">
                    <h3 className="text-center text-secondary">All Net Banking Details</h3>

                    {cheques.items.length > 0 ? (
                        <div className="row">
                            <div className="col-sm-12">
                                <h5>{startIndex} - {endIndex} of {cheques.totalNum}</h5>
                                <table className="table table-dark table-striped table-responsive-md table-responsive-lg">
                                    <thead>
                                        <tr>
                                            <th><b>Payee Name</b></th>
                                            <th><b>Amount</b></th>
                                            <th><b>Bank Name</b></th>
                                            <th><b>Comment</b></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cheques.items.map((ele) => (
                                            <tr>
                                                <td>{ele.payeeName}</td>
                                                <td>{ele.amount}</td>
                                                <td>{ele.bankName}</td>
                                                <td>{ele.comment}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                <div className="row">
                                    <div className="col-sm-1">
                                        {startIndex > 1 ? (<button className=" btn btn-sm btn-primary mt-2" onClick={() => this.handlePage(-1)}>Prev</button>) : ""}
                                    </div>
                                    <div className="col-sm-10"></div>
                                    <div className="col-sm-1">
                                        {endIndex < cheques.totalNum ? (<button className=" btn btn-sm btn-primary mt-2" onClick={() => this.handlePage(1)}>Next</button>) : ""}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) :
                        <h3 className="text-danger">No Transactions to show</h3>
                    }
                </div>
            </div>
        )
    }
}

export default NetBankingByName;