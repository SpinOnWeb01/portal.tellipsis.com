import { GET_ADMIN_PAYMENT_FAIL, GET_ADMIN_PAYMENT_REQUEST, GET_ADMIN_PAYMENT_SUCCESS } from "../../constants/adminPortal/adminPortal_paymentConstants"

export const getAdminPaymentReducers = (state = { users: [] }, action) => {

    switch (action.type) {
        case GET_ADMIN_PAYMENT_REQUEST:

            return {
                ...state,
                loading: true,
            }
        case GET_ADMIN_PAYMENT_SUCCESS:

            return {
                ...state,
                loading: false,
                payment: action.payload
            }
        case GET_ADMIN_PAYMENT_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload

            }

        default:
            return state
    }

}
