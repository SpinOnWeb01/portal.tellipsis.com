import { GET_ADMIN_RESELLERS_FAIL, GET_ADMIN_RESELLERS_REQUEST, GET_ADMIN_RESELLERS_SUCCESS, GET_ADMIN_USERS_FAIL, GET_ADMIN_USERS_REQUEST, GET_ADMIN_USERS_SUCCESS, GET_RESELLER_REMAINING_MINUTES_FAIL, GET_RESELLER_REMAINING_MINUTES_REQUEST, GET_RESELLER_REMAINING_MINUTES_SUCCESS, GET_RESELLER_USERS_FAIL, GET_RESELLER_USERS_REQUEST, GET_RESELLER_USERS_SUCCESS } from "../../constants/adminPortal/adminPortal_listConstants"

export const getAdminUsersListReducers = (state = { users: [] }, action) => {

    switch (action.type) {
        case GET_ADMIN_USERS_REQUEST:

            return {
                ...state,
                loading: true,
            }
        case GET_ADMIN_USERS_SUCCESS:

            return {
                ...state,
                loading: false,
                userList: action.payload
            }
        case GET_ADMIN_USERS_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload

            }

        default:
            return state
    }

}

export const getAdminResellersListReducers = (state = { users: [] }, action) => {

    switch (action.type) {
        case GET_ADMIN_RESELLERS_REQUEST:

            return {
                ...state,
                loading: true,
            }
        case GET_ADMIN_RESELLERS_SUCCESS:

            return {
                ...state,
                loading: false,
                resellerList: action.payload
            }
        case GET_ADMIN_RESELLERS_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload

            }

        default:
            return state
    }

}

export const getResellerUsersListReducers = (state = { users: [] }, action) => {

    switch (action.type) {
        case GET_RESELLER_USERS_REQUEST:

            return {
                ...state,
                loading: true,
            }
        case GET_RESELLER_USERS_SUCCESS:

            return {
                ...state,
                loading: false,
                userList: action.payload
            }
        case GET_RESELLER_USERS_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload

            }

        default:
            return state
    }

}

export const getResellerRemainingMinutesReducers = (state = { users: [] }, action) => {

    switch (action.type) {
        case GET_RESELLER_REMAINING_MINUTES_REQUEST:

            return {
                ...state,
                loading: true,
            }
        case GET_RESELLER_REMAINING_MINUTES_SUCCESS:

            return {
                ...state,
                loading: false,
                remainingMinutes: action.payload
            }
        case GET_RESELLER_REMAINING_MINUTES_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload

            }

        default:
            return state
    }

}