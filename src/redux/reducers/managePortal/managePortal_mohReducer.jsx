import { CREATE_MANAGE_MOH_FAIL, CREATE_MANAGE_MOH_REQUEST, CREATE_MANAGE_MOH_SUCCESS, GET_MANAGE_MOH_FAIL, GET_MANAGE_MOH_REQUEST, GET_MANAGE_MOH_SUCCESS, UPDATE_MANAGE_MOH_FAIL, UPDATE_MANAGE_MOH_REQUEST, UPDATE_MANAGE_MOH_SUCCESS } from "../../constants/managePortal/managePortal_mohConstants"

export const getManageMohReducers = (state = { users: [] }, action) => {

    switch (action.type) {
        case GET_MANAGE_MOH_REQUEST:

            return {
                ...state,
                loading: true,
            }
        case GET_MANAGE_MOH_SUCCESS:

            return {
                ...state,
                loading: false,
                getMoh: action.payload
            }
        case GET_MANAGE_MOH_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload

            }

        default:
            return state
    }

}
export const createManageMohReducer = (state = { user: {} }, action) => {

    switch (action.type) {
         case CREATE_MANAGE_MOH_REQUEST:

        return {
            ...state,
            loading: true,
        }
    case CREATE_MANAGE_MOH_SUCCESS:

        return {
            ...state,
            loading: false,
            moh: action.payload
        }
    case CREATE_MANAGE_MOH_FAIL:

        return {
            ...state,
            loading: false,
            error: action.payload

        }

        default:
            return state;
    }

}

export const updateManageMohReducer = (state = { user: {} }, action) => {

    switch (action.type) {
         case UPDATE_MANAGE_MOH_REQUEST:

        return {
            ...state,
            loading: true,
        }
    case UPDATE_MANAGE_MOH_SUCCESS:

        return {
            ...state,
            loading: false,
            updateMoh: action.payload
        }
    case UPDATE_MANAGE_MOH_FAIL:

        return {
            ...state,
            loading: false,
            error: action.payload

        }

        default:
            return state;
    }

}