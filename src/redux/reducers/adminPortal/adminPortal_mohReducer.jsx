import { CREATE_ADMIN_MOH_FAIL, CREATE_ADMIN_MOH_REQUEST, CREATE_ADMIN_MOH_SUCCESS, GET_ADMIN_MOH_FAIL, GET_ADMIN_MOH_REQUEST, GET_ADMIN_MOH_SUCCESS, UPDATE_ADMIN_MOH_FAIL, UPDATE_ADMIN_MOH_REQUEST, UPDATE_ADMIN_MOH_SUCCESS } from "../../constants/adminPortal/adminPortal_mohConstants"

export const getAdminMohReducers = (state = { users: [] }, action) => {

    switch (action.type) {
        case GET_ADMIN_MOH_REQUEST:

            return {
                ...state,
                loading: true,
            }
        case GET_ADMIN_MOH_SUCCESS:

            return {
                ...state,
                loading: false,
                getMoh: action.payload
            }
        case GET_ADMIN_MOH_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload

            }

        default:
            return state
    }

}
export const createAdminMohReducer = (state = { user: {} }, action) => {

    switch (action.type) {
         case CREATE_ADMIN_MOH_REQUEST:

        return {
            ...state,
            loading: true,
        }
    case CREATE_ADMIN_MOH_SUCCESS:

        return {
            ...state,
            loading: false,
            moh: action.payload
        }
    case CREATE_ADMIN_MOH_FAIL:

        return {
            ...state,
            loading: false,
            error: action.payload

        }

        default:
            return state;
    }

}

export const updateAdminMohReducer = (state = { user: {} }, action) => {

    switch (action.type) {
         case UPDATE_ADMIN_MOH_REQUEST:

        return {
            ...state,
            loading: true,
        }
    case UPDATE_ADMIN_MOH_SUCCESS:

        return {
            ...state,
            loading: false,
            updateMoh: action.payload
        }
    case UPDATE_ADMIN_MOH_FAIL:

        return {
            ...state,
            loading: false,
            error: action.payload

        }

        default:
            return state;
    }

}