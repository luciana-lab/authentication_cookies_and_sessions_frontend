import React, { Component } from "react";
import Registration from "./auth/Registration";
import Login from './auth/Login';
import axios from "axios";

class Home extends Component {
    constructor() {
        super()
    }

    handleSuccessfulAuth = data => {
        this.props.handleLogin(data)
        this.props.history.push("/dashboard") // to redirect the user after successful create an account
    }

    handleLogoutClick = () => {
        axios.delete("http://localhost:3001/logout", { withCredentials: true }).then(resp => {
            this.props.handleLogout()
        }).catch(error => {
            console.log("logout error", error)
        })
    }

    render() {
        return (
            <div>
                <h1>Home</h1>
                <h1>Status: {this.props.loggedInStatus} </h1>
                <button onClick={this.handleLogoutClick}>Logout</button>
                <Registration handleSuccessfulAuth={this.handleSuccessfulAuth} />
                <Login handleSuccessfulAuth={this.handleSuccessfulAuth} />
            </div>
        )
    }
}

export default Home;