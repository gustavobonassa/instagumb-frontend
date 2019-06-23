import React, { Component, Fragment } from 'react';
import api from '../../services/api.js';
import jwt from 'jsonwebtoken';
import { getToken, logout } from '../../services/auth';
import feed from '../../assets/feed.svg';
import profile from '../../assets/profile.svg';
import message from '../../assets/message.svg';
import './Messages.css';

class Profile extends Component {
    state = {
        feed: [],
        user: [],
        hover: false,
        page: 1
    }

    render() {
        return (
            <div id="menu-header">
                <ul>
                    <li><a href="/"><img src={feed} alt="" width="30px" /></a></li>
                    <li><a href="/messages"><img src={message} alt="" width="30px" /></a></li>
                    <li><a href="/profile"><img src={profile} alt="" width="30px" /></a></li>
                </ul>
            </div>
        );
    }
}

export default Profile;