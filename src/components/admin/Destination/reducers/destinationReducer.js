export const initialState = {
  selectedValue: "t",
  suspendValue: 0,
  subType: "",
  didId: "",
  serviceType: [],
  destinationDescription: "",
  destinationAction: [],
  openimport: false,
  file: null,
  open: false,
  response: null,
  edit: false,
  tfnNumber: "",
  userId: "",
  deleteRow: "",
  recording: "",
  service: "",
  resellerUsersData: [],
  extensionNumber: [],
  queue: [],
  carrierName: "",
  resellerId: "",
  ipAddress: "",
  error: "",
  resellerUsers: [],
  users: [],
  resellers: [],
  radioValue: "true",
  searchDestination: "",
  selectedRows: [],
  alertMessage: false,
  loader: true,
  validation: {
    tfnNumber: "",
    userId: "",
    serviceType: "",
    recording: "",
    selectedValue: "",
    carrierName: "",
    ipAddress: "",
  },
};

export function destinationReducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        [action.field]: action.value
      };
    case 'SET_NESTED_FIELD':
      return {
        ...state,
        [action.parent]: {
          ...state[action.parent],
          [action.field]: action.value
        }
      };
    case 'RESET_FORM':
      return {
        ...initialState,
        radioValue: state.radioValue,
        loader: state.loader,
        users: state.users,
        resellers: state.resellers,
        resellerUsers: state.resellerUsers,
      };
    case 'SET_EDIT_DATA':
      return {
        ...state,
        ...action.payload
      };
    case 'SET_MULTIPLE':
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}