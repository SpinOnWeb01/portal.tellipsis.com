import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userReducer,
  allUserReducers,
  updateUserReducer,
  deleteUserReducer,
  createUserReducer,
  userRoleReducers,
  updateUserStatusReducer,
} from "./reducers/adminPortal/userReducer";
import { blockReportReducers, reportReducers } from "./reducers/adminPortal/reportReducer";
import {
  allDidReducers,
  createDestinationReducer,
  suspendDestinationReducer,
  updateDestinationReducer,
} from "./reducers/adminPortal/destinationReducer";
import {
  allExtensionReducers,
  createExtensionReducer,
  deleteAdminExtensionReducer,
  updateExtensionReducer,
} from "./reducers/adminPortal/extensionReducer";
import {
  allManageDidReducers,
  updateManageDestinationReducer,
} from "./reducers/managePortal/managePortal_destinationReducers";
import {
  allManageExtensionReducers,
  createManageExtensionReducer,
  deleteManageExtensionReducer,
  getManageProfileExtensionReducers,
  updateManageExtensionReducer,
} from "./reducers/managePortal/managePortal_extensionReducer";
import { allManageReportReducers } from "./reducers/managePortal/managePortal_reportReducer";
import {
  allDashboardChartReducers,
  allDashboardBillingChartReducers,
  allDashboardLineChartReducers,
} from "./reducers/adminPortal/adminPortal_dashboardReducer";
import { getAdminCallActiveReducers } from "./reducers/adminPortal/adminPortal_callActiveReducer";
import {
  createAdminMinutesReducer,
  getAdminBillingMinutesReducers,
  getAdminMinutesReducers,
  getAdminTotalMinutesReducers,
  updateAdminMinutesReducer,
} from "./reducers/adminPortal/adminPortal_minutesReducer";
import {
  createAdminQueueMemberReducer,
  createAdminQueueReducer,
  deleteAdminQueueMemberReducer,
  getAdminQueueMemberReducers,
  getAdminQueueReducers,
  updateAdminQueueReducer,
} from "./reducers/adminPortal/adminPortal_queueReducer";
import {
  createManageCallBlockReducer,
  deleteManageCallBlockReducer,
  getManageCallBlockReducers,
  updateManageCallBlockReducer,
} from "./reducers/managePortal/managePortal_callBlockReducer";
import {
  getManageBillingReducers,
} from "./reducers/managePortal/managePortal_billingReducer";
import {
  createAdminCarrierReducer,
  deleteAdminCarrierReducer,
  getAdminCarrierReducers,
  updateAdminCarrierReducer,
} from "./reducers/adminPortal/adminPortal_carrierReducer";
import { getAdminAuditLogsReducers } from "./reducers/adminPortal/adminPortal_auditLogsReducer";
import { createAdminRecordingReducers, getAdminRecordingReducers, updateAdminRecordingReducers } from "./reducers/adminPortal/adminPortal_recordingReducer";
import { createAdminMohReducer, getAdminMohReducers, updateAdminMohReducer } from "./reducers/adminPortal/adminPortal_mohReducer";
import { allPermissionsReducer, updatePermissionReducer } from "./reducers/adminPortal/adminPortal_permissionsReducer";
import { getAdminAddMinuteReducers, getAdminHistoryReducers, postAdminAddMinuteReducers } from "./reducers/adminPortal/adminPortal_historyReducer";
import { createAdminAclReducer, deleteAdminAclReducer, getAdminAclReducers, updateAdminAclReducer } from "./reducers/adminPortal/adminPortal_aclReducer";
import { getAdminAssistantReducers } from "./reducers/adminPortal/adminPortal_assistantReducer";
import { createManageRecordingReducers, getManageRecordingReducers, updateManageRecordingReducers } from "./reducers/managePortal/managePortal_recordingReducer";
import { createManageMohReducer, getManageMohReducers, updateManageMohReducer } from "./reducers/managePortal/managePortal_mohReducer";
import { createManageQueueMemberReducer, createManageQueueReducer, deleteManageQueueMemberReducer, getManageQueueMemberReducers, getManageQueueReducers, updateManageQueueReducer } from "./reducers/managePortal/managePortal_queueReducer";
import { createAdminCallBlockReducer, deleteAdminCallBlockReducer, getAdminCallBlockReducers, updateAdminCallBlockReducer } from "./reducers/adminPortal/adminPortal_callBlockReducer";
import { resellerDashboardBillingChartReducers, resellerDashboardChartReducers, resellerDashboardLineChartReducers } from "./reducers/resellerPortal/resellerPortal_dashboardReducer";
import { getAdminResellersListReducers, getAdminUsersListReducers, getResellerRemainingMinutesReducers, getResellerUsersListReducers } from "./reducers/adminPortal/adminPortal_listReducer";
import { createAdminProductsReducer, getAdminProductsReducers } from "./reducers/adminPortal/adminPortal_productsReducer";
import { createAdminInvoiceReducer, getAdminInvoiceReducers, updateAdminInvoiceReducer } from "./reducers/adminPortal/adminPortal_invoiceReducer";
import { allUserResellerReducers, createUserResellerReducer, deleteUserResellerReducer, updateUserResellerReducer, userResellerReducer, userRoleResellerReducers } from "./reducers/resellerPortal/resellerPortal_usersReducer";
import { allDidResellerReducers, createDestinationResellerReducer, updateDestinationResellerReducer } from "./reducers/resellerPortal/resellerPortal_destinationReducer";
import { getAdminPaymentReducers } from "./reducers/adminPortal/adminPortal_paymentReducer";
import { getManagePaymentReducers } from "./reducers/managePortal/managePortal_paymentReducer";

