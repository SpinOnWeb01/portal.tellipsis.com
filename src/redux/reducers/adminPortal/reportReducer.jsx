import { ALL_REPORT_FAIL, ALL_REPORT_REQUEST, ALL_REPORT_SUCCESS, CREATE_ADMIN_BLOCK_REPORT_FAIL, CREATE_ADMIN_BLOCK_REPORT_REQUEST, CREATE_ADMIN_BLOCK_REPORT_SUCCESS } from "../../constants/adminPortal/reportConstants"

export const reportReducers = (state = { users: [] }, action) => {

    switch (action.type) {
        case ALL_REPORT_REQUEST:

            return {
                ...state,
                loading: true,
            }
        case ALL_REPORT_SUCCESS:

            return {
                ...state,
                loading: false,
                report: action.payload
            }
        case ALL_REPORT_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload

            }

        default:
            return state
    }

}

export const blockReportReducers = (state = { users: [] }, action) => {

    switch (action.type) {
        case CREATE_ADMIN_BLOCK_REPORT_REQUEST:

            return {
                ...state,
                loading: true,
            }
        case CREATE_ADMIN_BLOCK_REPORT_SUCCESS:

            return {
                ...state,
                loading: false,
                blockReport: action.payload
            }
        case CREATE_ADMIN_BLOCK_REPORT_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload

            }

        default:
            return state
    }

}