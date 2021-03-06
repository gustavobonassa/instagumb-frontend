import React, { Component } from 'react';
import api from '../../services/api.js';
import { login } from "../../services/auth";
import './Login.css';

class Login extends Component {
    state = {
        email: '',
        password: '',
        errorMessage: ''
    }
    handleSubmit = async e => {
        e.preventDefault();

        const data = {
            "email": this.state.email,
            "password": this.state.password
        };
        console.log(data)
        await api.post('sessions', data).then((response) => {
            this.setState({ errorMessage: '' })
            login(response.data.token);
            this.props.history.push("/");
        }).catch((error) => {
            console.log(error.response.data.error)
            this.setState({
                errorMessage: error.response.data.error
            })
        });

        //console.log(response);
    }
    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }
    render() {
        return (
            <form id="new-login" onSubmit={this.handleSubmit}>
                {this.state.errorMessage && <div className="error">{this.state.errorMessage}</div>}
                <input
                    type="email"
                    name="email"
                    placeholder="Seu email"
                    onChange={this.handleChange}
                    value={this.state.email}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Senha"
                    onChange={this.handleChange}
                    value={this.state.password}
                />
                <button type="submit">Entrar</button>
                <a href="/register">Quero me registar</a>
            </form>
        );
    }
}
export default Login;