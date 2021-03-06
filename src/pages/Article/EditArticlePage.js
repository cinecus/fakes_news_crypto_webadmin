import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
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
    Modal,
    Image
} from 'antd';
import axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { url } from '../../utils/api'
import { useArticleContext } from '../../context/article_context';
import { useParams } from 'react-router-dom';

const { Content } = Layout
const { Option } = Select

const EditArticlePage = () => {
    //const { single_article, getSingleArticle, fetchAllArticle, article } = useArticleContext()
    const { article_id } = useParams()
    const [article, setArticle] = useState({})
    const editorRef = useRef(null);
    const [loading, setLoading] = useState(false)
    const [tags, setTags] = useState([])
    const [form] = Form.useForm()
    const [categories, setCategories] = useState(['Bitcoin', 'Altcoin', 'Other'].map((el, i) => {
        return <Option key={i} value={el}>{el}</Option>
    }))
    const token_id = localStorage.getItem('token_id')
    let navigate = useNavigate();

    useEffect(async () => {
        await fetchArticleById()
        await fetchAllTag()

    }, [])
    useEffect(() => {
        form.setFieldsValue({ name: article.name })
        form.setFieldsValue({ category: article.category })
        form.setFieldsValue({ tag: article.tag })
        form.setFieldsValue({ is_show: article.is_show })
        form.setFieldsValue({ content: article.content })
    }, [article])

    const errorModal = (message) => {
        Modal.error({
            title: 'Error Message',
            content: message
        });
    }

    const onChangeForm = (e) => {
        const value = e.target.value
        const name = e.target.name
        form.setFieldsValue({
            [name]: value
        })
    }
    const formData = new FormData()

    const fetchArticleById = async () => {
        setLoading(true)
        try {
            const config = {
                method: 'get',
                url: `${url}article/getSingleArticleTable?article_id=${article_id}`,
                headers: { 'Authorization': token_id },
            }
            axios(config)
                .then((res) => {
                    setArticle(res.data.result)
                    setLoading(false)
                })
        } catch (error) {
            console.log('error', error);
            setLoading(false)
        }
    }

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
                    const tag = res.data.result.map(el => (<Option key={el.tag_name} value={el.tag_name}>{el.tag_name}</Option>))
                    setTags(tag)
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

    const onFinish = (values) => {
        setLoading(true)
        try {
            // console.log('values', values);
            //formData.append('image_cover', form.getFieldValue('image_cover'))
            formData.append('name', values.name)
            formData.append('category', values.category)
            values.tag.map((el, i) => {
                formData.append(`tag[${i}]`, el)
            })
            formData.append('is_show', values.is_show)
            formData.append('content', values.content)
            if (values.image_cover) {
                formData.append('image_cover', values.image_cover.file.originFileObj)
            }
            formData.append('article_id', article_id)
            const config = {
                method: 'post',
                heads: {
                    'content-type': 'multipart/form-data'
                },
                url: `${url}article/editArticle`,
                headers: { 'Authorization': token_id },
                data: formData,
            }
            // console.log('form', formData);
            axios(config)
                .then((res) => {
                    setLoading(false)
                    info()
                    navigate(`/allarticle`)
                    form.resetFields()
                })
                .catch((error) => {
                    setLoading(false)
                    errorModal(error.response.data.message)
                    console.log('error', error)
                })
        } catch (error) {
            setLoading(false)
            console.log('error', error);
            errorModal()
        }

    };
    const info = () => {
        Modal.info({
            title: 'Notification Message',
            content: (
                <div>
                    ???????????????????????????????????????????????????
                </div>
            )
        });
    }

    if (loading) return <Spin></Spin>

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
                        // onValuesChange={e => {
                        //     console.log(e);
                        // }}
                        onFinish={onFinish}
                    >
                        <Form.Item label="??????????????????????????????" name='name' onChange={(e) => onChangeForm(e)} rules={[{ required: true }]} >
                            <Input />
                        </Form.Item>
                        <Form.Item label="Category" name='category'
                            onChange={(e) => onChangeForm(e)} rules={[{ required: true }]} >
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
                        <Form.Item label="???????????????????????????" name="image_cover">
                            <Upload listType="picture">
                                <Button icon={<UploadOutlined />}>Upload Image</Button>
                            </Upload>
                        </Form.Item>

                        <Form.Item label='???????????????????????????????????????'>
                            <Image
                                width={200}
                                style={{ 'marginTop': '1rem', }}
                                src={article.image_cover_uri}
                            />
                        </Form.Item>

                        <Form.Item label="????????????/????????????" valuePropName="checked" name='is_show'
                            onChange={(e) => onChangeForm(e)} rules={[{ required: true }]}>
                            <Switch />
                        </Form.Item>
                        {!loading &&
                            <Form.Item label="???????????????????????????????????????" name='content' onChange={() => { }} rules={[{ required: true }]}>
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
                                    onReady={editor => {
                                        //console.log('articke.content', article.content)
                                        editor.setData(article.content)
                                        // editor.setData('test');
                                        // console.log('Editor is ready to use!', editor);
                                    }}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        form.setFieldsValue({
                                            content: data
                                        })
                                        // console.log({ event, editor, data });
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
                        }
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit" style={{ 'marginRight': '8px', 'background': '#030852' }}>
                                ??????????????????
                            </Button>
                            <Button htmlType="button" onClick={() => { navigate('/allarticle') }} style={{ 'marginLeft': '8px' }}>
                                ????????????????????????
                            </Button>
                        </Form.Item>
                    </Form>
                </Spin>
            </Content>
        </Layout>
    </Layout>;
};

export default EditArticlePage;

const Wrapper = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    width:85vw;
    margin-left:20rem;
    margin-right:3rem;
    margin-top:3rem;
`