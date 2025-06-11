
import { CREATE_RESELLER_DESTINATION_FAIL, CREATE_RESELLER_DESTINATION_REQUEST, CREATE_RESELLER_DESTINATION_SUCCESS, GET_RESELLER_DID_FAIL, GET_RESELLER_DID_REQUEST, GET_RESELLER_DID_SUCCESS, UPDATE_RESELLER_DESTINATION_FAIL, UPDATE_RESELLER_DESTINATION_REQUEST, UPDATE_RESELLER_DESTINATION_SUCCESS } from "../../constants/resellerPortal/resellerPortal_destinationConstants"

export const allDidResellerReducers = (state = { allDid: [] }, action) => {

    switch (action.type) {
        case GET_RESELLER_DID_REQUEST:

            return {
                ...state,
                loading: true,
            }
        case GET_RESELLER_DID_SUCCESS:

            return {
                ...state,
                loading: false,
                alldid: action.payload
            }
        case GET_RESELLER_DID_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload

            }

        default:
            return state
    }

}

export const createDestinationResellerReducer = (state = { user: {} }, action) => {

    switch (action.type) {
         case CREATE_RESELLER_DESTINATION_REQUEST:

        return {
            ...state,
            loading: true,
        }
    case CREATE_RESELLER_DESTINATION_SUCCESS:

        return {
            ...state,
            loading: false,
            destination: action.payload
        }
    case CREATE_RESELLER_DESTINATION_FAIL:

        return {
            ...state,
            loading: false,
            error: action.payload

        }

        default:
            return state;
    }

}
export const updateDestinationResellerReducer = (state = { user: {} }, action) => {

    switch (action.type) {
         case UPDATE_RESELLER_DESTINATION_REQUEST:

        return {
            ...state,
            loading: true,
        }
    case UPDATE_RESELLER_DESTINATION_SUCCESS:

        return {
            ...state,
            loading: false,
            destination: action.payload
        }
    case UPDATE_RESELLER_DESTINATION_FAIL:

        return {
            ...state,
            loading: false,
            error: action.payload

        }

        default:
            return state;
    }

}