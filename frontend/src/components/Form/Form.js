import React, { useState } from 'react'
import { Form, Input, Button } from 'antd';

//import ImageUpload from '../ImageUpload/ImageUpload';
import axios from 'axios'
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const csrftoken = getCookie('csrftoken');

const InputForm = props => {
  console.log(props)
  const [imgFile, updateImgFile] = useState()
  const onFinish = values => {

    let ids = []
    props.placeholderValues.friends.forEach(element => {
      console.log(element)
      ids.push(parseInt(element.id))
    });
    values.user.friends = ids
    values.user.avatar = imgFile
    

    console.log(values.user)
    let config = {
      headers: {
        'X-CSRFToken': csrftoken,
        "Content-Type": "application/json"
      }
    }
   
    
    axios.put("http://localhost:8000/api/users/" + localStorage.username + "/", values.user, config)
      .then((response) => {
        props.updateData(response.data)
        props.exit()
      })
      .catch(err => {
        console.error(err.response);
      })
  };

  return (
    <Form {...layout} name="nest-messages" onFinish={onFinish} /*validateMessages={validateMessages}*/>
      <Form.Item
        name={['user', 'username']}
        label="Name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input defaultValue={props.placeholderValues.username} />
      </Form.Item>
      <Form.Item
        name={['user', 'email']}
        label="Email"
        rules={[
          {
            type: 'email',
          },
        ]}
      >
        <Input defaultValue={props.placeholderValues.email} />
      </Form.Item>
      <Form.Item name={['user', 'telephoneNumber']} label="Telephone">
        <Input defaultValue={props.placeholderValues.telephoneNumber} />
      </Form.Item>
      <Form.Item name={['user', 'homeCountry']} label="Live in">
        <Input defaultValue={props.placeholderValues.homeCountry} />
      </Form.Item>
      <Form.Item name={['user', 'address']} label="Address">
        <Input defaultValue={props.placeholderValues.address} />
      </Form.Item>
      <Form.Item name={['user', 'desctiption']} label="About me">
        <Input.TextArea defaultValue={props.placeholderValues.desctiption} />
      </Form.Item>
      <Form.Item name={['user', 'avatar']} label="Avatar">
        <input type="file" onChange={(e) => updateImgFile(e.target.files[0])} />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>

    </Form>
  );
};

export default InputForm