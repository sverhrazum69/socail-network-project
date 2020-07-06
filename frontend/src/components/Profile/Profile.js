import React from 'react'
import p from './Profile.module.css'
import Friends from './friendList/Friends'
import Links from './links/Links'
import Info from './personalInfo/Info'


const Profile = () => {
    return (
        <div className={p.profile}>
            <div>
                <Info />
            </div>  
            <div>
                <Links />
            </div>
            <div>
                <Friends />
            </div>   
        </div>
    )
}

export default Profile