import { CREATE_ADMIN_ACL_FAIL, CREATE_ADMIN_ACL_REQUEST, CREATE_ADMIN_ACL_SUCCESS, DELETE_ADMIN_ACL_FAIL, DELETE_ADMIN_ACL_REQUEST, DELETE_ADMIN_ACL_SUCCESS, GET_ADMIN_ACL_FAIL, GET_ADMIN_ACL_REQUEST, GET_ADMIN_ACL_SUCCESS, UPDATE_ADMIN_ACL_FAIL, UPDATE_ADMIN_ACL_REQUEST, UPDATE_ADMIN_ACL_SUCCESS } from "../../constants/adminPortal/adminPortal_aclConstants"

export const getAdminAclReducers = (state = { users: [] }, action) => {

    switch (action.type) {
        case GET_ADMIN_ACL_REQUEST:

            return {
                ...state,
                loading: true,
            }
        case GET_ADMIN_ACL_SUCCESS:

            return {
                ...state,
                loading: false,
                acl: action.payload
            }
        case GET_ADMIN_ACL_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload

            }

        default:
            return state
    }

}

export const createAdminAclReducer = (state = { user: {} }, action) => {

    switch (action.type) {
         case CREATE_ADMIN_ACL_REQUEST:

        return {
            ...state,
            loading: true,
        }
    case CREATE_ADMIN_ACL_SUCCESS:

        return {
            ...state,
            loading: false,
            acl: action.payload
        }
    case CREATE_ADMIN_ACL_FAIL:

        return {
            ...state,
            loading: false,
            error: action.payload

        }

        default:
            return state;
    }

}

export const updateAdminAclReducer = (state = { user: {} }, action) => {

    switch (action.type) {
         case UPDATE_ADMIN_ACL_REQUEST:

        return {
            ...state,
            loading: true,
        }
    case UPDATE_ADMIN_ACL_SUCCESS:

        return {
            ...state,
            loading: false,
            updateAcl: action.payload
        }
    case UPDATE_ADMIN_ACL_FAIL:

        return {
            ...state,
            loading: false,
            error: action.payload

        }

        default:
            return state;
    }

}

export const deleteAdminAclReducer = (state = { user: {} }, action) => {

    switch (action.type) {
         case DELETE_ADMIN_ACL_REQUEST:

        return {
            ...state,
            loading: true,
        }
    case DELETE_ADMIN_ACL_SUCCESS:

        return {
            ...state,
            loading: false,
            deleteAcl: action.payload
        }
    case DELETE_ADMIN_ACL_FAIL:

        return {
            ...state,
            loading: false,
            error: action.payload

        }

        default:
            return state;
    }

}