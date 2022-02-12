import {
    ACTION_NAME
} from '../actions'

const auth_reducer = (state, action) => {
    if (action.type == "GET_USER_INFO") {
        // console.log('action.payload.first_name', action.payload.first_name);
        return { ...state, first_name: action.payload.first_name, last_name: action.payload.last_name }
    }
    return state
}

export default auth_reducer