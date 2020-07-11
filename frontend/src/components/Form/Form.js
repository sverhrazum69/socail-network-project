import React from 'react'
import { Form, Input, InputNumber, Button } from 'antd';
import ImageUpload from '../ImageUpload/ImageUpload';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not validate email!',
    number: '${label} is not a validate number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const InputForm = props => {
  const onFinish = values => {
    console.log(values);
  };

  console.log(props.placeholderValues);
  
  return (
    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
      <Form.Item
        name={['user', 'name']}
        label="Name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder={props.placeholderValues.username}/>
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
        <Input placeholder={props.placeholderValues.email}/>
      </Form.Item>
      <Form.Item name={['user', 'telephoneNumber']} label="Telephone">
        <Input placeholder={props.placeholderValues.telephoneNumber} />
      </Form.Item>
      <Form.Item name={['user', 'homeCountry']} label="Live in">
        <Input placeholder={props.placeholderValues.homeCountry}/>
      </Form.Item>
      <Form.Item name={['user', 'address']} label="Address">
        <Input placeholder={props.placeholderValues.address}/>
      </Form.Item>
      <Form.Item name={['user', 'desctiption']} label="About me">
        <Input.TextArea placeholder={props.placeholderValues.desctiption}/>
      </Form.Item>
      <Form.Item name={['user', 'avatar']} label="Avatar">
        <ImageUpload />
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