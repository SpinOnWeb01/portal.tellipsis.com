import { ALL_DASHBOARD_BILLING_CHART_FAIL, ALL_DASHBOARD_BILLING_CHART_REQUEST, ALL_DASHBOARD_BILLING_CHART_SUCCESS, ALL_DASHBOARD_CHART_FAIL, ALL_DASHBOARD_CHART_REQUEST, ALL_DASHBOARD_CHART_SUCCESS, ALL_DASHBOARD_LINE_CHART_FAIL, ALL_DASHBOARD_LINE_CHART_REQUEST, ALL_DASHBOARD_LINE_CHART_SUCCESS } from "../../constants/adminPortal/adminPortal_dashboardConstants"

export const allDashboardChartReducers = (state = { users: [] }, action) => {

    switch (action.type) {
        case ALL_DASHBOARD_CHART_REQUEST:

            return {
                ...state,
                loading: true,
            }
        case ALL_DASHBOARD_CHART_SUCCESS:

            return {
                ...state,
                loading: false,
                managereport: action.payload
            }
        case ALL_DASHBOARD_CHART_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload

            }

        default:
            return state
    }

}

export const allDashboardBillingChartReducers = (state = { users: [] }, action) => {

    switch (action.type) {
        case ALL_DASHBOARD_BILLING_CHART_REQUEST:

            return {
                ...state,
                loading: true,
            }
        case ALL_DASHBOARD_BILLING_CHART_SUCCESS:

            return {
                ...state,
                loading: false,
                billingchart: action.payload
            }
        case ALL_DASHBOARD_BILLING_CHART_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload

            }

        default:
            return state
    }

}
export const allDashboardLineChartReducers = (state = { users: [] }, action) => {

    switch (action.type) {
        case ALL_DASHBOARD_LINE_CHART_REQUEST:

            return {
                ...state,
                loading: true,
            }
        case ALL_DASHBOARD_LINE_CHART_SUCCESS:

            return {
                ...state,
                loading: false,
                linechart: action.payload
            }
        case ALL_DASHBOARD_LINE_CHART_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload

            }

        default:
            return state
    }

}