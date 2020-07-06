import React from 'react'
import f from './Friends.module.css'

const Friends = () => {
    return (
        <div className={f.friendWrapper}>
            <div className={f.flexWrapper}>
                <div>
                    <img src="https://cdn3.iconfinder.com/data/icons/social-messaging-productivity-6/128/profile-female-circle2-512.png"></img> 
                </div>
                <div>
                    <img src="https://cdn3.iconfinder.com/data/icons/social-messaging-productivity-6/128/profile-female-circle2-512.png"></img>
                </div>
                <div>
                    <img src="https://cdn3.iconfinder.com/data/icons/social-messaging-productivity-6/128/profile-female-circle2-512.png"></img>
                </div>
            </div>
            <div className={f.loadBtn}>Load more</div>
        </div>
    )
}

export default Friends