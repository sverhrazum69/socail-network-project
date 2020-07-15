import React, { useState, useEffect } from 'react'
import fm from './FriendList.module.css'
import { Button, Avatar } from 'antd';


const FirendList = props => {
    const [imageLinks, updateLinks] = useState([])

    useEffect(() => {
        props.userInfo.friends.forEach(friendData => {
            updateLinks(imageLinks => [...imageLinks, {username:friendData.username,avatar:friendData.avatar}])
        });
    }, [props.userInfo.friends])

    return (
        <div>
            <h2>Friend List</h2>
            <div className={fm.wrapper}>

                {imageLinks.map((value, index) => (
                    value.avatar !== null
                        ? <a href={value.username}><Avatar src={value.avatar} size={128} key={index} /></a>
                        : <a href={value.username}><Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" size={128} key={index} /></a>

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