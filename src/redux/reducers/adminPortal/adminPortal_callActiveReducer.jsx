import { GET_ADMIN_CALL_ACTIVE_FAIL, GET_ADMIN_CALL_ACTIVE_REQUEST, GET_ADMIN_CALL_ACTIVE_SUCCESS } from "../../constants/adminPortal/adminPortal_callActiveConstants"

export const getAdminCallActiveReducers = (state = { users: [] }, action) => {

    switch (action.type) {
        case GET_ADMIN_CALL_ACTIVE_REQUEST:

            return {
                ...state,
                loading: true,
            }
        case GET_ADMIN_CALL_ACTIVE_SUCCESS:

            return {
                ...state,
                loading: false,
                callactive: action.payload
            }
        case GET_ADMIN_CALL_ACTIVE_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload

            }

        default:
            return state
    }

}