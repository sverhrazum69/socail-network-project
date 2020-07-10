import React, { useState, useEffect } from 'react'
import fm from './FriendList.module.css'
import { Button, Avatar } from 'antd';
import AvatarImg from '../Avatars/Avatars';
import { updateObject } from '../../store/utility';
import axios from 'axios'


const FirendList = props => {
    const [imageLinks, updateLinks] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8000/api/users/" + localStorage.username + "/")
            .then(response => {
                response.data.friends.forEach(userID => {
                    axios.get("http://localhost:8000/api/users/?id=" + userID)   
                    .then(res => {
                        updateLinks(imageLinks.push({userID:res.data[0].avatar}))
                    }).catch(err => {console.log(err)}) 
                });
        
            }).catch(err => { console.log(err) })

    })
    console.log(imageLinks)
    return (
        <div>
            <h2>Friend List</h2>
            <div className={fm.wrapper}>
                
                {[imageLinks].map((value, index) => (
                    
                    value.imageUrl !== null
                        ? <a href="google.com"><Avatar src={value.imageLinks} size={128} /></a>
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