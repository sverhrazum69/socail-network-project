import React from 'react'
import s from './Sidebar.module.css'

const Sidebar = () => {
    return (
        <div className={s.sidebar}>
            <div className={s.flexWrapper}>

                <div className={s.flexItem}>
                    View Profile
                </div>
                <div className={s.flexItem}>
                    frend list
                </div>
                <div className={s.flexItem}>
                    Search
                </div>
                <div className={s.flexItem}>
                    Store
                </div>
            </div>
        </div>
    )
}

export default Sidebar