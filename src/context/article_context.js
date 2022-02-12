import axios from "axios";
import React, { useContext, useEffect, useReducer, useState } from "react";
import reducer from '../reducers/article_reducer'
import { url } from '../utils/api';
import {
    ACTION_NAME
} from '../actions'

const initialState = {
    article_loading: false,
    article: [],
    single_product: {}
}

const ArticleContext = React.createContext()

export const ArticleProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [loading, setLoading] = useState(false)

    const fetchAllArticle = async () => {
        setLoading(true)
        try {
            const config = {
                method: 'get',
                url: `${url}article/getArticleTable`
            }
            axios(config)
                .then((res) => {
                    const article = res.data.result
                    console.log(article);
                    dispatch({ type: 'GET_ALL_ARTICLE', payload: article })
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

    const getSingleArticle = async (id) => {
        try {
            setLoading(true)
            dispatch({ type: 'GET_SINGLE_ARTICLE', payload: id })
        } catch (error) {
            console.log('error', error);
            setLoading(false)
        }
    }

    // useEffect(() => {
    //     fetchAllArticle()
    // }, [])
    return (
        <ArticleContext.Provider value={{ ...state, getSingleArticle, fetchAllArticle }}>
            {children}
        </ArticleContext.Provider>
    )
}

export const useArticleContext = () => {
    return useContext(ArticleContext)
}