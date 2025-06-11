import { ALL_PERMISSIONS_FAIL, ALL_PERMISSIONS_REQUEST, ALL_PERMISSIONS_SUCCESS,
PUT_PERMISSION_REQUEST, PUT_PERMISSION_SUCCESS, PUT_PERMISSION_FAIL } from "../../constants/adminPortal/adminPortal_permissionsContants"

export const allPermissionsReducer = (state = { permissions: [] }, action) => {

    switch (action.type) {
        case ALL_PERMISSIONS_REQUEST:

            return {
                ...state,
                loading: true,
            }
        case ALL_PERMISSIONS_SUCCESS:

            return {
                ...state,
                loading: false,
                permissions: action.payload
            }
        case ALL_PERMISSIONS_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload

            }

        default:
            return state
    }

}

export const updatePermissionReducer = (state = { updatedPermissionData: {} }, action) => {
    switch (action.type) {
        case PUT_PERMISSION_REQUEST:
            return {
                ...state,
                updating: true,
                updatedResponse: null
            }
        case PUT_PERMISSION_SUCCESS:
            return {
                ...state,
                updating: false,
                updatedResponse: action.payload
            }
        case PUT_PERMISSION_FAIL:

            return {
                ...state,
                updating: false,
                error: action.payload

            }

        default:
            return state
    }

}