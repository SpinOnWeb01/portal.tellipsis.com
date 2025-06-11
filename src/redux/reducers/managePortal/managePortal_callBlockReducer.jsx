import { CREATE_MANAGE_CALL_BLOCK_FAIL, CREATE_MANAGE_CALL_BLOCK_REQUEST, CREATE_MANAGE_CALL_BLOCK_SUCCESS, DELETE_MANAGE_CALL_BLOCK_FAIL, DELETE_MANAGE_CALL_BLOCK_REQUEST, DELETE_MANAGE_CALL_BLOCK_SUCCESS, GET_MANAGE_CALL_BLOCK_FAIL, GET_MANAGE_CALL_BLOCK_REQUEST, GET_MANAGE_CALL_BLOCK_SUCCESS, UPDATE_MANAGE_CALL_BLOCK_FAIL, UPDATE_MANAGE_CALL_BLOCK_REQUEST, UPDATE_MANAGE_CALL_BLOCK_SUCCESS } from "../../constants/managePortal/managePortal_callBlockConstants"

export const getManageCallBlockReducers = (state = { users: [] }, action) => {

    switch (action.type) {
        case GET_MANAGE_CALL_BLOCK_REQUEST:

            return {
                ...state,
                loading: true,
            }
        case GET_MANAGE_CALL_BLOCK_SUCCESS:

            return {
                ...state,
                loading: false,
                getCallBlock: action.payload
            }
        case GET_MANAGE_CALL_BLOCK_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload

            }

        default:
            return state
    }

}

export const createManageCallBlockReducer = (state = { user: {} }, action) => {

    switch (action.type) {
         case CREATE_MANAGE_CALL_BLOCK_REQUEST:

        return {
            ...state,
            loading: true,
        }
    case CREATE_MANAGE_CALL_BLOCK_SUCCESS:

        return {
            ...state,
            loading: false,
            callBlock: action.payload
        }
    case CREATE_MANAGE_CALL_BLOCK_FAIL:

        return {
            ...state,
            loading: false,
            error: action.payload

        }

        default:
            return state;
    }

}

export const updateManageCallBlockReducer = (state = { user: {} }, action) => {

    switch (action.type) {
         case UPDATE_MANAGE_CALL_BLOCK_REQUEST:

        return {
            ...state,
            loading: true,
        }
    case UPDATE_MANAGE_CALL_BLOCK_SUCCESS:

        return {
            ...state,
            loading: false,
            updateCallBlock: action.payload
        }
    case UPDATE_MANAGE_CALL_BLOCK_FAIL:

        return {
            ...state,
            loading: false,
            error: action.payload

        }

        default:
            return state;
    }

}

export const deleteManageCallBlockReducer = (state = {}, action) => {

    switch (action.type) {
        case DELETE_MANAGE_CALL_BLOCK_REQUEST:

            return {
                ...state,

                loading: true,
            }
        case DELETE_MANAGE_CALL_BLOCK_SUCCESS:

            return {
                ...state,
                loading: false,

                isDeleted: action.payload,
                message: action.payload.message
            }
        case DELETE_MANAGE_CALL_BLOCK_FAIL:

            return {

                loading: false,

                error: action.payload,
            }

        default:
            return state
    }
}
