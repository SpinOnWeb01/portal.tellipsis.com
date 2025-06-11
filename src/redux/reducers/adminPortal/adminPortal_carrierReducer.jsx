import { CREATE_ADMIN_CARRIER_FAIL, CREATE_ADMIN_CARRIER_REQUEST, CREATE_ADMIN_CARRIER_SUCCESS, DELETE_ADMIN_CARRIER_FAIL, DELETE_ADMIN_CARRIER_REQUEST, DELETE_ADMIN_CARRIER_SUCCESS, GET_ADMIN_CARRIER_FAIL, GET_ADMIN_CARRIER_REQUEST, GET_ADMIN_CARRIER_SUCCESS, UPDATE_ADMIN_CARRIER_FAIL, UPDATE_ADMIN_CARRIER_REQUEST, UPDATE_ADMIN_CARRIER_SUCCESS } from "../../constants/adminPortal/adminPortal_carrierConstants"

export const getAdminCarrierReducers = (state = { users: [] }, action) => {

    switch (action.type) {
        case GET_ADMIN_CARRIER_REQUEST:

            return {
                ...state,
                loading: true,
            }
        case GET_ADMIN_CARRIER_SUCCESS:

            return {
                ...state,
                loading: false,
                getCarrier: action.payload
            }
        case GET_ADMIN_CARRIER_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload

            }

        default:
            return state
    }

}
export const createAdminCarrierReducer = (state = { user: {} }, action) => {

    switch (action.type) {
         case CREATE_ADMIN_CARRIER_REQUEST:

        return {
            ...state,
            loading: true,
        }
    case CREATE_ADMIN_CARRIER_SUCCESS:

        return {
            ...state,
            loading: false,
            carrier: action.payload
        }
    case CREATE_ADMIN_CARRIER_FAIL:

        return {
            ...state,
            loading: false,
            error: action.payload

        }

        default:
            return state;
    }

}

export const updateAdminCarrierReducer = (state = { user: {} }, action) => {

    switch (action.type) {
         case UPDATE_ADMIN_CARRIER_REQUEST:

        return {
            ...state,
            loading: true,
        }
    case UPDATE_ADMIN_CARRIER_SUCCESS:

        return {
            ...state,
            loading: false,
            updateCarrier: action.payload
        }
    case UPDATE_ADMIN_CARRIER_FAIL:

        return {
            ...state,
            loading: false,
            error: action.payload

        }

        default:
            return state;
    }

}


export const deleteAdminCarrierReducer = (state = { user: {} }, action) => {

    switch (action.type) {
         case DELETE_ADMIN_CARRIER_REQUEST:

        return {
            ...state,
            loading: true,
        }
    case DELETE_ADMIN_CARRIER_SUCCESS:

        return {
            ...state,
            loading: false,
            carrier: action.payload
        }
    case DELETE_ADMIN_CARRIER_FAIL:

        return {
            ...state,
            loading: false,
            error: action.payload

        }

        default:
            return state;
    }

}