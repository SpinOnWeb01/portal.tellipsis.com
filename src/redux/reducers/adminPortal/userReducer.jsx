import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    USER_ROLE_REQUEST,
    USER_ROLE_SUCCESS,
    USER_ROLE_FAIL,
    ALL_USERS_RESET,
    UPDATE_USER_STATUS_REQUEST,
    UPDATE_USER_STATUS_SUCCESS,
    UPDATE_USER_STATUS_FAIL
} from "../../constants/adminPortal/userConstants";

export const userReducer = (state = { user: {} }, action) => {

    switch (action.type) {
        case LOGIN_REQUEST:
        case LOAD_USER_REQUEST:
        // case REGISTER_USER_REQUEST:

            return {
                loading: true,
                isAuthenticated: false
            }

        case LOGIN_SUCCESS:
        case LOAD_USER_SUCCESS:
        // case REGISTER_USER_SUCCESS:

            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            }

        case LOGOUT_SUCCESS:
            
            return {
                loading: false,
                user: null,
                isAuthenticated: false,
                successMessage: action.payload
            }

         case LOGIN_FAIL:
        // case REGISTER_USER_FAIL:
           
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }

        case LOAD_USER_FAIL:
            
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload,
            };

        case LOGOUT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }



        default:
            return state;
    }

}

export const allUserReducers = (state = { users: [], loading: false, error: null }, action) => {

    switch (action.type) {
        case ALL_USERS_REQUEST:

            return {
                ...state,
                loading: true,
                error: null,
            }
        case ALL_USERS_SUCCESS:

            return {
                ...state,
                loading: false,
                users: action.payload,
                error: null,
            }
        case ALL_USERS_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload

            }
            case ALL_USERS_RESET:
            return {
                users: [],
                loading: false,
                error: null,
            };

        default:
            return state
    }

}

export const userRoleReducers = (state = { users: [] }, action) => {

    switch (action.type) {
        case USER_ROLE_REQUEST:

            return {
                ...state,
                loading: true,
            }
        case USER_ROLE_SUCCESS:

            return {
                ...state,
                loading: false,
                users: action.payload
            }
        case USER_ROLE_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload

            }

        default:
            return state
    }

}


export const updateUserReducer = (state = {}, action) => {

    switch (action.type) {
        case UPDATE_USER_REQUEST:

            return {
                ...state,

                loading: true,
            }
        case UPDATE_USER_SUCCESS:

            return {
                ...state,
                loading: false,

                isUpdated: action.payload,
                message: action.payload
            }
        case UPDATE_USER_FAIL:

            return {

                loading: false,

                error: action.payload,
            }

        default:
            return state
    }
}

export const createUserReducer = (state = {}, action) => {

    switch (action.type) {
        case REGISTER_USER_REQUEST:

            return {
                ...state,

                loading: true,
            }
        case REGISTER_USER_SUCCESS:

            return {
                ...state,
                loading: false,

                isCreated: action.payload,
                message: action.payload.message
            }
        case REGISTER_USER_FAIL:

            return {

                loading: false,

                error: action.payload,
            }

        default:
            return state
    }
}

export const deleteUserReducer = (state = {}, action) => {

    switch (action.type) {
        case DELETE_USER_REQUEST:

            return {
                ...state,

                loading: true,
            }
        case DELETE_USER_SUCCESS:

            return {
                ...state,
                loading: false,

                isDeleted: action.payload,
                message: action.payload.message
            }
        case DELETE_USER_FAIL:

            return {

                loading: false,

                error: action.payload,
            }

        default:
            return state
    }
}

export const updateUserStatusReducer = (state = {}, action) => {

    switch (action.type) {
        case UPDATE_USER_STATUS_REQUEST:

            return {
                ...state,

                loading: true,
            }
        case UPDATE_USER_STATUS_SUCCESS:

            return {
                ...state,
                loading: false,

                isUpdated: action.payload,
                message: action.payload
            }
        case UPDATE_USER_STATUS_FAIL:

            return {

                loading: false,

                error: action.payload,
            }

        default:
            return state
    }
}