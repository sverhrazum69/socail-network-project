import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Descriptions } from 'antd';
import { updateObject } from '../../store/utility';

const UserDescription = props => {

  const [userInfo, updateUserInfo] = useState({})

  useEffect(() => {
    axios.get('http://localhost:8000/api/users/' + localStorage.username + '/')
      .then(response => {
        updateUserInfo(response.data)
      })
  })

  return (
    <div>
      <Descriptions title="" layout="vertical">
        <Descriptions.Item><img src = {userInfo.avatar} width="250" height="200" alt="avatar"/></Descriptions.Item>
      </Descriptions>
      <Descriptions title="User info" layout="vertical">
        <Descriptions.Item label="UserName">{userInfo.username}</Descriptions.Item>
        <Descriptions.Item label="Telephone">{userInfo.telephoneNumber !== "" ? userInfo.telephoneNumber : `undefined`}</Descriptions.Item>
        <Descriptions.Item label="Live in">{userInfo.homeCountry !== "" ? userInfo.homeCountry : `undefined`}</Descriptions.Item>
        <Descriptions.Item label="Address" span={2}>
          {userInfo.address !== "" ? userInfo.address : `undefined`}
        </Descriptions.Item>
        <Descriptions.Item label="About me">{userInfo.desctiption !== "" ? userInfo.desctiption : `undefined`}</Descriptions.Item>
      </Descriptions>
    </div>

  );
}

export default UserDescription