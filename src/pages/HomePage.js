import React from 'react'
import { Hero } from '../components'
import styled from 'styled-components';
import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';

const HomePage = () => {
    return (
        <Wrapper>
            <Box >
                <div className='title'>จำนวนผู้เข้าชมเว็บ</div>
                <div className='count'>1000</div>
            </Box>
            <Box>
                <div className='title'>จำนวนข่าว</div>
                <div className='count'>10</div>
            </Box>
            <Box><div className='title'>จำนวนบทความ</div>
                <div className='count'>10</div></Box>
        </Wrapper>
    )
}

export default HomePage

const Wrapper = styled.div`
    display:flex;
    justify-content:center;
    width:100vw;
    margin-top:3rem;
`

const Box = styled.div`
    background:#030852;
    width:300px;
    height:150px;
    margin-left:3rem;
    margin-right:3rem;
    display:flex;
    flex-direction:column;
    justify-content:center;
    .title{
        color:#fff;
        font-size:18px;
        text-align:center;
    }
    .count{
        color:#fff;
        font-size:30px;
        text-align:center;
    }
`