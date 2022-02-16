import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { Layout, Menu, Spin, Avatar } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
    SolutionOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/auth_context';
import { url } from '../utils/api';
import axios from "axios";

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

const Sidebar = () => {
    //const { fetchUserInfo, first_name, last_name } = useAuthContext()
    const [collapsed, setCollapsed] = useState(false)
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState({
        first_name: '',
        last_name: ''
    })
    const toggle = () => {
        setCollapsed(!collapsed)
    };
    useEffect(() => {
        fetchUserInfo()
    }, [])

    // useEffect(() => {
    //     setName({
    //         first_name: first_name,
    //         last_name: last_name
    //     })
    // }, [])
    const navigate = useNavigate()
    const token_id = localStorage.getItem('token_id')
    const fetchUserInfo = () => {
        setLoading(true)
        try {
            const config = {
                method: 'get',
                url: `${url}auth/getUserInfo`,
                headers: { 'Authorization': token_id },
            }
            axios(config)
                .then((res) => {
                    const { user } = res.data.result
                    setName({
                        first_name: user.first_name,
                        last_name: user.last_name
                    })
                    setLoading(false)
                }).catch((err) => {
                    console.log('err', err);
                    setLoading(false)
                })
        } catch (error) {
            console.log('error', error);
            setLoading(false)
        }
    }

    return (

        <Sider collapsible collapsed={collapsed} onCollapse={toggle} style={{ 'min-height': '100vh' }}>
            {!collapsed && (
                <>
                    <Avatar size={150} icon={<UserOutlined />} style={{ margin: '1.5rem' }} />
                    <Spin spinning={loading}>
                        <AdminName>{name.first_name} {name.last_name}</AdminName>
                    </Spin>
                </>
            )
            }
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="1" icon={<DesktopOutlined />}>
                    <Link to='/'>
                        หน้าหลัก
                    </Link>
                </Menu.Item>
                <SubMenu key="sub1" icon={<SolutionOutlined />} title="ดูข่าวและบทความ">
                    <Menu.Item key="3">ข่าว</Menu.Item>
                    <Menu.Item key="4">
                        <Link to='/allarticle'>
                            บทความ
                        </Link>
                    </Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<FileOutlined />} title="เพิ่มบทความ/ข่าว">
                    <Menu.Item key="6">เขียนข่าว</Menu.Item>
                    <Menu.Item key="8">
                        <Link to='/addarticle'>
                            เขียนบทความ
                        </Link>
                    </Menu.Item>
                </SubMenu>
                {!collapsed &&
                    <Menu.Item key="4" icon={<LogoutOutlined />} style={{ position: 'absolute', bottom: '6%', zIndex: 3, }}
                        onClick={() => {
                            localStorage.removeItem("token_id")
                            localStorage.removeItem("user_id")
                            navigate('/authen')
                        }}>
                        ออกจากระบบ
                    </Menu.Item>
                }

            </Menu>
        </Sider >
    )
}

export default Sidebar

const Wrapper = styled.div`
    height:100vh;
    display:flex;
    flex-direction:column;
    align-items:center;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    a{
        text-decoration:none;
        color:white;
    }
    .admin-name{
        margin:1rem 2.5rem;
        font-size:1.5rem;
        font-weight:normal;
        color:#fff;
    }
    .underline{
        margin-top:1.5rem;
        height:1.5px;
        width:110%;
        background:#000;
        margin-bottom:2rem;
    }
`

const AdminName = styled.div`
    margin:0rem 2.5rem 1rem;
    font-size:1.2rem;
    font-weight:normal;
    color:#fff;
`

const Underline = styled.div`
    margin-top:1.5rem;
    height:1.5px;
    width:110%;
    background:#000;
    margin-bottom:2rem;
`

const AdminImage = styled.div`
    width:10vw;
    height:20vh;
    margin:1rem auto;
    border-radius:50%;
    background:#FFF6F6;
    display:flex;
    justify-content:center;
    align-items:center;
`

const MenuButton = styled.div`
    color:#fff;
    font-size:1.2rem;
    height:3rem;
    width:100%;
    background:#4363D8;
    text-align:center;
    top:50%;
    display:flex;
    align-items:center;
    justify-content:center;
    margin: 0.5rem 0px;
    :hover{
        background:#001A75;
        width:120%;
        cursor: pointer;
    }
`

const LogoutButton = styled.div`
    color:#fff;
    justify-self:end;
    margin-top:auto;
`