import React, { useState, useEffect } from "react";
import UserDescription from "../UserDescription/UserDescription";
import FirendList from "../FriendList/FriendList";
import axios from 'axios'
import SiderDemo from "../../containers/Layaout/Layout";
const Profile = props => {

    const [userData, updateData] = useState({})

    useEffect(() => {
        const getData = async () => {

            const response = await axios.get('http://localhost:8000/api/users/' + localStorage.username + '/')

            updateData(response.data)
            console.log(response.data);

            return response.data
        }
        getData().then(() => {

        }).catch(e => console.log(e.response))
    }, [localStorage.username])


    
        return (
            <div>
                {userData.friends !== undefined
                    ? <SiderDemo>
                        {console.log(userData)}
                        <UserDescription userInfo={userData} />
                        <FirendList userInfo={userData} />
                    </SiderDemo>
                    : null
                }

            </div>
        )
    

}

export default Profile