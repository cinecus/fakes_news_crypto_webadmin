import {
    ACTION_NAME
} from '../actions'

const article_reducer = (state, action) => {
    if (action.type === 'GET_ALL_ARTICLE') {
        return { ...state, article: action.payload }
    }
    if (action.type === 'GET_SINGLE_ARTICLE') {
        // console.log('state.article', state.article);
        const find_article = state.article.find(el => el._id === action.payload)
        return { ...state, single_article: find_article }
    }
    return state
}

export default article_reducer