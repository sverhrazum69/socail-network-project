import React from 'react'
import { Avatar } from 'antd';


const AvatarImg = props => {
    const {imgLink = "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"} = props  
    return (
        <Avatar size={128} src={imgLink} />
    )
}

export default AvatarImg