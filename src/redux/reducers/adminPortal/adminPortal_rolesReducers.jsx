import { CREATE_ADMIN_ROLES_FAIL, CREATE_ADMIN_ROLES_REQUEST, CREATE_ADMIN_ROLES_SUCCESS, GET_ADMIN_ROLES_FAIL, GET_ADMIN_ROLES_REQUEST, GET_ADMIN_ROLES_SUCCESS, UPDATE_ADMIN_ROLES_FAIL, UPDATE_ADMIN_ROLES_REQUEST, UPDATE_ADMIN_ROLES_SUCCESS } from "../../constants/adminPortal/adminPortal_rolesConstants"

export const getAdminRolesReducers = (state = { users: [] }, action) => {

    switch (action.type) {
        case GET_ADMIN_ROLES_REQUEST:

            return {
                ...state,
                loading: true,
            }
        case GET_ADMIN_ROLES_SUCCESS:

            return {
                ...state,
                loading: false,
                roles: action.payload
            }
        case GET_ADMIN_ROLES_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload

            }

        default:
            return state
    }

}

export const createAdminRolesReducer = (state = { user: {} }, action) => {

    switch (action.type) {
         case CREATE_ADMIN_ROLES_REQUEST:

        return {
            ...state,
            loading: true,
        }
    case CREATE_ADMIN_ROLES_SUCCESS:

        return {
            ...state,
            loading: false,
            roles: action.payload
        }
    case CREATE_ADMIN_ROLES_FAIL:

        return {
            ...state,
            loading: false,
            error: action.payload

        }

        default:
            return state;
    }

}

export const updateAdminRolesReducer = (state = { user: {} }, action) => {

    switch (action.type) {
         case UPDATE_ADMIN_ROLES_REQUEST:

        return {
            ...state,
            loading: true,
        }
    case UPDATE_ADMIN_ROLES_SUCCESS:

        return {
            ...state,
            loading: false,
            updateRoles: action.payload
        }
    case UPDATE_ADMIN_ROLES_FAIL:

        return {
            ...state,
            loading: false,
            error: action.payload

        }

        default:
            return state;
    }

}