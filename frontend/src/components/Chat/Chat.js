import React, { useState, useEffect } from 'react'
import SiderDemo from '../../containers/Layaout/Layout'
import axios from 'axios'
import { List, Avatar } from 'antd'
const Chat = props => {

    const [chatRooms, updateChatRooms] = useState()

    useEffect(() => {
        const getData = async () => {
            const response = await axios.get("http://localhost:8000/chat/rooms/?participants__username=" + localStorage.username)
            response.data.forEach(element => {
                if (element.participants[0].username !== localStorage.username) {
                    [element.participants[0], element.participants[1]] = [element.participants[1], element.participants[0]]
                }
            });
            updateChatRooms(response.data)
        }
        getData().catch(e => { console.log(e.response) })
    }, [])

    return (
        <SiderDemo>
            {console.log(chatRooms)}
            <List   
                itemLayout="horizontal"
                dataSource={chatRooms}
                renderItem={item => (
                    
                    <List.Item>
                        {console.log(props)}
                        {item.participants[1].avatar === null
                            ? <List.Item.Meta
                                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                title={<button onClick={() => props.history.push('../chat/' + item.code)}>{"Chat with " + item.participants[1].username}</button>}xz
                                description={"Chat with " + item.participants[1].username}
                            />
                            : <List.Item.Meta
                                avatar={<Avatar src={item.participants[1].avatar} />}
                                title={<button onClick={() => props.history.push('../chat/' + item.code)}>{"Chat with " + item.participants[1].username}</button>}
                                description={"Chat with " + item.participants[1].username}
                            />
                        }

                        {console.log(item)}
                    </List.Item>
                )}
            />
        </SiderDemo>
    )
}

export default Chat


