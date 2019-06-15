import React, { Component } from 'react';
import api from '../../services/api.js';

import './Login.css';

class Login extends Component {
    state = {
        avatar: null,
        name: '',
        email: '',
        password: '',
        description: '',
        errorMessage: ''
    }
    handleSubmit = async e => {
        e.preventDefault();
        const data = new FormData();

        data.append('avatar', this.state.avatar)
        data.append('name', this.state.name)
        data.append('email', this.state.email)
        data.append('password', this.state.password)
        data.append('description', this.state.description)

        await api.post('users', data).then((response) => {
            this.setState({ errorMessage: '' })
            this.props.history.push('/login');
        }).catch((error) => {
            this.setState({
                errorMessage: error.response.data.error
            })
        });
        // console.log(response.data);
    }
    handleImageChange = e => {
        this.setState({ avatar: e.target.files[0] });
    }
    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }
    render() {
        return (
            <form id="new-login" onSubmit={this.handleSubmit}>
                {this.state.errorMessage && <div className="error">{this.state.errorMessage}</div>}
                <label>
                    Foto de perfil: <input type="file" name="avatar" onChange={this.handleImageChange} />
                </label>
                <input
                    type="text"
                    name="name"
                    placeholder="Nome"
                    onChange={this.handleChange}
                    value={this.state.name}
                />
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
                <input
                    type="text"
                    name="description"
                    placeholder="Descrição"
                    onChange={this.handleChange}
                    value={this.state.description}
                />
                <button type="submit">Entrar</button>
                <a href="/login">Já sou cadastrado</a>
            </form>
        );
    }
}
export default Login;