import React, { Component, Fragment } from 'react';
import api from '../../services/api.js';
import jwt from 'jsonwebtoken';
import { getToken, logout } from '../../services/auth';
import feed from '../../assets/feed.svg';
import profile from '../../assets/profile.svg';
import message from '../../assets/message.svg';
import './Profile.css';

class Profile extends Component {
    state = {
        feed: [],
        user: [],
        hover: false,
        page: 1
    }

    async componentDidMount() {
        const token = jwt.decode(getToken())
        const posts = await api.get(`posts/profile/${token.id}`)
        const user = await api.get(`user/${token.id}`)
        this.setState({
            feed: posts.data.map(post => post),
            user: user.data
        })
    }
    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }
    toggleHover = id => {

        console.log(id)
    }
    handleLogout = () => {
        logout();
        this.props.history.push('/login');
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
                <section id="component">
                    <button onClick={this.handleLogout}>Sair</button>
                    <div className="header">
                        <div className="image">
                            <img src={`https://instagumb-be.herokuapp.com/files/avatar/${this.state.user.avatar}`} alt="" />
                        </div>
                        <div className="side">
                            <div className="name">
                                {this.state.user.name}
                            </div>
                            <div className="description">
                                {this.state.user.description}
                            </div>
                        </div>
                    </div>
                    <div id="menu-profile">
                        <ul>
                            <li>
                                <span className="number">{this.state.feed.length}</span>
                                <span className="sub">publicações</span>
                            </li>
                            <li>
                                <span className="number">{this.state.user.followers}</span>
                                <span className="sub">seguidores</span>
                            </li>
                            <li>
                                <span className="number">{this.state.user.following}</span>
                                <span className="sub">seguindo</span>
                            </li>
                        </ul>
                    </div>
                    <div className="allPosts">
                        {this.state.feed.map(post => (
                            <div className="uniqpost" key={post._id}>
                                <img src={`https://instagumb-be.herokuapp.com/files/posts/${post.image}`} alt="" />

                            </div>

                        ))}
                    </div>
                </section>
            </Fragment>
        );
    }
}

export default Profile;