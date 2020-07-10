import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Avatar, Descriptions } from 'antd';
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
        <Descriptions.Item>{userInfo.avatar !== null ? <Avatar size={128} src={userInfo.avatar} /> : <Avatar size={128} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}</Descriptions.Item>
      </Descriptions>
      <Descriptions title="User info" layout="vertical">
        <Descriptions.Item label="UserName">{userInfo.username}</Descriptions.Item>
        <Descriptions.Item label="Telephone">{userInfo.telephoneNumber !== null && userInfo.telephoneNumber !== "" ? userInfo.telephoneNumber : `undefined`}</Descriptions.Item>
        <Descriptions.Item label="Live in">{userInfo.homeCountry !== null && userInfo.homeCountry !== "" ? userInfo.homeCountry : `undefined`}</Descriptions.Item>
        <Descriptions.Item label="Address" span={2}>
          {userInfo.address !== null && userInfo.address !== ""  ? userInfo.address : `undefined`}
        </Descriptions.Item>
        <Descriptions.Item label="About me">{userInfo.desctiption !== null && userInfo.desctiption !== "" ? userInfo.desctiption : `undefined`}</Descriptions.Item>
      </Descriptions>
    </div>

  );
}

export default UserDescription