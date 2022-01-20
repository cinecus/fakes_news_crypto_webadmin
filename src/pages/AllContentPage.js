import React from 'react';
import styled from 'styled-components';
import 'antd/dist/antd.css';
import { Table, Tag, Button, Input, DatePicker, Select, Tooltip } from 'antd';
import { SearchOutlined, DeleteOutlined } from '@ant-design/icons';
const { Search } = Input

const AllContentPage = () => {
    const { RangePicker } = DatePicker;
    const { Option } = Select;
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
            tags: ['web3', 'blockchain', 'crypto'],
            category: 'BTC',
            action: ['Edit', 'Delete'],
        }
    ];
    const dataSource = Array(300).fill(1).map(el => data[0])
    const columns = [
        {
            title: 'วันที่',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'ชื่อหัวข้อ',
            dataIndex: 'title',
            key: 'title',

        },
        {
            title: 'Tags',
            dataIndex: 'tags',
            key: 'tags',
            render: tags => (
                <>
                    {tags.map(tag => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'crypto') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: action => (
                <>
                    {
                        action.map(el => {
                            let color = el === 'Edit' ? 'gold-6' : 'red-6'
                            return (
                                <Button key={el}>
                                    {el}
                                </Button>
                            )
                        })
                    }
                </>
            )
        },
    ];
    return (<Wrapper>
        <FormContainer>
            <Button type="primary" style={{ 'justifySelf': 'end', 'marginLeft': 'auto' }}>เพิ่มบทความ</Button>
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
            <Button type="primary" icon={<SearchOutlined />} style={{ 'marginRight': '10px' }}>
                ค้นหา
            </Button>
            <Button icon={<DeleteOutlined />} style={{ 'marginLeft': '10px' }}>ล้างค่า</Button>
        </FormContainer>
        <Table dataSource={dataSource} columns={columns} />
    </Wrapper>)
};

export default AllContentPage;

const Wrapper = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    width:85vw;
    margin-left:18rem;
    margin-right:3rem;
    margin-top:3rem;
`
const FormContainer = styled.div`
    display:flex;
    justify-content:space-between;
    margin-bottom:2rem;
`