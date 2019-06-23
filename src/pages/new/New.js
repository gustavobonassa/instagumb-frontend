import React, { Component, Fragment } from 'react';
import api from '../../services/api.js';
import feed from '../../assets/feed.svg';
import profile from '../../assets/profile.svg';
import message from '../../assets/message.svg';
//import jwt from 'jsonwebtoken';
//import { getToken } from '../../services/auth';
import './New.css';

class New extends Component {
    state = {
        image: null,
        place: '',
        description: '',
        hashtags: '',
    }
    handleSubmit = async e => {
        e.preventDefault();

        const data = new FormData();
        //const token = jwt.decode(getToken())
        data.append('image', this.state.image);
        data.append('place', this.state.place);
        data.append('description', this.state.description);
        data.append('hashtags', this.state.hashtags);

        await api.post('posts', data);

        this.props.history.push('/');
    }
    handleImageChange = e => {
        this.setState({ image: e.target.files[0] });
    }
    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <Fragment>
                <div id="menu-header">
                    <ul>
                        <li><a href="/"><img src={feed} alt="" width="30px" /></a></li>
                        <li><a href="/messages"><img src={message} alt="" width="30px" /></a></li>
                        <li><a href="/profile"><img src={profile} alt="" width="30px" /></a></li>
                    </ul>
                </div>
                <form id="new-post" onSubmit={this.handleSubmit}>
                    <input type="file" onChange={this.handleImageChange} />
                    <input
                        type="text"
                        name="place"
                        placeholder="Local do post"
                        onChange={this.handleChange}
                        value={this.state.place}
                    />
                    <input
                        type="text"
                        name="description"
                        placeholder="Descrição do post"
                        onChange={this.handleChange}
                        value={this.state.description}
                    />
                    <input
                        type="text"
                        name="hashtags"
                        placeholder="Hashtags do post"
                        onChange={this.handleChange}
                        value={this.state.hashtags}
                    />
                    <button type="submit">Enviar</button>
                </form>
            </Fragment>
        );
    }
}

export default New;