import axios from "axios";
import React, { useContext, useEffect, useReducer, useState } from "react";
import reducer from '../reducers/auth_reducer'
import { url } from '../utils/api';
// import {
//     ACTION_NAME
// } from '../actions'

const initialState = {
    first_name: '',
    last_name: '',
    user_id: ''
}

const AuthContext = React.createContext()

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [loading, setLoading] = useState(false)
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
                    //console.log('res', res);
                    const { user } = res.data.result
                    dispatch({ type: 'GET_USER_INFO', payload: user })
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
    useEffect(() => {
        fetchUserInfo()
    }, [])
    return (
        <AuthContext.Provider value={{ ...state, fetchUserInfo }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    return useContext(AuthContext)
}