import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import 'antd/dist/antd.css';
import { Table, Tag, Button, Input, DatePicker, Select, Tooltip, Modal, Layout, Spin } from 'antd';
import { SearchOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import { url } from '../../utils/api';
import { useArticleContext } from '../../context/article_context';
const { Search } = Input
const { RangePicker } = DatePicker;
const { Option } = Select;

const AllArticlePage = () => {
    const { getSingleArticle } = useArticleContext()
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');
    const [loading, setLoading] = useState(false)
    const color_map = ['red', 'volcano', 'orange', 'gold', 'yellow', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple', 'magenta', 'grey']
    const [articleTable, setArticleTable] = useState([])
    const [tags, setTags] = useState([])
    const token_id = localStorage.getItem('token_id')
    let navigate = useNavigate();
    useEffect(async () => {
        await fetchAllTag()
        await fetchArticleTable()


    }, [])
    const showModal = () => {
        setVisible(true);
    };

    const fetchAllTag = async () => {
        setLoading(true)
        try {
            const config = {
                method: 'get',
                url: `${url}setting/getAllTag`,
                headers: { 'Authorization': token_id },
            }
            axios(config)
                .then((res) => {
                    const tag = res.data.result
                    setTags(tag)
                    setLoading(false)
                })
                .catch((err) => {
                    console.log('err', err);
                    setLoading(false)
                })
        } catch (error) {
            console.log('error', error);
            setLoading(false)
        }
    }

    const fetchArticleTable = async () => {
        setLoading(true)
        try {
            const config = {
                method: 'get',
                url: `${url}article/getArticleTable`,
                headers: { 'Authorization': token_id },
            }
            axios(config)
                .then((res) => {
                    setArticleTable(res.data.result)
                    setLoading(false)
                })
                .catch((error) => {
                    setLoading(false)
                    console.log('error', error);
                })
        } catch (error) {
            setLoading(false)
            console.log('error', error);
        }
    }
    const handleOk = () => {
        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
            setVisible(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setVisible(false);
    };
    const children = [];
    for (let i = 10; i < 36; i++) {
        children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
    }

    function handleChange(value) {
        console.log(`selected ${value}`);
    }
    function onChange(value) {
        console.log(`selected ${value}`);
    }

    function onSearch(val) {
        console.log('search:', val);
    }


    const data = [
        {
            key: '1',
            date: '01-20-2022',
            title: 'Content Name',
            tags: ['web3', 'nft', 'defi', 'blockchain', 'gamefi'],
            category: "bitcoin",
            action: ['Edit', 'Delete'],
        }
    ];
    const dataSource = Array(300).fill(1).map(el => data[0])
    const columns = [
        {
            title: 'วันที่',
            dataIndex: 'created_date',
            key: 'created_date',
        },
        {
            title: 'ชื่อหัวข้อ',
            dataIndex: 'name',
            key: 'name',

        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Tags',
            dataIndex: 'tag',
            key: 'tag',
            render: items => (
                loading ? <Spin> </Spin> :
                    <>
                        {
                            items.map((tag, i) => {

                                const color = tags.find(el => el.tag_name === tag).color

                                return (
                                    <Tag color={color} key={tag}>
                                        {tag.toUpperCase()}
                                    </Tag>
                                );
                            })
                        }
                    </>
            ),
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => {

                return (<>
                    <Button onClick={() => {
                        getSingleArticle(record._id)
                        navigate(`/editarticle/${record._id}`)
                    }
                    }>
                        Edit
                    </Button>
                </>)
            }

        },
    ];
    return (
        <Spin tio="Loading..." spinning={loading}>
            <Wrapper>
                <FormContainer style={{ 'justifyContent': 'end' }}>
                    <Button type="primary" style={{ 'marginRight': '10px', 'background': '#030852' }}>เพิ่มบทความ</Button>
                </FormContainer>
                <FormContainer>
                    <RangePicker
                    // onChange={onChange}
                    // onOk={onOk}
                    />
                    <Search placeholder="input search text" allowClear style={{ width: 200 }} />
                    <Select
                        showSearch
                        placeholder="Select Category"
                        optionFilterProp="children"
                        onChange={onChange}
                        onSearch={onSearch}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="tom">Tom</Option>
                    </Select>
                    <Select
                        mode="multiple"
                        allowClear
                        style={{ width: '20%' }}
                        placeholder="Please select"
                        onChange={handleChange}
                    >
                        {children}
                    </Select>
                </FormContainer>
                <FormContainer style={{ 'justifyContent': 'center' }}>
                    <Button type="primary" icon={<SearchOutlined />} style={{ 'marginRight': '10px', 'background': '#030852' }}>
                        ค้นหา
                    </Button>
                    <Button icon={<DeleteOutlined />} style={{ 'marginLeft': '10px', 'background': '#f0f5ff' }}>ล้างค่า</Button>
                </FormContainer>
                <Modal
                    title="Title"
                    visible={visible}
                    onOk={handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                >
                    <p>{modalText}</p>
                </Modal>
                {!loading && <Table dataSource={articleTable} columns={columns} />}
            </Wrapper>
        </Spin>
    )
};

export default AllArticlePage;

const Wrapper = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    width:85vw;
    margin-left:3rem;
    margin-right:auto;
    margin-top:3rem;
`
const FormContainer = styled.div`
    display:flex;
    justify-content:space-between;
    margin-bottom:2rem;
`