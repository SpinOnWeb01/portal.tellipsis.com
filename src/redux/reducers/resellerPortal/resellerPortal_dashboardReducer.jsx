import { RESELLER_DASHBOARD_BILLING_CHART_FAIL, RESELLER_DASHBOARD_BILLING_CHART_REQUEST, RESELLER_DASHBOARD_BILLING_CHART_SUCCESS, RESELLER_DASHBOARD_CHART_FAIL, RESELLER_DASHBOARD_CHART_REQUEST, RESELLER_DASHBOARD_CHART_SUCCESS, RESELLER_DASHBOARD_LINE_CHART_FAIL, RESELLER_DASHBOARD_LINE_CHART_REQUEST, RESELLER_DASHBOARD_LINE_CHART_SUCCESS } from "../../constants/resellerPortal/resellerPortal_dashboardConstants"

export const resellerDashboardChartReducers = (state = { users: [] }, action) => {

    switch (action.type) {
        case RESELLER_DASHBOARD_CHART_REQUEST:

            return {
                ...state,
                loading: true,
            }
        case RESELLER_DASHBOARD_CHART_SUCCESS:

            return {
                ...state,
                loading: false,
                managereport: action.payload
            }
        case RESELLER_DASHBOARD_CHART_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload

            }

        default:
            return state
    }

}

export const resellerDashboardBillingChartReducers = (state = { users: [] }, action) => {

    switch (action.type) {
        case RESELLER_DASHBOARD_BILLING_CHART_REQUEST:

            return {
                ...state,
                loading: true,
            }
        case RESELLER_DASHBOARD_BILLING_CHART_SUCCESS:

            return {
                ...state,
                loading: false,
                billingchart: action.payload
            }
        case RESELLER_DASHBOARD_BILLING_CHART_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload

            }

        default:
            return state
    }

}
export const resellerDashboardLineChartReducers = (state = { users: [] }, action) => {

    switch (action.type) {
        case RESELLER_DASHBOARD_LINE_CHART_REQUEST:

            return {
                ...state,
                loading: true,
            }
        case RESELLER_DASHBOARD_LINE_CHART_SUCCESS:

            return {
                ...state,
                loading: false,
                linechart: action.payload
            }
        case RESELLER_DASHBOARD_LINE_CHART_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload

            }

        default:
            return state
    }

}