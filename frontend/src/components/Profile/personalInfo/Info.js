import React from 'react'
import info from './Info.module.css'

const Info = () => {
    return (
        <div className={info.wrapper}>
            <div className={info.categories}>
                <p>born in</p>
                <p>Place of study</p>
                <p hidden>Work place</p>
                <p hidden>Degree</p>
                <p>About me:</p>
            </div>
            <div className={info.data}>
                <p>Ukraine</p>
                <p>KPI</p>
                <p hidden>-</p>
                <p hidden>-</p>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum reprehenderit numquam assumenda impedit tenetur quam ea corporis velit inventore! Explicabo quas dicta repellat. Perspiciatis sed reprehenderit recusandae odio blanditiis iste.</p>
            </div>
        </div>
    )
}

export default Info