import { GET_ADMIN_ADD_MINUTE_FAIL, GET_ADMIN_ADD_MINUTE_REQUEST, GET_ADMIN_ADD_MINUTE_SUCCESS, GET_ADMIN_HISTORY_FAIL, GET_ADMIN_HISTORY_REQUEST, GET_ADMIN_HISTORY_SUCCESS, POST_ADMIN_ADD_MINUTE_FAIL, POST_ADMIN_ADD_MINUTE_REQUEST, POST_ADMIN_ADD_MINUTE_SUCCESS } from "../../constants/adminPortal/adminPortal_historyConstants"

export const getAdminHistoryReducers = (state = { users: [] }, action) => {

    switch (action.type) {
        case GET_ADMIN_HISTORY_REQUEST:

            return {
                ...state,
                loading: true,
            }
        case GET_ADMIN_HISTORY_SUCCESS:

            return {
                ...state,
                loading: false,
                getHistory: action.payload
            }
        case GET_ADMIN_HISTORY_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload

            }

        default:
            return state
    }

}

export const getAdminAddMinuteReducers = (state = { users: [] }, action) => {

    switch (action.type) {
        case GET_ADMIN_ADD_MINUTE_REQUEST:

            return {
                ...state,
                loading: true,
            }
        case GET_ADMIN_ADD_MINUTE_SUCCESS:

            return {
                ...state,
                loading: false,
                addMinute: action.payload
            }
        case GET_ADMIN_ADD_MINUTE_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload

            }

        default:
            return state
    }

}

export const postAdminAddMinuteReducers = (state = { users: [] }, action) => {

    switch (action.type) {
        case POST_ADMIN_ADD_MINUTE_REQUEST:

            return {
                ...state,
                loading: true,
            }
        case POST_ADMIN_ADD_MINUTE_SUCCESS:

            return {
                ...state,
                loading: false,
                addMinute: action.payload
            }
        case POST_ADMIN_ADD_MINUTE_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload

            }

        default:
            return state
    }

}