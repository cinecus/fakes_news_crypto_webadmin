import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom'
const Sidebar = () => {
    return (
        <Wrapper>
            <AdminImage />
            <div className='admin-name'>Cinecus CC</div>
            <div className='underline'></div>
            <MenuButton>
                <Link to="/" style={{ 'textDecoration': 'none' }}>หน้าหลัก</Link>
            </MenuButton>
            <MenuButton><Link to="/allcontent">ดูบทความทั้งหมด</Link></MenuButton>
            <MenuButton><Link to="/addcontent">เพิ่มบทความ</Link></MenuButton>
            <LogoutButton>ออกจากระบบ</LogoutButton>
        </Wrapper>
    )
}

export default Sidebar

const Wrapper = styled.div`
    width:15vw;
    height:100vh;
    background:#4363D8;
    padding:2rem;
    display:flex;
    flex-direction:column;
    align-items:center;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    overflow-x: hidden;
    a{
        text-decoration:none;
        color:white;
    }
    .admin-name{
        margin-top:1rem;
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

const AdminImage = styled.div`
    width:11rem;
    height:11rem;
    border-radius:50%;
    background:#FFF6F6;
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

const LogoutButton = styled(MenuButton)`
    justify-self:end;
    margin-top:auto;
`