import { CREATE_ADMIN_MINUTES_FAIL, CREATE_ADMIN_MINUTES_REQUEST, CREATE_ADMIN_MINUTES_SUCCESS, GET_ADMIN_BILLING_MINUTES_FAIL, GET_ADMIN_BILLING_MINUTES_REQUEST, GET_ADMIN_BILLING_MINUTES_SUCCESS, GET_ADMIN_MINUTES_FAIL, GET_ADMIN_MINUTES_REQUEST, GET_ADMIN_MINUTES_SUCCESS, GET_ADMIN_TOTAL_MINUTES_FAIL, GET_ADMIN_TOTAL_MINUTES_REQUEST, GET_ADMIN_TOTAL_MINUTES_SUCCESS, UPDATE_ADMIN_MINUTES_FAIL, UPDATE_ADMIN_MINUTES_REQUEST, UPDATE_ADMIN_MINUTES_SUCCESS } from "../../constants/adminPortal/adminPortal_minutesConstants"

export const getAdminMinutesReducers = (state = { users: [] }, action) => {

    switch (action.type) {
        case GET_ADMIN_MINUTES_REQUEST:

            return {
                ...state,
                loading: true,
            }
        case GET_ADMIN_MINUTES_SUCCESS:

            return {
                ...state,
                loading: false,
                adminminutes: action.payload
            }
        case GET_ADMIN_MINUTES_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload

            }

        default:
            return state
    }

}

export const updateAdminMinutesReducer = (state = { user: {} }, action) => {

    switch (action.type) {
         case UPDATE_ADMIN_MINUTES_REQUEST:

        return {
            ...state,
            loading: true,
        }
    case UPDATE_ADMIN_MINUTES_SUCCESS:

        return {
            ...state,
            loading: false,
            updateAdminMinutes: action.payload
        }
    case UPDATE_ADMIN_MINUTES_FAIL:

        return {
            ...state,
            loading: false,
            error: action.payload

        }

        default:
            return state;
    }

}

export const createAdminMinutesReducer = (state = { user: {} }, action) => {

    switch (action.type) {
         case CREATE_ADMIN_MINUTES_REQUEST:

        return {
            ...state,
            loading: true,
        }
    case CREATE_ADMIN_MINUTES_SUCCESS:

        return {
            ...state,
            loading: false,
            minutes: action.payload
        }
    case CREATE_ADMIN_MINUTES_FAIL:

        return {
            ...state,
            loading: false,
            error: action.payload

        }

        default:
            return state;
    }

}

export const getAdminBillingMinutesReducers = (state = { users: [] }, action) => {

    switch (action.type) {
        case GET_ADMIN_BILLING_MINUTES_REQUEST:

            return {
                ...state,
                loading: true,
            }
        case GET_ADMIN_BILLING_MINUTES_SUCCESS:

            return {
                ...state,
                loading: false,
                billingminutes: action.payload
            }
        case GET_ADMIN_BILLING_MINUTES_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload

            }

        default:
            return state
    }

}

export const getAdminTotalMinutesReducers = (state = { users: [] }, action) => {

    switch (action.type) {
        case GET_ADMIN_TOTAL_MINUTES_REQUEST:

            return {
                ...state,
                loading: true,
            }
        case GET_ADMIN_TOTAL_MINUTES_SUCCESS:

            return {
                ...state,
                loading: false,
                totalMinutes: action.payload
            }
        case GET_ADMIN_TOTAL_MINUTES_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload

            }

        default:
            return state
    }

}


