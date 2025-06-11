import { CREATE_EXTENSION_FAIL, CREATE_EXTENSION_REQUEST, CREATE_EXTENSION_SUCCESS, DELETE_EXTENSION_FAIL, DELETE_EXTENSION_REQUEST, DELETE_EXTENSION_SUCCESS, GET_EXTENSION_FAIL, GET_EXTENSION_REQUEST, GET_EXTENSION_SUCCESS, UPDATE_EXTENSION_FAIL, UPDATE_EXTENSION_REQUEST, UPDATE_EXTENSION_SUCCESS } from "../../constants/adminPortal/extensionConstants"

export const allExtensionReducers = (state = { allExtension: [] }, action) => {

    switch (action.type) {
        case GET_EXTENSION_REQUEST:

            return {
                ...state,
                loading: true,
            }
        case GET_EXTENSION_SUCCESS:

            return {
                ...state,
                loading: false,
                allextension: action.payload
            }
        case GET_EXTENSION_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload

            }

        default:
            return state
    }

}

export const createExtensionReducer = (state = { user: {} }, action) => {

    switch (action.type) {
         case CREATE_EXTENSION_REQUEST:

        return {
            ...state,
            loading: true,
        }
    case CREATE_EXTENSION_SUCCESS:

        return {
            ...state,
            loading: false,
            extension: action.payload
        }
    case CREATE_EXTENSION_FAIL:

        return {
            ...state,
            loading: false,
            error: action.payload

        }

        default:
            return state;
    }

}

export const updateExtensionReducer = (state = { user: {} }, action) => {

    switch (action.type) {
         case UPDATE_EXTENSION_REQUEST:

        return {
            ...state,
            loading: true,
        }
    case UPDATE_EXTENSION_SUCCESS:

        return {
            ...state,
            loading: false,
            extension: action.payload
        }
    case UPDATE_EXTENSION_FAIL:

        return {
            ...state,
            loading: false,
            error: action.payload

        }

        default:
            return state;
    }

}

export const deleteAdminExtensionReducer = (state = {}, action) => {

    switch (action.type) {
        case DELETE_EXTENSION_REQUEST:

            return {
                ...state,

                loading: true,
            }
        case DELETE_EXTENSION_SUCCESS:

            return {
                ...state,
                loading: false,

                isDeleted: action.payload,
                message: action.payload.message
            }
        case DELETE_EXTENSION_FAIL:

            return {

                loading: false,

                error: action.payload,
            }

        default:
            return state
    }
}

