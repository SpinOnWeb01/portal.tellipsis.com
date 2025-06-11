import { CREATE_ADMIN_CALL_BLOCK_FAIL, CREATE_ADMIN_CALL_BLOCK_REQUEST, CREATE_ADMIN_CALL_BLOCK_SUCCESS, DELETE_ADMIN_CALL_BLOCK_FAIL, DELETE_ADMIN_CALL_BLOCK_REQUEST, DELETE_ADMIN_CALL_BLOCK_SUCCESS, GET_ADMIN_CALL_BLOCK_FAIL, GET_ADMIN_CALL_BLOCK_REQUEST, GET_ADMIN_CALL_BLOCK_SUCCESS, UPDATE_ADMIN_CALL_BLOCK_FAIL, UPDATE_ADMIN_CALL_BLOCK_REQUEST, UPDATE_ADMIN_CALL_BLOCK_SUCCESS } from "../../constants/adminPortal/adminPortal_callBlockConstants"

export const getAdminCallBlockReducers = (state = { users: [] }, action) => {

    switch (action.type) {
        case GET_ADMIN_CALL_BLOCK_REQUEST:

            return {
                ...state,
                loading: true,
            }
        case GET_ADMIN_CALL_BLOCK_SUCCESS:

            return {
                ...state,
                loading: false,
                getCallBlock: action.payload
            }
        case GET_ADMIN_CALL_BLOCK_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload

            }

        default:
            return state
    }

}

export const createAdminCallBlockReducer = (state = { user: {} }, action) => {

    switch (action.type) {
         case CREATE_ADMIN_CALL_BLOCK_REQUEST:

        return {
            ...state,
            loading: true,
        }
    case CREATE_ADMIN_CALL_BLOCK_SUCCESS:

        return {
            ...state,
            loading: false,
            callBlock: action.payload
        }
    case CREATE_ADMIN_CALL_BLOCK_FAIL:

        return {
            ...state,
            loading: false,
            error: action.payload

        }

        default:
            return state;
    }

}

export const updateAdminCallBlockReducer = (state = { user: {} }, action) => {

    switch (action.type) {
         case UPDATE_ADMIN_CALL_BLOCK_REQUEST:

        return {
            ...state,
            loading: true,
        }
    case UPDATE_ADMIN_CALL_BLOCK_SUCCESS:

        return {
            ...state,
            loading: false,
            updateCallBlock: action.payload
        }
    case UPDATE_ADMIN_CALL_BLOCK_FAIL:

        return {
            ...state,
            loading: false,
            error: action.payload

        }

        default:
            return state;
    }

}

export const deleteAdminCallBlockReducer = (state = {}, action) => {

    switch (action.type) {
        case DELETE_ADMIN_CALL_BLOCK_REQUEST:

            return {
                ...state,

                loading: true,
            }
        case DELETE_ADMIN_CALL_BLOCK_SUCCESS:

            return {
                ...state,
                loading: false,

                isDeleted: action.payload,
                message: action.payload.message
            }
        case DELETE_ADMIN_CALL_BLOCK_FAIL:

            return {

                loading: false,

                error: action.payload,
            }

        default:
            return state
    }
}
