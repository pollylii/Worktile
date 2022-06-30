import React from 'react'
import { Form, Input, Button, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Particles from "react-tsparticles";
import './Login.css'
import axios from 'axios';
export default function Login(props) {
    const onFinish = (values) => {
        axios.get(`http://localhost:5000/users?username=${values.username}&password=${values.password}&roleState=true&_expand=role`)
            .then(res => {
                if (res.data?.length === 0) {
                    message.error('用户名或密码不匹配！！')
                } else {
                    localStorage.setItem('token', JSON.stringify(res.data[0]))
                    props.history.push('/')
                }
            })
    }
    const params = {
        "background": {
            "color": {
                "value": "#f5f5f5"
            },
            "position": "50% 50%",
            "repeat": "no-repeat",
            "size": "cover"
        },
    }

    return (
        <div style={{ height: "100%", overflow: 'hidden' }}>
            <Particles height={document.documentElement.clientHeight} params={params} />
            <div className='formContainer'>
                <Form name="normal_login" className='login-form' onFinish={onFinish}>
                    <Form.Item name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='用户名' />
                    </Form.Item>
                    <Form.Item name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input type="password" placeholder="Password"
                            prefix={<LockOutlined className="site-form-item-icon" />}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" ghost htmlType="submit" className='antBtn'>Submit</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}