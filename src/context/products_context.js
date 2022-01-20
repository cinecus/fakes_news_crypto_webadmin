import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import reducer from '../reducers/products_reducer'

import {
    ACTION_NAME
} from '../actions'

const initialState = {
    products_loading: false,
    products: [],
    single_product: {}
}

const ProductsContext = React.createContext()

export const ProductsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const fnAction = () => {
        dispatch({ type: ACTION_NAME })
    }
    const fetchFn = async (url) => {
        dispatch({ type: 'LOADING' })
        try {
            const response = await axios.get(url)
            const data = await response.data
            dispatch({ type: 'GET_DATA', payload: data })
        } catch (error) {
            dispatch({ type: 'ERROR' })
        }
    }

    return (
        <ProductsContext.Provider value={{ ...state, fnAction, fetchFn }}>
            {children}
        </ProductsContext.Provider>
    )
}

export const useProductsContext = () => {
    return useContext(ProductsContext)
}