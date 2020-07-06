import React from 'react'
import info from './Info.module.css'

const Info = (props) => {
    return (
        <div className={info.wrapper}>
            <div className={info.item}>
                <div className={info.category}>{props.category}</div>
                <div className={info.description}>{props.desc}</div>
                <br></br>
            </div>

            
        </div>
    )
}

export default Info