const reducer = combineReducers({
  user: userReducer,
  report: reportReducers,
  roles: userRoleReducers,
  userReseller:userResellerReducer,  //11-07-2024
  userRoleReseller:userRoleResellerReducers,  //11-07-2024
  // GET
  allUsers: allUserReducers,
  allUserReseller:allUserResellerReducers,  //11-07-2024
  allDid: allDidReducers,
  getAdminCallActive: getAdminCallActiveReducers,
  getAdminMinutes: getAdminMinutesReducers,
  getAdminQueue: getAdminQueueReducers,
  getAdminQueueMember: getAdminQueueMemberReducers,
  allDashboardChart: allDashboardChartReducers,
  allDashboardBillingChart: allDashboardBillingChartReducers,
  allExtension: allExtensionReducers,
  allManageDid: allManageDidReducers,
  allManageExtension: allManageExtensionReducers,
  allManageReport: allManageReportReducers,
  getManageCallBlock: getManageCallBlockReducers,
  getManageBilling: getManageBillingReducers,
  getAdminCarrier: getAdminCarrierReducers,
  getAdminAuditLogs:getAdminAuditLogsReducers,
  getAdminRecording:getAdminRecordingReducers,
  getAdminMoh:getAdminMohReducers,
  allPermissions:allPermissionsReducer,
  getAdminHistory:getAdminHistoryReducers,
  getAdminAcl:getAdminAclReducers,
  getAdminAssistant:getAdminAssistantReducers,
  getManageRecording:getManageRecordingReducers,
  getManageMoh:getManageMohReducers,
  getManageQueue:getManageQueueReducers,
  getManageQueueMember:getManageQueueMemberReducers,
  getAdminCallBlock:getAdminCallBlockReducers,
  allDashboardLineChart:allDashboardLineChartReducers,
  getAdminBillingMinutes:getAdminBillingMinutesReducers,
  getAdminTotalMinutes:getAdminTotalMinutesReducers,
  resellerDashboardChart:resellerDashboardChartReducers,
  resellerDashboardBillingChart:resellerDashboardBillingChartReducers,
  resellerDashboardLineChart:resellerDashboardLineChartReducers,
  getAdminAddMinute:getAdminAddMinuteReducers,
  getAdminUsersList:getAdminUsersListReducers,
  getAdminResellersList:getAdminResellersListReducers,
  getResellerUsersList:getResellerUsersListReducers,
  getResellerRemainingMinutes:getResellerRemainingMinutesReducers,
  getAdminProducts:getAdminProductsReducers,
  getManageProfileExtension:getManageProfileExtensionReducers,
  getAdminInvoice:getAdminInvoiceReducers, //05-07-2024
  allDidReseller:allDidResellerReducers, //11-07-2024
  getAdminPayment:getAdminPaymentReducers, //07-08-2024
  getManagePayment:getManagePaymentReducers, //09-08-2024
  //CREATE
  createUser: createUserReducer,
  createUserReseller:createUserResellerReducer, //11-07-2024
  createAdminMinutes: createAdminMinutesReducer,
  createAdminQueue: createAdminQueueReducer,
  createAdminQueueMember: createAdminQueueMemberReducer,
  createDestination: createDestinationReducer,
  createExtension: createExtensionReducer,
  createManageExtension: createManageExtensionReducer,
  createManageCallBlock: createManageCallBlockReducer,
  createAdminCarrier: createAdminCarrierReducer,
  createAdminRecording:createAdminRecordingReducers,
  createAdminMoh:createAdminMohReducer,
  createAdminAcl:createAdminAclReducer,
  createManageRecording:createManageRecordingReducers,
  createManageMoh:createManageMohReducer,
  createManageQueue:createManageQueueReducer,
  createManageQueueMember:createManageQueueMemberReducer,
  createAdminCallBlock:createAdminCallBlockReducer,
  postAdminAddMinute: postAdminAddMinuteReducers,
  createAdminProducts:createAdminProductsReducer,
  createAdminInvoice:createAdminInvoiceReducer, //05-07-2024
  createDestinationReseller:createDestinationResellerReducer,  //11-07-2024
  createBlockReport:blockReportReducers,  //24-07-2024
  //UPDATE
  updateUser: updateUserReducer,
  updateUserReseller:updateUserResellerReducer,  //11-07-2024
  updateAdminMinutes: updateAdminMinutesReducer,
  updateAdminQueue: updateAdminQueueReducer,
  updateDestination: updateDestinationReducer,
  updateManageDestination: updateManageDestinationReducer,
  updateExtension: updateExtensionReducer,
  updateAdminCarrier: updateAdminCarrierReducer,
  updateManageExtension: updateManageExtensionReducer,
  updateManageCallBlock: updateManageCallBlockReducer,
  updateAdminRecording:updateAdminRecordingReducers,
  updateAdminMoh:updateAdminMohReducer,
  updateAdminAcl:updateAdminAclReducer,
  updateManageRecording:updateManageRecordingReducers,
  updateManageQueue:updateManageQueueReducer,
  updateManageMoh:updateManageMohReducer,
  updatePermission: updatePermissionReducer,
  updateAdminCallBlock:updateAdminCallBlockReducer,
  updateAdminInvoice:updateAdminInvoiceReducer,  //05-07-2024
  updateDestinationReseller:updateDestinationResellerReducer,  //11-07-2024
  updateUserStatus: updateUserStatusReducer, //04-06-2025
  suspendDestination: suspendDestinationReducer, //04-06-2025
  //DELETE
  deleteUser: deleteUserReducer,
  deleteUserReseller: deleteUserResellerReducer,  //11-07-2024
  deleteAdminQueueMember: deleteAdminQueueMemberReducer,
  deleteAdminCarrier: deleteAdminCarrierReducer,
  deleteManageCallBlock: deleteManageCallBlockReducer,
  deleteAdminAcl:deleteAdminAclReducer,
  deleteManageQueueMember:deleteManageQueueMemberReducer,
  deleteAdminCallBlock:deleteAdminCallBlockReducer,
  deleteAdminExtension:deleteAdminExtensionReducer,
  deleteManageExtension:deleteManageExtensionReducer
});

const middleware = [thunk];

const store = legacy_createStore(
  reducer,

  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
