import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import auth from "./httpServiceGBIBankAuth.js";

import Navbar from "./httpGBIBankNavbar";
import Login from "./httpGBIBankLogin";
import Logout from "./httpGBIBankLogout";
import AddCustomer from "./httpGBIBankAddCustomer";
import ViewCustomer from "./httpGBIBankViewCustomer";
import Welcome from "./httpGBIBankWelcome";
import Cheques from "./httpGBIBankCheques";
import NetBanking from "./httpGBIBankNetBanking";
import ChequeByName from "./httpGBIBankChequeByName.jsx";
import NetBankingByName from "./httpGBIBankNetBankingByName.jsx";
import CustomerForm from "./httpGBIBankCustomerDetailForm.jsx";
import NomineeForm from "./httpGBIBankNomineeDetailForm.jsx";
import AddCheque from "./httpGBIBankAddChequeTrans.jsx";
import AddNetBanking from "./httpGBIBankAddNetBanking.jsx";
import AddPayee from "./httpGBIBankAddPayee.jsx";
import CarouselComp from "./httpGBIBankCarousel.jsx";

class MainGBIBank extends Component {
    render() {
        const user = auth.getUser();
        console.log(user)
        return (
            <React.Fragment>
                <Navbar user={user} />
                <div className="container">
                    <Switch>
                        <Route path="/viewNetBanking" component={NetBankingByName} />
                        <Route path="/viewCheque" component={ChequeByName} />
                        <Route path="/View All Customers" component={ViewCustomer} />
                        <Route path="/Add Customer" component={AddCustomer} />
                        <Route path="/Cheques" component={Cheques} />
                        <Route path="/carousel" component={CarouselComp} />
                        <Route path="/Net Banking" component={NetBanking} />
                        <Route path="/admin" component={Welcome} />
                        <Route path="/CustomerDetails" component={CustomerForm} />
                        <Route path="/NomineeDetails" component={NomineeForm} />
                        <Route path="/ChequeAdd" component={AddCheque} />
                        <Route path="/Net BankingAdd" component={AddNetBanking} />
                        <Route path="/Add PayeeAdd" component={AddPayee} />

                        <Route path="/login" component={Login} />
                        <Route path="/logout" component={Logout} />
                        <Redirect from="/" to="/carousel" />
                    </Switch>
                </div>
            </React.Fragment>
        )
    }
}

export default MainGBIBank;