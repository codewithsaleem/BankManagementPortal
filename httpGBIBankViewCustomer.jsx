import React, { Component } from "react";
import http from "./httpServiceGBIBank.js";
import queryString from "query-string";

class ViewCustomer extends Component {
    state = {
        customers: { items: [], },
    }

    async fetchData() {
        let queryParams = queryString.parse(this.props.location.search);
        let searchString = this.makeSearchString(queryParams);
        let response = null;
        if (searchString) {
            response = await http.get(`/getCustomers?${searchString}`);
        }
        else {
            response = await http.get("/getCustomers?page=1");

        }
        console.log("Hi", response);
        let { data } = response;
        this.setState({ customers: data });
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
        this.callURL("/View All Customers", queryParams);
    }

    callURL = (url, options) => {
        let searchStr = this.makeSearchString(options);
        this.props.history.push({
            pathname: url,
            search: searchStr,
        })
    }

    makeSearchString = (options) => {
        let { page } = options;
        let searchStr = "";
        searchStr = this.addToQueryString(searchStr, "page", page);
        return searchStr;
    }

    addToQueryString = (str, paramName, paramValue) =>
        paramValue ? str ? `${str}&${paramName}=${paramValue}` : `${paramName}=${paramValue}` : str;

    render() {
        let { customers } = this.state;
        console.log("two", customers)

        // Assuming your items have the totalNum and totalItems properties
        let size = 5;
        let startIndex = (customers.page - 1) * size + 1;
        let endIndex;
        if (customers.page * size > customers.totalNum) {
            endIndex = customers.totalNum;
        } else {
            endIndex = customers.page * size;
        }

        return (
            <div className="container mt-3">
                <div className="jumbotron">
                    <h3 className="text-center text-secondary">All Customers</h3>
                    <h5>{startIndex} - {endIndex} of {customers.totalNum}</h5>

                    <table className="table table-dark table-striped table-responsive-md table-responsive-lg">
                        <thead>
                            <tr>
                                <th><b>Name</b></th>
                                <th><b>State</b></th>
                                <th><b>City</b></th>
                                <th><b>PAN</b></th>
                                <th><b>DOB</b></th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.items.map((ele) => (
                                <tr>
                                    <td>{ele.name}</td>
                                    <td>{ele.state}</td>
                                    <td>{ele.city}</td>
                                    <td>{ele.PAN}</td>
                                    <td>{ele.dob}</td>
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
                            {endIndex < customers.totalNum ? (<button className=" btn btn-sm btn-primary mt-2" onClick={() => this.handlePage(1)}>Next</button>) : ""}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewCustomer;