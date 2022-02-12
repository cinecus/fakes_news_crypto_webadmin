import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Form, Input, Button, Checkbox, Layout, Card, Spin } from 'antd';
import { Link, useNavigate } from 'react-router-dom'
import { UserOutlined, LoginOutlined } from '@ant-design/icons';
import { url } from '../../utils/api';
import axios from 'axios';

const LoginPage = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [user_id, setUserId] = useState('')
    const [message, setMessage] = useState('')
    const [toggle, setToggle] = useState(false)
    const LoginAPI = (obj) => {
        setLoading(true)
        const config = {
            method: 'post',
            url: `${url}auth/login`,
            data: obj
        }
        axios(config)
            .then((res) => {
                const { user, token_id } = res.data.result
                localStorage.setItem('user_id', user._id)
                localStorage.setItem('token_id', token_id)
                setUserId(user._id)
                setLoading(false)
            }).catch((err) => {
                console.log('err', err);
                setMessage('*ชื่อผู้ใช้ หรือ รหัสผ่านไม่ถูกต้อง')
                setToggle(true)
                setLoading(false)
            })
    }
    const onFinish = (values) => {
        const { username, password } = values
        LoginAPI({ username, password })

    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        if (!!user_id) {
            navigate('/')
        }
    }, [user_id])

    useEffect(() => {
        setTimeout(() => {
            setToggle(false)
        }, 3000)
    }, [toggle])
    return (
        <Wrapper>
            <Card title={<><UserOutlined /> LOG IN</>} bordered={false} style={{ width: 500 }} headStyle={{ background: '#061178', color: '#fff' }}>
                <Spin spinning={loading}>
                    <Form
                        name="basic"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 6, span: 16 }}>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Form.Item wrapperCol={{ span: 16, offset: 10 }}>
                            <Button type="primary" htmlType="submit" icon={<LoginOutlined />} title='LOGIN'>
                                LOG IN
                            </Button>
                        </Form.Item>
                        {toggle && <p style={{ color: 'red', marginLeft: '25px' }}>{message}</p>}
                    </Form>
                </Spin>
            </Card>
        </Wrapper >
    )
}
export default LoginPage


const Wrapper = styled.div`
    display:flex;
    height:100vh;
    justify-content:center;
    align-items:center;
    background:#85a5ff;
`
