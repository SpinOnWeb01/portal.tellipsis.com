import { CREATE_DESTINATION_FAIL, CREATE_DESTINATION_REQUEST, CREATE_DESTINATION_SUCCESS, GET_DID_FAIL, GET_DID_REQUEST, GET_DID_SUCCESS, UPDATE_ADMIN_SUSPEND_DESTINATION_FAIL, UPDATE_ADMIN_SUSPEND_DESTINATION_REQUEST, UPDATE_ADMIN_SUSPEND_DESTINATION_SUCCESS, UPDATE_DESTINATION_FAIL, UPDATE_DESTINATION_REQUEST, UPDATE_DESTINATION_SUCCESS } from "../../constants/adminPortal/destinationConstants"

export const allDidReducers = (state = { allDid: [] }, action) => {

    switch (action.type) {
        case GET_DID_REQUEST:

            return {
                ...state,
                loading: true,
            }
        case GET_DID_SUCCESS:

            return {
                ...state,
                loading: false,
                alldid: action.payload
            }
        case GET_DID_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload

            }

        default:
            return state
    }

}

export const createDestinationReducer = (state = { user: {} }, action) => {

    switch (action.type) {
         case CREATE_DESTINATION_REQUEST:

        return {
            ...state,
            loading: true,
        }
    case CREATE_DESTINATION_SUCCESS:

        return {
            ...state,
            loading: false,
            destination: action.payload
        }
    case CREATE_DESTINATION_FAIL:

        return {
            ...state,
            loading: false,
            error: action.payload

        }

        default:
            return state;
    }

}

export const updateDestinationReducer = (state = { user: {} }, action) => {

    switch (action.type) {
         case UPDATE_DESTINATION_REQUEST:

        return {
            ...state,
            loading: true,
        }
    case UPDATE_DESTINATION_SUCCESS:

        return {
            ...state,
            loading: false,
            destination: action.payload
        }
    case UPDATE_DESTINATION_FAIL:

        return {
            ...state,
            loading: false,
            error: action.payload

        }

        default:
            return state;
    }

}

export const suspendDestinationReducer = (state = { user: {} }, action) => {

    switch (action.type) {
         case UPDATE_ADMIN_SUSPEND_DESTINATION_REQUEST:

        return {
            ...state,
            loading: true,
        }
    case UPDATE_ADMIN_SUSPEND_DESTINATION_SUCCESS:

        return {
            ...state,
            loading: false,
            destinationSuspend: action.payload
        }
    case UPDATE_ADMIN_SUSPEND_DESTINATION_FAIL:

        return {
            ...state,
            loading: false,
            error: action.payload

        }

        default:
            return state;
    }

}