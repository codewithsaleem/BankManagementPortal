import React, { Component } from "react";
import auth from "./httpServiceGBIBankAuth.js";
class Logout extends Component {
    componentDidMount () {
        auth.logout();
        window.location = "/carousel";
    }
    render() {
        return ""
    }
}

export default Logout;