import React, { useState, useEffect } from 'react'
import fm from './FriendList.module.css'
import { Button, Avatar } from 'antd';

import axios from 'axios'


const FirendList = props => {
    const [imageLinks, updateLinks] = useState([])

    useEffect(() => {
        console.log(props.userInfo.username);
        try{
            props.userInfo.friends.forEach(userID => {
                axios.get("http://localhost:8000/api/users/?id=" + userID)
                .then(res => {
                    console.log(props.userInfo);
                    updateLinks(imageLinks => [...imageLinks, { username: res.data[0].username, avatar: res.data[0].avatar }])
                }).catch(err => { console.log(err) })    
            });
        }
        catch(e){}
        
    }, [props.userInfo])

    return (
        <div>
            <h2>Friend List</h2>
            <div className={fm.wrapper}>

                {imageLinks.map((value, index) => (

                    value.avatar !== null
                        ? <a href={value.username}><Avatar src={value.avatar} size={128} key={index} /></a>
                        : <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" href="google.com" size={128} key={index} />

                ))}

            </div>
            <br></br>
            <br></br>
            <br></br>
            <Button type="primary" shape="round" size={256}>
                LoadMore
            </Button>
        </div>
    )

}

export default FirendList