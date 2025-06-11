import { GET_ADMIN_ASSISTANT_FAIL, GET_ADMIN_ASSISTANT_REQUEST, GET_ADMIN_ASSISTANT_SUCCESS } from "../../constants/adminPortal/adminPortal_assistantConstants"

export const getAdminAssistantReducers = (state = { users: [] }, action) => {

    switch (action.type) {
        case GET_ADMIN_ASSISTANT_REQUEST:

            return {
                ...state,
                loading: true,
            }
        case GET_ADMIN_ASSISTANT_SUCCESS:

            return {
                ...state,
                loading: false,
                assistant: action.payload
            }
        case GET_ADMIN_ASSISTANT_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload

            }

        default:
            return state
    }

}