import React, { Component, Fragment } from 'react';
import api from '../../services/api';
import io from 'socket.io-client';
import './Feed.css';
import { logout } from "../../services/auth";

import more from '../../assets/more.svg';
import like from '../../assets/like.svg';
import liked from '../../assets/liked.svg';
import comment from '../../assets/comment.svg';
import send from '../../assets/send.svg';
import feed from '../../assets/feed.svg';
import profile from '../../assets/profile.svg';
import message from '../../assets/message.svg';

class Feed extends Component {
    state = {
        feed: [],
        page: 1
    };
    handleLike = async post => {
        const response = await api.post(`/posts/${post._id}/like`);
        this.setState({
            feed: this.state.feed.map(postLike =>
                (postLike._id === post._id) ?
                    (response.data.like === true) ?
                        { ...postLike, liked: true }
                        :
                        { ...postLike, liked: false }
                    :
                    { ...postLike }
            )
        });
    }
    async componentDidMount() {
        this.registerToSocket();

        this.loadPosts();
    }
    loadPosts = async () => {
        const response = await api.get('posts?page=' + this.state.page);
        const likedPosts = await api.get('posts/liked');
        response.data.docs.map(post => {
            likedPosts.data.map(postlike => {
                if (post._id === postlike.postid)
                    post = { ...post, liked: true }
                return post;
            })
            this.setState({ feed: [...this.state.feed, post] })
            return post;
        })
    }
    registerToSocket = () => {
        const socket = io('http://localhost:3333');

        socket.on('post', newPost => {
            this.setState({ feed: [newPost, ...this.state.feed] })
        })


        socket.on('like', likedPost => {
            this.setState({
                feed: this.state.feed.map(post =>
                    post._id === likedPost._id ? likedPost : post
                )
            });
        })
    }
    handleLoadMore = () => {
        var pg = this.state.page + 1;
        this.setState({ page: pg }, function () {
            this.loadPosts();

        })
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
                <section id="post-list">
                    {this.state.feed.map(post => (
                        <article key={post._id}>
                            <header>
                                <div className="user-info">
                                    <span>{post.author.name}</span>
                                    <span className="place">{post.place}</span>
                                </div>
                                <img src={more} alt="Mais" />
                            </header>

                            <img src={`https://instagumb-be.herokuapp.com/files/posts/${post.image}`} alt="" />

                            <footer>
                                <div className="actions">
                                    <button type="button" onClick={() => this.handleLike(post)}>
                                        <img src={(post.liked) ? liked : like} alt="Likes" />
                                    </button>
                                    <img src={comment} alt="Comentários" />
                                    <img src={send} alt="Enviar" />
                                </div>
                                <strong>{post.likes} curtidas</strong>
                                <p>
                                    {post.description}
                                    <span>{post.hashtags}</span>
                                </p>
                            </footer>
                        </article>
                    ))}
                    <button type="button" className="buttonLoad" onClick={this.handleLoadMore}>
                        Carregar mais
                </button>
                </section>
            </Fragment>
        );
    }
}

export default Feed;