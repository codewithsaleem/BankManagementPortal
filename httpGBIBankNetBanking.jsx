import React, { Component } from "react";
import http from "./httpServiceGBIBank.js";
import queryString from "query-string";
import Radio from "./httpGBIBankRadioboxes.jsx";
class NetBanking extends Component {
    state = {
        cheques: { items: [], },
    }

    async fetchData() {
        let queryParams = queryString.parse(this.props.location.search);
        let searchString = this.makeSearchString(queryParams);
        let response = null;
        if (searchString) {
            response = await http.get(`/getAllNetBankings?${searchString}`);
        }
        else {
            response = await http.get("/getAllNetBankings?page=1");

        }
        console.log("Hi", response);
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
        this.callURL("/Net Banking", queryParams);
    }

    handleOptionChange = (options) => {
        options.page = 1;
        this.callURL("/Net Banking", options)
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
        let queryParams = queryString.parse(this.props.location.search);

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
                    <h3 className="text-center text-secondary">All Net Banking Transactions</h3>

                    <div className="row">
                        <div className="col-sm-2 text-white" style={{backgroundColor: 'rgb(153, 50, 204)' }}>
                            <Radio options={queryParams} onOptionChange={this.handleOptionChange} />
                        </div>

                        <div className="col-sm-10">
                            <h5>{startIndex} - {endIndex} of {cheques.totalNum}</h5>
                            <table className="table table-dark table-striped table-responsive-md table-responsive-lg">
                                <thead>
                                    <tr>
                                        <th><b>Name</b></th>
                                        <th><b>Cheque Number</b></th>
                                        <th><b>Bank Name</b></th>
                                        <th><b>Branch</b></th>
                                        <th><b>Amount</b></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cheques.items.map((ele) => (
                                        <tr>
                                            <td>{ele.name}</td>
                                            <td>{ele.chequeNumber}</td>
                                            <td>{ele.bankName}</td>
                                            <td>{ele.branch}</td>
                                            <td>{ele.amount}</td>
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
                </div>
            </div>
        )
    }
}

export default NetBanking;