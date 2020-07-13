import React from 'react'
import axios from 'axios'
import { Avatar, Descriptions } from 'antd';
import PopupForm from '../PopupForm/PopupForm';
import Cookies from 'js-cookie'
const UserDescription = props => {

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
      return response.data.id
    }
    getId().then(myID => {
      axios.post('http://localhost:8000/api/friendRequests/', {
        'from_user': myID,
        'to_user': props.userInfo.id
      }, config)
        .then(() => console.log())
        .catch(err => console.log(err.response))
    }).catch(e => { console.log(e.response) })
  }


  /*useEffect(() => {
    axios.get('http://localhost:8000/api/users/' + props.displayUser + '/')
      .then(response => {
        //updateUserInfo(response.data)
      })
  })*/

  return (
    <div>
      <Descriptions title="" layout="vertical">
        <Descriptions.Item>{props.userInfo.avatar !== null ? <Avatar size={128} src={props.userInfo.avatar} /> : <Avatar size={128} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}</Descriptions.Item>
      </Descriptions>
      <Descriptions title="User info" layout="vertical">
        <Descriptions.Item label="UserName">{props.userInfo.username}</Descriptions.Item>
        <Descriptions.Item label="email">{props.userInfo.email}</Descriptions.Item>
        <Descriptions.Item label="Telephone">{props.userInfo.telephoneNumber !== null && props.userInfo.telephoneNumber !== "" ? props.userInfo.telephoneNumber : `undefined`}</Descriptions.Item>
        <Descriptions.Item label="Live in">{props.userInfo.homeCountry !== null && props.userInfo.homeCountry !== "" ? props.userInfo.homeCountry : `undefined`}</Descriptions.Item>
        <Descriptions.Item label="Address" span={2}>
          {props.userInfo.address !== null && props.userInfo.address !== "" ? props.userInfo.address : `undefined`}
        </Descriptions.Item>
        <Descriptions.Item label="About me">{props.userInfo.desctiption !== null && props.userInfo.desctiption !== "" ? props.userInfo.desctiption : `undefined`}</Descriptions.Item>
      </Descriptions>
      {
        props.userInfo.username === localStorage.username
          ? <PopupForm placeholderValues={props.userInfo} updateUserData={props.updateUserData}/>
          : <button type="submit" onClick={sendFriendRequest}>Add friend</button>
      }

    </div>

  );
}

export default UserDescription