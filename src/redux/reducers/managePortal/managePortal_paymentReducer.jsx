import { GET_MANAGE_PAYMENT_FAIL, GET_MANAGE_PAYMENT_REQUEST, GET_MANAGE_PAYMENT_SUCCESS } from "../../constants/managePortal/managePortal_paymentConstants"

export const getManagePaymentReducers = (state = { users: [] }, action) => {

    switch (action.type) {
        case GET_MANAGE_PAYMENT_REQUEST:

            return {
                ...state,
                loading: true,
            }
        case GET_MANAGE_PAYMENT_SUCCESS:

            return {
                ...state,
                loading: false,
                Payment: action.payload
            }
        case GET_MANAGE_PAYMENT_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload

            }

        default:
            return state
    }

}