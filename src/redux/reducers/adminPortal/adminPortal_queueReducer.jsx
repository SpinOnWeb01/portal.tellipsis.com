import { CREATE_ADMIN_QUEUE_FAIL, CREATE_ADMIN_QUEUE_MEMBER_FAIL, CREATE_ADMIN_QUEUE_MEMBER_REQUEST, CREATE_ADMIN_QUEUE_MEMBER_SUCCESS, CREATE_ADMIN_QUEUE_REQUEST, CREATE_ADMIN_QUEUE_SUCCESS, DELETE_ADMIN_QUEUE_MEMBER_FAIL, DELETE_ADMIN_QUEUE_MEMBER_REQUEST, DELETE_ADMIN_QUEUE_MEMBER_SUCCESS, GET_ADMIN_QUEUE_FAIL, GET_ADMIN_QUEUE_MEMBER_FAIL, GET_ADMIN_QUEUE_MEMBER_REQUEST, GET_ADMIN_QUEUE_MEMBER_SUCCESS, GET_ADMIN_QUEUE_REQUEST, GET_ADMIN_QUEUE_SUCCESS, UPDATE_ADMIN_QUEUE_FAIL, UPDATE_ADMIN_QUEUE_REQUEST, UPDATE_ADMIN_QUEUE_SUCCESS } from "../../constants/adminPortal/adminPortal_queueConstants"

export const getAdminQueueReducers = (state = { users: [] }, action) => {

    switch (action.type) {
        case GET_ADMIN_QUEUE_REQUEST:

            return {
                ...state,
                loading: true,
            }
        case GET_ADMIN_QUEUE_SUCCESS:

            return {
                ...state,
                loading: false,
                getQueue: action.payload
            }
        case GET_ADMIN_QUEUE_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload

            }

        default:
            return state
    }

}
export const createAdminQueueReducer = (state = { user: {} }, action) => {

    switch (action.type) {
         case CREATE_ADMIN_QUEUE_REQUEST:

        return {
            ...state,
            loading: true,
        }
    case CREATE_ADMIN_QUEUE_SUCCESS:

        return {
            ...state,
            loading: false,
            queue: action.payload
        }
    case CREATE_ADMIN_QUEUE_FAIL:

        return {
            ...state,
            loading: false,
            error: action.payload

        }

        default:
            return state;
    }

}

export const updateAdminQueueReducer = (state = { user: {} }, action) => {

    switch (action.type) {
         case UPDATE_ADMIN_QUEUE_REQUEST:

        return {
            ...state,
            loading: true,
        }
    case UPDATE_ADMIN_QUEUE_SUCCESS:

        return {
            ...state,
            loading: false,
            updateQueue: action.payload
        }
    case UPDATE_ADMIN_QUEUE_FAIL:

        return {
            ...state,
            loading: false,
            error: action.payload

        }

        default:
            return state;
    }

}

export const getAdminQueueMemberReducers = (state = { users: [] }, action) => {

    switch (action.type) {
        case GET_ADMIN_QUEUE_MEMBER_REQUEST:

            return {
                ...state,
                loading: true,
            }
        case GET_ADMIN_QUEUE_MEMBER_SUCCESS:

            return {
                ...state,
                loading: false,
                getQueueMember: action.payload
            }
        case GET_ADMIN_QUEUE_MEMBER_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload

            }

        default:
            return state
    }

}

export const createAdminQueueMemberReducer = (state = { user: {} }, action) => {

    switch (action.type) {
         case CREATE_ADMIN_QUEUE_MEMBER_REQUEST:

        return {
            ...state,
            loading: true,
        }
    case CREATE_ADMIN_QUEUE_MEMBER_SUCCESS:

        return {
            ...state,
            loading: false,
            queueMember: action.payload
        }
    case CREATE_ADMIN_QUEUE_MEMBER_FAIL:

        return {
            ...state,
            loading: false,
            error: action.payload

        }

        default:
            return state;
    }

}

export const deleteAdminQueueMemberReducer = (state = { user: {} }, action) => {

    switch (action.type) {
         case DELETE_ADMIN_QUEUE_MEMBER_REQUEST:

        return {
            ...state,
            loading: true,
        }
    case DELETE_ADMIN_QUEUE_MEMBER_SUCCESS:

        return {
            ...state,
            loading: false,
            queueMember: action.payload
        }
    case DELETE_ADMIN_QUEUE_MEMBER_FAIL:

        return {
            ...state,
            loading: false,
            error: action.payload

        }

        default:
            return state;
    }

}