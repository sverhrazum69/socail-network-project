import React, { useState, useEffect } from 'react'
import SiderDemo from '../../containers/Layaout/Layout'
import axios from 'axios'
import { List, Avatar } from 'antd'
import { Widget, addResponseMessage,addLinkSnippet, addUserMessage } from 'react-chat-widget'
import './ChatPage.css'


import logo from './../../logo.svg';
const ChatPage = props => {

    const [chatRoom, updateChatRoom] = useState()

    useEffect(() => {
        const getData = async () => {
            const response = await axios.get("http://localhost:8000/chat/rooms/" + props.match.params.chatcode)
            updateChatRoom(response.data)
            console.log(response.data)
        }
        getData().catch(e => { console.log(e.response) })
        addResponseMessage("kewk")
    }, [])

    const handleNewUserMessage = newMessage => {
        console.log(`New message incomig! ${newMessage}`)
    }
    return (
        <SiderDemo>
            <Widget
                handleNewUserMessage={handleNewUserMessage}
                title="My new title"
                subtitle="And my cool subtitle"
            />
        </SiderDemo>
    )
}

export default ChatPage