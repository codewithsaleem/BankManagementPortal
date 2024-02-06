import React, { Component } from "react";
import http from "./httpServiceGBIBank.js";
class Radio extends Component {
    state = {
        getBanks: [],
    }
    async fetchData() {
        let response = await http.get("/getBanks");
        let { data } = response;
        this.setState({ getBanks: data });
    }
    componentDidMount() {
        this.fetchData();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) this.fetchData();
    }

    handleChange = (e) => {
        const { currentTarget: input } = e;
        const { options } = this.props;
        options[input.name] = input.value;
        this.props.onOptionChange(options);
    }

    render() {
        let {options} = this.props;
        let { getBanks } = this.state;
        let amounts = ["<10000", ">10000"];
        return (
            <div className="container mt-3">
                <form>
                    <div className="">
                        <label className="form-group-label"><b>Bank</b></label>
                        {getBanks.map((ele) => (
                            <div className="row border">
                                <label>
                                    <input
                                        type="radio"
                                        name="bank"
                                        value={ele}
                                        checked={options.bank === ele}
                                        onChange={this.handleChange}
                                    />
                                    {ele}
                                </label>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4">
                        <label className="form-group-label"><b>Amount</b></label>
                        {amounts.map((ele) => (
                            <div className="row border">
                                <label>
                                    <input
                                        type="radio"
                                        name="amount"
                                        value={ele}
                                        checked={options.amount === ele}
                                        onChange={this.handleChange}
                                    />
                                    {ele}
                                </label>
                            </div>
                        ))}
                    </div>
                </form>
            </div>
        )
    }
}
export default Radio;