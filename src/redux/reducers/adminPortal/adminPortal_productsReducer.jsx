import { GET_ADMIN_PRODUCTS_FAIL, GET_ADMIN_PRODUCTS_REQUEST, GET_ADMIN_PRODUCTS_SUCCESS, POST_ADMIN_PRODUCTS_FAIL, POST_ADMIN_PRODUCTS_REQUEST, POST_ADMIN_PRODUCTS_SUCCESS } from "../../constants/adminPortal/adminPortal_productsConstants"

export const getAdminProductsReducers = (state = { users: [] }, action) => {

    switch (action.type) {
        case GET_ADMIN_PRODUCTS_REQUEST:

            return {
                ...state,
                loading: true,
            }
        case GET_ADMIN_PRODUCTS_SUCCESS:

            return {
                ...state,
                loading: false,
                products: action.payload
            }
        case GET_ADMIN_PRODUCTS_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload

            }

        default:
            return state
    }

}

export const createAdminProductsReducer = (state = { user: {} }, action) => {

    switch (action.type) {
         case POST_ADMIN_PRODUCTS_REQUEST:
          return{  ...state,
            loading: true,
        }
    case POST_ADMIN_PRODUCTS_SUCCESS:

        return {
            ...state,
            loading: false,
            products: action.payload
        }
    case POST_ADMIN_PRODUCTS_FAIL:

        return {
            ...state,
            loading: false,
            error: action.payload

        }

        default:
            return state;
    }

}