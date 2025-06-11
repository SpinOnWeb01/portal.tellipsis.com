import { GET_ADMIN_AUDIT_LOGS_FAIL, GET_ADMIN_AUDIT_LOGS_REQUEST, GET_ADMIN_AUDIT_LOGS_SUCCESS } from "../../constants/adminPortal/adminPortal_auditLogsConstants"

export const getAdminAuditLogsReducers = (state = { users: [] }, action) => {

    switch (action.type) {
        case GET_ADMIN_AUDIT_LOGS_REQUEST:

            return {
                ...state,
                loading: true,
            }
        case GET_ADMIN_AUDIT_LOGS_SUCCESS:

            return {
                ...state,
                loading: false,
                auditLogs: action.payload
            }
        case GET_ADMIN_AUDIT_LOGS_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload

            }

        default:
            return state
    }

}