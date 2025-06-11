import { CREATE_MANAGE_RECORDING_FAIL, CREATE_MANAGE_RECORDING_REQUEST, CREATE_MANAGE_RECORDING_SUCCESS, GET_MANAGE_RECORDING_FAIL, GET_MANAGE_RECORDING_REQUEST, GET_MANAGE_RECORDING_SUCCESS, UPDATE_MANAGE_RECORDING_FAIL, UPDATE_MANAGE_RECORDING_REQUEST, UPDATE_MANAGE_RECORDING_SUCCESS } from "../../constants/managePortal/managePortal_recordingConstants"

export const getManageRecordingReducers = (state = { users: [] }, action) => {

    switch (action.type) {
        case GET_MANAGE_RECORDING_REQUEST:

            return {
                ...state,
                loading: true,
            }
        case GET_MANAGE_RECORDING_SUCCESS:

            return {
                ...state,
                loading: false,
                getRecording: action.payload
            }
        case GET_MANAGE_RECORDING_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload

            }

        default:
            return state
    }

}
export const createManageRecordingReducers = (state = { user: {} }, action) => {

    switch (action.type) {
         case CREATE_MANAGE_RECORDING_REQUEST:

        return {
            ...state,
            loading: true,
        }
    case CREATE_MANAGE_RECORDING_SUCCESS:

        return {
            ...state,
            loading: false,
            recording: action.payload
        }
    case CREATE_MANAGE_RECORDING_FAIL:

        return {
            ...state,
            loading: false,
            error: action.payload

        }

        default:
            return state;
    }

}
export const updateManageRecordingReducers = (state = { user: {} }, action) => {

    switch (action.type) {
         case UPDATE_MANAGE_RECORDING_REQUEST:

        return {
            ...state,
            loading: true,
        }
    case UPDATE_MANAGE_RECORDING_SUCCESS:

        return {
            ...state,
            loading: false,
            updateRecording: action.payload
        }
    case UPDATE_MANAGE_RECORDING_FAIL:

        return {
            ...state,
            loading: false,
            error: action.payload

        }

        default:
            return state;
    }

}