import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Avatar, Descriptions } from 'antd';
import PopupForm from '../PopupForm/PopupForm';
import Cookies from 'js-cookie'
const UserDescription = props => {

  const [userInfo, updateUserInfo] = useState({})
  let csrftoken = Cookies.get('csrftoken')
  let config = {
    headers: {
      'X-CSRFToken': csrftoken,
      'Content-Type': 'application/json'
    }
  }

  const sendFriendRequest = () => {
    let getId = async () => {
      let response = await axios.get('http://localhost:8000/api/users/' + localStorage.username + '/')
      console.log(response)
      return response.data.id
    }
    getId().then(myID => {
      axios.post('http://localhost:8000/api/friendRequests/', {
        'from_user': myID,
        'to_user': userInfo.id
      }, config)
        .then(() => console.log("success"))
        .catch(err => console.log(err.response))
    }).catch(e => { console.log(e.response) })
  }


  useEffect(() => {
    axios.get('http://localhost:8000/api/users/' + props.displayUser + '/')
      .then(response => {
        updateUserInfo(response.data)
      })
  })

  return (
    <div>
      <Descriptions title="" layout="vertical">
        <Descriptions.Item>{userInfo.avatar !== null ? <Avatar size={128} src={userInfo.avatar} /> : <Avatar size={128} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}</Descriptions.Item>
      </Descriptions>
      <Descriptions title="User info" layout="vertical">
        <Descriptions.Item label="UserName">{userInfo.username}</Descriptions.Item>
        <Descriptions.Item label="email">{userInfo.email}</Descriptions.Item>
        <Descriptions.Item label="Telephone">{userInfo.telephoneNumber !== null && userInfo.telephoneNumber !== "" ? userInfo.telephoneNumber : `undefined`}</Descriptions.Item>
        <Descriptions.Item label="Live in">{userInfo.homeCountry !== null && userInfo.homeCountry !== "" ? userInfo.homeCountry : `undefined`}</Descriptions.Item>
        <Descriptions.Item label="Address" span={2}>
          {userInfo.address !== null && userInfo.address !== "" ? userInfo.address : `undefined`}
        </Descriptions.Item>
        <Descriptions.Item label="About me">{userInfo.desctiption !== null && userInfo.desctiption !== "" ? userInfo.desctiption : `undefined`}</Descriptions.Item>
      </Descriptions>
      {
        props.displayUser === localStorage.username
          ? <PopupForm placeholderValues={userInfo} />
          : <button type="submit" onClick={sendFriendRequest}>Add friend</button>
      }

    </div>

  );
}

export default UserDescription