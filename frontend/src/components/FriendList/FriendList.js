import React from 'react'
import fm from './FriendList.module.css'
import { Button, Avatar } from 'antd';


const FirendList = props => {

    return (
        <div>
            <h2>Friend List</h2>
            {console.log(props)}
            <div className={fm.wrapper}>
                {console.log(props)}
                {props.userInfo.friends.map((value, index) => (
                    value.avatar !== null
                        ? <a href={"../../"+value.username+"/profile"}><Avatar src={value.avatar} size={128} key={index} /></a>
                        : <a href={"../../"+value.username+"/profile"}><Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" size={128} key={index} /></a>

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