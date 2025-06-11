import { CREATE_ADMIN_RECORDING_FAIL, CREATE_ADMIN_RECORDING_REQUEST, CREATE_ADMIN_RECORDING_SUCCESS, GET_ADMIN_RECORDING_FAIL, GET_ADMIN_RECORDING_REQUEST, GET_ADMIN_RECORDING_SUCCESS, UPDATE_ADMIN_RECORDING_FAIL, UPDATE_ADMIN_RECORDING_REQUEST, UPDATE_ADMIN_RECORDING_SUCCESS } from "../../constants/adminPortal/adminPortal_recordingConstants"

export const getAdminRecordingReducers = (state = { users: [] }, action) => {

    switch (action.type) {
        case GET_ADMIN_RECORDING_REQUEST:

            return {
                ...state,
                loading: true,
            }
        case GET_ADMIN_RECORDING_SUCCESS:

            return {
                ...state,
                loading: false,
                getRecording: action.payload
            }
        case GET_ADMIN_RECORDING_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload

            }

        default:
            return state
    }

}
export const createAdminRecordingReducers = (state = { user: {} }, action) => {

    switch (action.type) {
         case CREATE_ADMIN_RECORDING_REQUEST:

        return {
            ...state,
            loading: true,
        }
    case CREATE_ADMIN_RECORDING_SUCCESS:

        return {
            ...state,
            loading: false,
            recording: action.payload
        }
    case CREATE_ADMIN_RECORDING_FAIL:

        return {
            ...state,
            loading: false,
            error: action.payload

        }

        default:
            return state;
    }

}
export const updateAdminRecordingReducers = (state = { user: {} }, action) => {

    switch (action.type) {
         case UPDATE_ADMIN_RECORDING_REQUEST:

        return {
            ...state,
            loading: true,
        }
    case UPDATE_ADMIN_RECORDING_SUCCESS:

        return {
            ...state,
            loading: false,
            updateRecording: action.payload
        }
    case UPDATE_ADMIN_RECORDING_FAIL:

        return {
            ...state,
            loading: false,
            error: action.payload

        }

        default:
            return state;
    }

}