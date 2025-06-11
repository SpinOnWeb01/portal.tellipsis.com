import { ALL_MANAGE_REPORT_FAIL, ALL_MANAGE_REPORT_REQUEST, ALL_MANAGE_REPORT_SUCCESS } from "../../constants/managePortal/managePortal_reportConstants"

export const allManageReportReducers = (state = { users: [] }, action) => {

    switch (action.type) {
        case ALL_MANAGE_REPORT_REQUEST:

            return {
                ...state,
                loading: true,
            }
        case ALL_MANAGE_REPORT_SUCCESS:

            return {
                ...state,
                loading: false,
                managereport: action.payload
            }
        case ALL_MANAGE_REPORT_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload

            }

        default:
            return state
    }

}