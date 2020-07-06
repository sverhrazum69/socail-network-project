import React from 'react'
import p from './Profile.module.css'
import Friends from './friendList/Friends'
import Links from './links/Links'
import Info from './personalInfo/Info'


const Profile = () => {
    return (
        <div className={p.profile}>
            <div>
                <Info desc="21.12.2001" category="Birthday:" />
                <Info desc="21.12.2001" category="shdkaljshdalkjl:" />
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