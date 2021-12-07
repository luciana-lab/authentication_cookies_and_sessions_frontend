import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: "",
            password: "",
            loginErrors: ""
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        axios.post("http://localhost:3001/sessions", {
            user: {
                email: this.state.email,
                password: this.state.password,
            }
        },
            { withCredentials: true } // permition to add the cookie in the client browser
        ).then(resp => {
            // console.log(resp)      
            if (resp.data.logged_in) {
                console.log(resp)
                this.props.handleSuccessfulAuth(resp.data)
            } else {
                throw new Error()
            }
        }).catch(error => {
            console.log("login error", error)
        })

        e.preventDefault()

    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} required />
                    <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required />
                    <button type="submit">Login</button>
                </form>
            </div>
        )
    }
}

export default Login;