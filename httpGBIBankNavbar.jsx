import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
    render() {
        let { user } = this.props;
        let customers = ["Add Customer", "View All Customers"];
        let transactions = ["Cheques", "Net Banking"];
        let viewtransactions = ["Cheque", "Net Banking"];
        let form = ["Customer", "Nominee"];
        let trans = ["Add Payee", "Cheque", "Net Banking"];

        return (
            <div className="">
                {/* <nav className="navbar navbar-expand-sm navbar-dark bg-warning">
                    <Link to="/" className="navbar-brand ms-3 text-dark">Home</Link>

                    <ul className="navbar-nav mr-auto">
                        {!user && (
                            <li className="nav-item">
                                <Link to="/login" className="nav-link text-dark">Login</Link>
                            </li>
                        )} */}

                {/* //For manager role only:------------------------------------------------------- */}
                {/* {user && user.role === "manager" && (
                            <React.Fragment>
                                <li className="nav-item dropdown">
                                    <a href="#" className="nav-link dropdown-toggle text-dark" data-toggle="dropdown">
                                        Customers
                                    </a>
                                    <div className="dropdown-menu">
                                        {customers.map((ele, index) => (
                                            <Link to={index === 1 ? "/View All Customers?page=1" : "/Add Customer"} key={index} className="dropdown-item">{ele}</Link>
                                        ))}
                                    </div>
                                </li>

                                <li className="nav-item dropdown">
                                    <a href="#" className="nav-link dropdown-toggle text-dark" data-toggle="dropdown">
                                        Transactions
                                    </a>
                                    <div className="dropdown-menu">
                                        {transactions.map((ele, index) => (
                                            <Link to={index === 0 ? "/Cheques?page=1" : "/Net Banking?page=1"} key={index} className="dropdown-item">{ele}</Link>
                                        ))}
                                    </div>
                                </li>
                            </React.Fragment>
                        )} */}

                {/* //For customer role only:------------------------------------------------------- */}
                {/* {user && user.role === "customer" && (
                            <React.Fragment>
                                <li className="nav-item dropdown">
                                    <a href="#" className="nav-link dropdown-toggle text-dark" data-toggle="dropdown">
                                        View
                                    </a>
                                    <div className="dropdown-menu">
                                        {viewtransactions.map((ele, index) => (
                                            <Link to={index === 1 ? "viewNetBanking?page=1" : "/viewCheque?page=1"} key={index} className="dropdown-item">{ele}</Link>
                                        ))}
                                    </div>
                                </li>

                                <li className="nav-item dropdown">
                                    <a href="#" className="nav-link dropdown-toggle text-dark" data-toggle="dropdown">
                                        Details
                                    </a>
                                    <div className="dropdown-menu">
                                        {form.map((ele, index) => (
                                            <Link to={`/${ele}Details`} key={index} className="dropdown-item">{ele}</Link>
                                        ))}
                                    </div>
                                </li>

                                <li className="nav-item dropdown">
                                    <a href="#" className="nav-link dropdown-toggle text-dark" data-toggle="dropdown">
                                        Transactions
                                    </a>
                                    <div className="dropdown-menu">
                                        {trans.map((ele, index) => (
                                            <Link to={`/${ele}Add`} key={index} className="dropdown-item">{ele}</Link>
                                        ))}
                                    </div>
                                </li>
                            </React.Fragment>
                        )}
                    </ul> */}

                {/* //For right side login, logout, welcome:-------------------------------------------- */}
                {/* <ul className="navbar-nav ml-auto me-3">
                        {user && (
                            <li className="nav-item">
                                <b className="nav-link text-dark">Welcome {user.name}</b>
                            </li>
                        )}

                        {user && (
                            <li className="nav-item">
                                <Link to="/logout" className="nav-link text-dark">Logout</Link>
                            </li>
                        )}
                    </ul>
                </nav> */}







                <div>
                    <nav className="navbar navbar-expand-lg navbar-dark" style={{ fontFamily: 'sans-serif', backgroundColor: 'rgb(153, 50, 204)' }}>
                        <div className="container-fluid">
                            <Link className="navbar-brand fs-3 ms-2 fst-italic font-weight-bold" to="/carousel">Bank Portal</Link>
                            <button className="navbar-toggler mr-3" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <div className="collapse navbar-collapse ms-2" id="navbarNav">
                                <ul className="navbar-nav mr-auto font-weight-bold fs-5">
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to="/carousel">Home</Link>
                                    </li>

                                    {!user && (
                                        <li className="nav-item">
                                            <Link to="/login" className="nav-link">Login</Link>
                                        </li>
                                    )}

                                    {/* //For manager role only:------------------------------------------------------- */}
                                    {user && user.role === "manager" && (
                                        <React.Fragment>
                                            <li className="nav-item dropdown">
                                                <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">
                                                    Customers
                                                </a>
                                                <div className="dropdown-menu">
                                                    {customers.map((ele, index) => (
                                                        <Link to={index === 1 ? "/View All Customers?page=1" : "/Add Customer"} key={index} className="dropdown-item">{ele}</Link>
                                                    ))}
                                                </div>
                                            </li>

                                            <li className="nav-item dropdown">
                                                <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">
                                                    Transactions
                                                </a>
                                                <div className="dropdown-menu">
                                                    {transactions.map((ele, index) => (
                                                        <Link to={index === 0 ? "/Cheques?page=1" : "/Net Banking?page=1"} key={index} className="dropdown-item">{ele}</Link>
                                                    ))}
                                                </div>
                                            </li>
                                        </React.Fragment>
                                    )}

                                    {/* //For customer role only:------------------------------------------------------- */}
                                    {user && user.role === "customer" && (
                                        <React.Fragment>
                                            <li className="nav-item dropdown">
                                                <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">
                                                    View
                                                </a>
                                                <div className="dropdown-menu">
                                                    {viewtransactions.map((ele, index) => (
                                                        <Link to={index === 1 ? "viewNetBanking?page=1" : "/viewCheque?page=1"} key={index} className="dropdown-item">{ele}</Link>
                                                    ))}
                                                </div>
                                            </li>

                                            <li className="nav-item dropdown">
                                                <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">
                                                    Details
                                                </a>
                                                <div className="dropdown-menu">
                                                    {form.map((ele, index) => (
                                                        <Link to={`/${ele}Details`} key={index} className="dropdown-item">{ele}</Link>
                                                    ))}
                                                </div>
                                            </li>

                                            <li className="nav-item dropdown">
                                                <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">
                                                    Transactions
                                                </a>
                                                <div className="dropdown-menu">
                                                    {trans.map((ele, index) => (
                                                        <Link to={`/${ele}Add`} key={index} className="dropdown-item">{ele}</Link>
                                                    ))}
                                                </div>
                                            </li>
                                        </React.Fragment>
                                    )}
                                </ul>

                                {/* //For right side login, logout, welcome:-------------------------------------------- */}
                                <ul className="navbar-nav ml-auto me-3">
                                    {user && (
                                        <li className="nav-item">
                                            <b className="nav-link">Welcome {user.name}</b>
                                        </li>
                                    )}

                                    {user && (
                                        <li className="nav-item">
                                            <Link to="/logout" className="nav-link">Logout</Link>
                                        </li>
                                    )}
                                </ul>
                            </div>


                        </div>
                    </nav>
                </div>
            </div>







        )
    }
}

export default Navbar;