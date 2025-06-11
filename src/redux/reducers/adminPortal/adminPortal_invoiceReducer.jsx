import { CREATE_ADMIN_INVOICE_FAIL, CREATE_ADMIN_INVOICE_REQUEST, CREATE_ADMIN_INVOICE_SUCCESS, GET_ADMIN_INVOICE_FAIL, GET_ADMIN_INVOICE_REQUEST, GET_ADMIN_INVOICE_SUCCESS, UPDATE_ADMIN_INVOICE_FAIL, UPDATE_ADMIN_INVOICE_REQUEST, UPDATE_ADMIN_INVOICE_SUCCESS } from "../../constants/adminPortal/adminPortal_invoiceConstants"

export const getAdminInvoiceReducers = (state = { users: [] }, action) => {

    switch (action.type) {
        case GET_ADMIN_INVOICE_REQUEST:

            return {
                ...state,
                loading: true,
            }
        case GET_ADMIN_INVOICE_SUCCESS:

            return {
                ...state,
                loading: false,
                invoice: action.payload
            }
        case GET_ADMIN_INVOICE_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload

            }

        default:
            return state
    }

}

export const createAdminInvoiceReducer = (state = { user: {} }, action) => {

    switch (action.type) {
         case CREATE_ADMIN_INVOICE_REQUEST:

        return {
            ...state,
            loading: true,
        }
    case CREATE_ADMIN_INVOICE_SUCCESS:

        return {
            ...state,
            loading: false,
            invoice: action.payload
        }
    case CREATE_ADMIN_INVOICE_FAIL:

        return {
            ...state,
            loading: false,
            error: action.payload

        }

        default:
            return state;
    }

}

export const updateAdminInvoiceReducer = (state = { user: {} }, action) => {

    switch (action.type) {
         case UPDATE_ADMIN_INVOICE_REQUEST:

        return {
            ...state,
            loading: true,
        }
    case UPDATE_ADMIN_INVOICE_SUCCESS:

        return {
            ...state,
            loading: false,
            updateInvoice: action.payload
        }
    case UPDATE_ADMIN_INVOICE_FAIL:

        return {
            ...state,
            loading: false,
            error: action.payload

        }

        default:
            return state;
    }

}