import { GET_MANAGE_BILLING_FAIL, GET_MANAGE_BILLING_REQUEST, GET_MANAGE_BILLING_SUCCESS } from "../../constants/managePortal/managePortal_billingConstants"

export const getManageBillingReducers = (state = { users: [] }, action) => {

    switch (action.type) {
        case GET_MANAGE_BILLING_REQUEST:

            return {
                ...state,
                loading: true,
            }
        case GET_MANAGE_BILLING_SUCCESS:

            return {
                ...state,
                loading: false,
                billing: action.payload
            }
        case GET_MANAGE_BILLING_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload

            }

        default:
            return state
    }

}