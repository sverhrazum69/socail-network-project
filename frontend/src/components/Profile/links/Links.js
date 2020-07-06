import React from 'react'
import l from './Links.module.css'

const Links = () => {
    return (
        <div className={l.wrapper}>
            <div className={l.names}>
                <p>Instagram:</p>
                <p>Facebook</p>
                <p>Twitter</p>
            </div>
            <div className={l.links}>
                <p><a href="instagram.com">My insta</a></p>
                <p><a href="instagram.com">My insta</a></p>
                <p><a href="instagram.com">My insta</a></p>
            </div>

        </div>
    )
}

export default Links