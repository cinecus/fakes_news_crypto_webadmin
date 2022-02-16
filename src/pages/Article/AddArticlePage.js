import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { UploadOutlined } from '@ant-design/icons';
import {
    Layout, Menu, Form,
    Input,
    Button,
    Radio,
    Select,
    Cascader,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch,
    message,
    Upload,
    Spin,
    Modal
} from 'antd';
import axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { url } from '../../utils/api'

const { Content } = Layout
const { Option } = Select

const AddArticlePage = () => {
    const editorRef = useRef(null);
    const [loading, setLoading] = useState(false)
    const [tags, setTags] = useState([])
    const token_id = localStorage.getItem('token_id')
    const [categories, setCategories] = useState(['Bitcoin', 'Altcoin', 'Other'].map((el, i) => {
        return <Option key={i} value={el}>{el}</Option>
    }))
    useEffect(() => {
        fetchAllTag()
    }, [])
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };
    const [form] = Form.useForm()
    const onChangeForm = (e) => {
        const value = e.target.value
        const name = e.target.name
        form.setFieldsValue({
            [name]: value
        })
    }
    const formData = new FormData()

    const fetchAllTag = () => {
        setLoading(true)
        try {
            const config = {
                method: 'get',
                url: `${url}setting/getAllTag`,
                headers: { 'Authorization': token_id },
            }
            axios(config)
                .then((res) => {
                    const tag = res.data.result.map(el => (<Option key={el.tag_name} value={el.tag_name}>{el.tag_name}</Option>))
                    setTags(tag)
                    setLoading(false)
                })
                .catch((error) => {
                    console.log(error)
                    setLoading(false)
                })
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const onFinish = (values) => {
        setLoading(true)
        try {
            //console.log('values', values);
            //formData.append('image_cover', form.getFieldValue('image_cover'))
            formData.append('name', values.name)
            formData.append('category', values.category)
            values.tag.map((el, i) => {
                formData.append(`tag[${i}]`, el)
            })
            formData.append('is_show', values.is_show)
            formData.append('content', values.content)
            formData.append('image_cover', values.image_cover.file.originFileObj)
            const config = {
                method: 'post',
                heads: {
                    'content-type': 'multipart/form-data'
                },
                url: `${url}article/insertArticle`,
                headers: { 'Authorization': token_id },
                data: formData
            }
            // console.log('form', formData);
            axios(config)
                .then((res) => {
                    setLoading(false)
                    info()
                    form.resetFields()
                })
                .catch((error) => {
                    setLoading(false)
                    errorModal(error.response.data.message)
                    console.log('error', error.response.data.message)

                })
        } catch (error) {
            setLoading(false)
            errorModal()
        }

    };
    const info = () => {
        Modal.info({
            title: 'Notification Message',
            content: (
                <div>
                    เพิ่มบทความสำเร็จ
                </div>
            )
        });
    }
    const errorModal = (message) => {
        Modal.error({
            title: 'Error Message',
            content: message
        });
    }
    return <Layout>
        <Layout >
            <Content style={{ margin: '5rem 16px' }} >
                <Spin tip="Loading..." spinning={loading}>
                    <Form
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 14 }}
                        layout="horizontal"
                        form={form}
                        // initialValues={{ size: componentSize }}
                        onValuesChange={e => {
                            //console.log(e);
                        }}
                        onFinish={onFinish}
                    >
                        <Form.Item label="ชื่อบทความ" name='name' onChange={(e) => onChangeForm(e)} rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Category" name='category'
                            onChange={(e) => onChangeForm(e)} rules={[{ required: true }]}>
                            <Select>
                                {categories}
                            </Select>
                        </Form.Item>
                        <Form.Item label="Tags" name='tag'
                            onChange={(e) => onChangeForm(e)} rules={[{ required: true }]}>
                            <Select
                                mode="multiple"
                                allowClear
                                style={{ width: '20%' }}
                                placeholder="Please select"

                            >
                                {tags}
                            </Select>
                        </Form.Item>
                        {/* <Upload {...props}> */}
                        <Form.Item label="รูปหน้าปก" name="image_cover" rules={[{ required: true }]}>
                            {/* <Form.Item label="รูปหน้าปก" name="image_cover" valuePropName='' > */}
                            <Upload listType="picture" action=''>
                                <Button icon={<UploadOutlined />}>Upload Image</Button>
                            </Upload>
                        </Form.Item>
                        <Form.Item label="แสดง/ซ่อน" valuePropName="checked" name='is_show'
                            onChange={(e) => onChangeForm(e)} rules={[{ required: true }]}>
                            <Switch />
                        </Form.Item>

                        <Form.Item label="เนื้อหาบทความ" name='content' onChange={() => { }} rules={[{ required: true }]}>
                            <CKEditor
                                editor={ClassicEditor}
                                data=""
                                config={
                                    {
                                        ckfinder: {
                                            uploadUrl: 'http://localhost:3002/uploads'
                                        }
                                    }
                                }
                                // onReady={editor => {
                                //     // You can store the "editor" and use when it is needed.
                                //     console.log('Editor is ready to use!', editor);
                                // }}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    form.setFieldsValue({
                                        content: data
                                    })
                                    //console.log({ event, editor, data });
                                    // console.log({ data })
                                }}
                            // onBlur={(event, editor) => {
                            //     console.log('Blur.', editor);
                            // }}
                            // onFocus={(event, editor) => {
                            //     console.log('Focus.', editor);
                            // }}
                            />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit" onClick={() => { }} style={{ 'marginRight': '8px', 'background': '#030852' }}>
                                บันทึก
                            </Button>
                            <Button htmlType="button" onClick={() => { form.resetFields() }} style={{ 'marginLeft': '8px' }}>
                                ยกเลิก
                            </Button>
                        </Form.Item>
                    </Form>
                </Spin>
            </Content>
        </Layout>
    </Layout>;
};

export default AddArticlePage;

const Wrapper = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    width:85vw;
    margin-left:20rem;
    margin-right:3rem;
    margin-top:3rem;
`