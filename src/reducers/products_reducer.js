import {
    ACTION_NAME
} from '../actions'

const products_reducer = (state, action) => {
    if (action.type === ACTION_NAME) {
        return { ...state, }
    }
    return state
}

export default products_reducer