import { CREATE_MANAGE_QUEUE_FAIL, CREATE_MANAGE_QUEUE_MEMBER_FAIL, CREATE_MANAGE_QUEUE_MEMBER_REQUEST, CREATE_MANAGE_QUEUE_MEMBER_SUCCESS, CREATE_MANAGE_QUEUE_REQUEST, CREATE_MANAGE_QUEUE_SUCCESS, DELETE_MANAGE_QUEUE_MEMBER_FAIL, DELETE_MANAGE_QUEUE_MEMBER_REQUEST, DELETE_MANAGE_QUEUE_MEMBER_SUCCESS, GET_MANAGE_QUEUE_FAIL, GET_MANAGE_QUEUE_MEMBER_FAIL, GET_MANAGE_QUEUE_MEMBER_REQUEST, GET_MANAGE_QUEUE_MEMBER_SUCCESS, GET_MANAGE_QUEUE_REQUEST, GET_MANAGE_QUEUE_SUCCESS, UPDATE_MANAGE_QUEUE_FAIL, UPDATE_MANAGE_QUEUE_REQUEST, UPDATE_MANAGE_QUEUE_SUCCESS } from "../../constants/managePortal/managePortal_queueConstants"

export const getManageQueueReducers = (state = { users: [] }, action) => {

    switch (action.type) {
        case GET_MANAGE_QUEUE_REQUEST:

            return {
                ...state,
                loading: true,
            }
        case GET_MANAGE_QUEUE_SUCCESS:

            return {
                ...state,
                loading: false,
                getQueue: action.payload
            }
        case GET_MANAGE_QUEUE_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload

            }

        default:
            return state
    }

}
export const createManageQueueReducer = (state = { user: {} }, action) => {

    switch (action.type) {
         case CREATE_MANAGE_QUEUE_REQUEST:

        return {
            ...state,
            loading: true,
        }
    case CREATE_MANAGE_QUEUE_SUCCESS:

        return {
            ...state,
            loading: false,
            queue: action.payload
        }
    case CREATE_MANAGE_QUEUE_FAIL:

        return {
            ...state,
            loading: false,
            error: action.payload

        }

        default:
            return state;
    }

}

export const updateManageQueueReducer = (state = { user: {} }, action) => {

    switch (action.type) {
         case UPDATE_MANAGE_QUEUE_REQUEST:

        return {
            ...state,
            loading: true,
        }
    case UPDATE_MANAGE_QUEUE_SUCCESS:

        return {
            ...state,
            loading: false,
            updateQueue: action.payload
        }
    case UPDATE_MANAGE_QUEUE_FAIL:

        return {
            ...state,
            loading: false,
            error: action.payload

        }

        default:
            return state;
    }

}

export const getManageQueueMemberReducers = (state = { users: [] }, action) => {

    switch (action.type) {
        case GET_MANAGE_QUEUE_MEMBER_REQUEST:

            return {
                ...state,
                loading: true,
            }
        case GET_MANAGE_QUEUE_MEMBER_SUCCESS:

            return {
                ...state,
                loading: false,
                getQueueMember: action.payload
            }
        case GET_MANAGE_QUEUE_MEMBER_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload

            }

        default:
            return state
    }

}

export const createManageQueueMemberReducer = (state = { user: {} }, action) => {

    switch (action.type) {
         case CREATE_MANAGE_QUEUE_MEMBER_REQUEST:

        return {
            ...state,
            loading: true,
        }
    case CREATE_MANAGE_QUEUE_MEMBER_SUCCESS:

        return {
            ...state,
            loading: false,
            queueMember: action.payload
        }
    case CREATE_MANAGE_QUEUE_MEMBER_FAIL:

        return {
            ...state,
            loading: false,
            error: action.payload

        }

        default:
            return state;
    }

}

export const deleteManageQueueMemberReducer = (state = { user: {} }, action) => {

    switch (action.type) {
         case DELETE_MANAGE_QUEUE_MEMBER_REQUEST:

        return {
            ...state,
            loading: true,
        }
    case DELETE_MANAGE_QUEUE_MEMBER_SUCCESS:

        return {
            ...state,
            loading: false,
            queueMember: action.payload
        }
    case DELETE_MANAGE_QUEUE_MEMBER_FAIL:

        return {
            ...state,
            loading: false,
            error: action.payload

        }

        default:
            return state;
    }

}