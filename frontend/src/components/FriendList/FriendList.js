import React from 'react'
import fm from './FriendList.module.css'
import { Button } from 'antd';
import AvatarImg from '../Avatars/Avatars';



class FirendList extends React.Component {
    render(){
        return (
            <div>
                <div className={fm.wrapper}>
                    <AvatarImg />
                    <AvatarImg />
                    <AvatarImg />
                    <AvatarImg />
                </div>
                <br></br>
                <br></br>
                <br></br>
                <Button type="primary" shape="round"  size={256}>
                    LoadMore
                </Button>
            </div>
        )
    }
}

export default FirendList