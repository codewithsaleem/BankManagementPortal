import React, { Component } from "react";
import auth from "./httpServiceGBIBankAuth.js";
import bank from "./bank.jpg"
class Welcome extends Component {
    render() {
        let user = auth.getUser();
        return (
            <div className="container text-center mt-4">
                {user.role === "manager" ? <h2 className="mt-4 text-primary">Welcome to GBI BANK Manager Portal</h2>
                    : <h2 className="mt-4 text-primary">Welcome to GBI BANK Customer Portal</h2>}
                <img className="mt-4" src={bank} alt="" style={{ maxHeight: '300px' }} />
            </div>
        )
    }
}

export default Welcome;