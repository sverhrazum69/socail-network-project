import React from 'react'
import { Form, Input, Button, Spin } from 'antd';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import { LoadingOutlined } from '@ant-design/icons';
import * as actions from '../../store/actions/auth'

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const Login = props => {

    const handleRedirect = () => {
        props.history.push("/profilePage/" + localStorage.username)
    }

    const onFinish = values => {
        props.onAuth(values.username,values.password)
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    let errorMessage = null
    if (props.error){
        errorMessage = (
            <p>props.error.message</p>
        )
    }
    
    return (
        <div>
            {console.log(props)}
            {errorMessage}
            {
                props.loading
                    ? <Spin indicator={antIcon} />
                    :
                    !localStorage.getItem('token')
                    ?
                    <Form
                        {...layout}
                        name="basic"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{ marginRight: '10px' }}>
                                Login
                </Button>
                Or
                <NavLink style={{ marginRight: '10px' }} to='/signup/'> signup</NavLink>
                        </Form.Item>
                </Form>
                :
                <div>
                    <h2>You have successfuly loged in,you can visit your page now</h2>
                    <p>
                        <button type="button" onClick={handleRedirect}>Visit Page</button> 
                    </p>
                </div>
            }
        </div>
    );
};

const mapStateToProps = state => {
    return{
        loading: state.loading,
        error:state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username,password) => dispatch(actions.authLogin(username, password))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login)
