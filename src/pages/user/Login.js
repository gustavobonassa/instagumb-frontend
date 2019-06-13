import React, { Component } from 'react';
import api from '../../services/api.js';

import './Login.css';

class Login extends Component {
    render() {
        return (
            <form id="new-post" onSubmit={this.handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Seu email"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Senha"
                />
                <button type="submit">Entrar</button>
            </form>
        );
    }
}
export default Login;