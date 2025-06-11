import { CREATE_MANAGE_EXTENSION_FAIL, CREATE_MANAGE_EXTENSION_REQUEST, CREATE_MANAGE_EXTENSION_SUCCESS, DELETE_MANAGE_EXTENSION_FAIL, DELETE_MANAGE_EXTENSION_REQUEST, DELETE_MANAGE_EXTENSION_SUCCESS, GET_MANAGE_EXTENSION_FAIL, GET_MANAGE_EXTENSION_REQUEST, GET_MANAGE_EXTENSION_SUCCESS, GET_MANAGE_PROFILE_EXTENSION_FAIL, GET_MANAGE_PROFILE_EXTENSION_REQUEST, GET_MANAGE_PROFILE_EXTENSION_SUCCESS, UPDATE_MANAGE_EXTENSION_FAIL, UPDATE_MANAGE_EXTENSION_REQUEST, UPDATE_MANAGE_EXTENSION_SUCCESS } from "../../constants/managePortal/managePortal_extensionConstants"

export const allManageExtensionReducers = (state = { allManageExtension: [] }, action) => {

    switch (action.type) {
        case GET_MANAGE_EXTENSION_REQUEST:

            return {
                ...state,
                loading: true,
            }
        case GET_MANAGE_EXTENSION_SUCCESS:

            return {
                ...state,
                loading: false,
                allmanageextension: action.payload
            }
        case GET_MANAGE_EXTENSION_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload

            }

        default:
            return state
    }

}

export const getManageProfileExtensionReducers = (state = { getManageProfileExtension: [] }, action) => {

    switch (action.type) {
        case GET_MANAGE_PROFILE_EXTENSION_REQUEST:

            return {
                ...state,
                loading: true,
            }
        case GET_MANAGE_PROFILE_EXTENSION_SUCCESS:

            return {
                ...state,
                loading: false,
                getManageProfileExtension: action.payload
            }
        case GET_MANAGE_PROFILE_EXTENSION_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload

            }

        default:
            return state
    }

}

export const createManageExtensionReducer = (state = { user: {} }, action) => {

    switch (action.type) {
         case CREATE_MANAGE_EXTENSION_REQUEST:

        return {
            ...state,
            loading: true,
        }
    case CREATE_MANAGE_EXTENSION_SUCCESS:

        return {
            ...state,
            loading: false,
            extension: action.payload
        }
    case CREATE_MANAGE_EXTENSION_FAIL:

        return {
            ...state,
            loading: false,
            error: action.payload

        }

        default:
            return state;
    }

}

export const updateManageExtensionReducer = (state = { user: {} }, action) => {

    switch (action.type) {
         case UPDATE_MANAGE_EXTENSION_REQUEST:

        return {
            ...state,
            loading: true,
        }
    case UPDATE_MANAGE_EXTENSION_SUCCESS:

        return {
            ...state,
            loading: false,
            extension: action.payload
        }
    case UPDATE_MANAGE_EXTENSION_FAIL:

        return {
            ...state,
            loading: false,
            error: action.payload

        }

        default:
            return state;
    }

}
export const deleteManageExtensionReducer = (state = {}, action) => {

    switch (action.type) {
        case DELETE_MANAGE_EXTENSION_REQUEST:

            return {
                ...state,

                loading: true,
            }
        case DELETE_MANAGE_EXTENSION_SUCCESS:

            return {
                ...state,
                loading: false,

                isDeleted: action.payload,
                message: action.payload.message
            }
        case DELETE_MANAGE_EXTENSION_FAIL:

            return {

                loading: false,

                error: action.payload,
            }

        default:
            return state
    }
}