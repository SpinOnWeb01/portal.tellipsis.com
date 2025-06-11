import { ALL_RESELLER_USERS_FAIL, ALL_RESELLER_USERS_REQUEST, ALL_RESELLER_USERS_RESET, ALL_RESELLER_USERS_SUCCESS, DELETE_RESELLER_USER_FAIL, DELETE_RESELLER_USER_REQUEST, DELETE_RESELLER_USER_SUCCESS, LOAD_RESELLER_USER_FAIL, LOAD_RESELLER_USER_REQUEST, LOAD_RESELLER_USER_SUCCESS, REGISTER_RESELLER_USER_FAIL, REGISTER_RESELLER_USER_REQUEST, REGISTER_RESELLER_USER_SUCCESS, RESELLER_LOGIN_FAIL, RESELLER_LOGIN_REQUEST, RESELLER_LOGIN_SUCCESS, RESELLER_LOGOUT_FAIL, RESELLER_LOGOUT_SUCCESS, UPDATE_RESELLER_USER_FAIL, UPDATE_RESELLER_USER_REQUEST, UPDATE_RESELLER_USER_SUCCESS, USER_RESELLER_ROLE_FAIL, USER_RESELLER_ROLE_REQUEST, USER_RESELLER_ROLE_SUCCESS } from "../../constants/resellerPortal/resellerPortal_usersConstants";

export const userResellerReducer = (state = { user: {} }, action) => {

    switch (action.type) {
        case RESELLER_LOGIN_REQUEST:
        case LOAD_RESELLER_USER_REQUEST:
        // case REGISTER_USER_REQUEST:

            return {
                loading: true,
                isAuthenticated: false
            }

        case RESELLER_LOGIN_SUCCESS:
        case LOAD_RESELLER_USER_SUCCESS:
        // case REGISTER_USER_SUCCESS:

            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            }

        case RESELLER_LOGOUT_SUCCESS:
            
            return {
                loading: false,
                user: null,
                isAuthenticated: false,
                successMessage: action.payload
            }

         case RESELLER_LOGIN_FAIL:
        // case REGISTER_USER_FAIL:
           
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }

        case LOAD_RESELLER_USER_FAIL:
            
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload,
            };

        case RESELLER_LOGOUT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }



        default:
            return state;
    }

}

export const allUserResellerReducers = (state = { users: [], loading: false, error: null }, action) => {

    switch (action.type) {
        case ALL_RESELLER_USERS_REQUEST:

            return {
                ...state,
                loading: true,
                error: null,
            }
        case ALL_RESELLER_USERS_SUCCESS:

            return {
                ...state,
                loading: false,
                users: action.payload,
                error: null,
            }
        case ALL_RESELLER_USERS_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload

            }
            case ALL_RESELLER_USERS_RESET:
            return {
                users: [],
                loading: false,
                error: null,
            };

        default:
            return state
    }

}

export const userRoleResellerReducers = (state = { users: [] }, action) => {

    switch (action.type) {
        case USER_RESELLER_ROLE_REQUEST:

            return {
                ...state,
                loading: true,
            }
        case USER_RESELLER_ROLE_SUCCESS:

            return {
                ...state,
                loading: false,
                users: action.payload
            }
        case USER_RESELLER_ROLE_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload

            }

        default:
            return state
    }

}


export const updateUserResellerReducer = (state = {}, action) => {

    switch (action.type) {
        case UPDATE_RESELLER_USER_REQUEST:

            return {
                ...state,

                loading: true,
            }
        case UPDATE_RESELLER_USER_SUCCESS:

            return {
                ...state,
                loading: false,

                isUpdated: action.payload,
                message: action.payload
            }
        case UPDATE_RESELLER_USER_FAIL:

            return {

                loading: false,

                error: action.payload,
            }

        default:
            return state
    }
}

export const createUserResellerReducer = (state = {}, action) => {

    switch (action.type) {
        case REGISTER_RESELLER_USER_REQUEST:

            return {
                ...state,

                loading: true,
            }
        case REGISTER_RESELLER_USER_SUCCESS:

            return {
                ...state,
                loading: false,

                isCreated: action.payload,
                message: action.payload.message
            }
        case REGISTER_RESELLER_USER_FAIL:

            return {

                loading: false,

                error: action.payload,
            }

        default:
            return state
    }
}

export const deleteUserResellerReducer = (state = {}, action) => {

    switch (action.type) {
        case DELETE_RESELLER_USER_REQUEST:

            return {
                ...state,

                loading: true,
            }
        case DELETE_RESELLER_USER_SUCCESS:

            return {
                ...state,
                loading: false,

                isDeleted: action.payload,
                message: action.payload.message
            }
        case DELETE_RESELLER_USER_FAIL:

            return {

                loading: false,

                error: action.payload,
            }

        default:
            return state
    }
}