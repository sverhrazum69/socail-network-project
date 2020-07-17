import React, { useState, useEffect } from 'react'
import SiderDemo from '../../containers/Layaout/Layout'
import axios from 'axios'
import { List, Avatar } from 'antd'
import './ChatPage.css'


import logo from './../../logo.svg';
import WebSocketInstance from '../../websockets';


class ChatPage extends React.Component {

    componentDidMount(){
        WebSocketInstance.connect(this.props.match.params.chatcode)
    }


    constructor(props) {
        super(props);
        this.state = {}
        console.log(props)
        this.waitForSocketConnection(() => {
            WebSocketInstance.addCallbacks(this.setMessages.bind(this), this.addMessage.bind(this))
            WebSocketInstance.getMessages(localStorage.username,props.match.params.chatcode);
        });
    }

    waitForSocketConnection(callback) {
        const component = this;
        setTimeout(
            function () {
                if (WebSocketInstance.state() === 1) {
                    console.log("Connection is made")
                    callback();
                    return;
                } else {
                    console.log("wait for connection...")
                    component.waitForSocketConnection(callback);
                }
            }, 100);
    }

    addMessage(message) {
        this.setState({ messages: [...this.state.messages, message] });
    }

    setMessages(messages) {
        this.setState({ messages: messages.reverse() });
    }

    messageChangeHandler = (event) => {
        this.setState({
            message: event.target.value
        })
    }

    sendMessageHandler = (e) => {
        e.preventDefault();
        const messageObject = {
            from: "admin",
            content: this.state.message,
        };
        WebSocketInstance.newChatMessage(messageObject,this.props.match.params.chatcode);
        this.setState({
            message: ''
        });
    }

    renderMessages = (messages) => {
        const currentUser = "admin";
        return messages.map((message, i) => (
            <li
                key={message.id}
                className={message.author === currentUser ? 'sent' : 'replies'}>
                <img src="http://emilcarlsson.se/assets/mikeross.png" />
                <p>{message.content}
                    <br />
                    <small className={message.author === currentUser ? 'sent' : 'replies'}>
                        {Math.round((new Date().getTime() - new Date(message.date).getTime()) / 60000)} minutes ago
                    </small>
                </p>
            </li>
        ));
    }

    render() {
        const messages = this.state.messages;
        return (
            <SiderDemo>
                <div id="frame" className="chat-wrapper">
                    <div className="content">
                        <div className="contact-profile">
                            <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
                            <p>username</p>
                            <div className="social-media">
                                <i className="fa fa-facebook" aria-hidden="true"></i>
                                <i className="fa fa-twitter" aria-hidden="true"></i>
                                <i className="fa fa-instagram" aria-hidden="true"></i>
                            </div>
                        </div>
                        <div className="messages">
                            <ul id="chat-log">
                                {
                                    messages &&
                                    this.renderMessages(messages)
                                }
                            </ul>
                        </div>
                        <div className="message-input">
                            {console.log(this.props)}
                            <form onSubmit={this.sendMessageHandler}>
                                <div className="wrap">
                                    <input
                                        onChange={this.messageChangeHandler}
                                        value={this.state.message}
                                        required
                                        id="chat-message-input"
                                        type="text"
                                        placeholder="Write your message..." />
                                    <i className="fa fa-paperclip attachment" aria-hidden="true"></i>
                                    <button id="chat-message-submit" className="submit">
                                        SEND MESSAGE
                                        <i className="fa fa-paper-plane" aria-hidden="true"></i>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </SiderDemo>
        );
    };
}

export default ChatPage;