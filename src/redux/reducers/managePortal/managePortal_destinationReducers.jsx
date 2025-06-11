import { GET_MANAGE_DID_FAIL, GET_MANAGE_DID_REQUEST, GET_MANAGE_DID_SUCCESS, UPDATE_MANAGE_DESTINATION_FAIL, UPDATE_MANAGE_DESTINATION_REQUEST, UPDATE_MANAGE_DESTINATION_SUCCESS } from "../../constants/managePortal/managePortal_destinationConstants"

export const allManageDidReducers = (state = { allManageDid: [] }, action) => {

    switch (action.type) {
        case GET_MANAGE_DID_REQUEST:

            return {
                ...state,
                loading: true,
            }
        case GET_MANAGE_DID_SUCCESS:

            return {
                ...state,
                loading: false,
                allmanagedid: action.payload
            }
        case GET_MANAGE_DID_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload

            }

        default:
            return state
    }

}

export const updateManageDestinationReducer = (state = { user: {} }, action) => {

    switch (action.type) {
         case UPDATE_MANAGE_DESTINATION_REQUEST:

        return {
            ...state,
            loading: true,
        }
    case UPDATE_MANAGE_DESTINATION_SUCCESS:

        return {
            ...state,
            loading: false,
            destination: action.payload
        }
    case UPDATE_MANAGE_DESTINATION_FAIL:

        return {
            ...state,
            loading: false,
            error: action.payload

        }

        default:
            return state;
    }

}