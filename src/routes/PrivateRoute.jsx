import React, { useEffect } from "react";
import { Routes as Switch, Route } from "react-router-dom";
import Router from "./route";
import { useState } from "react";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import ManageDashboard from "../user_portals/manage_portal/ManageDashboard";
import ManageLayout from "../user_portals/manage_portal/ManageLayout";
import Extension from "../user_portals/manage_portal/Extension";
import CallCenter from "../user_portals/manage_portal/CallCenter";
import OperatorPanel from "../user_portals/manage_portal/OperatorPanel";
import ManageDestination from "../user_portals/manage_portal/ManageDestination";
import Report from "../user_portals/manage_portal/Report";
import ManageCallBlock from "../user_portals/manage_portal/ManageCallBlock";
import AdminDashboard from "../components/admin/AdminDashboard";
import User from "../components/admin/User";
import DidTfnNumber from "../components/admin/DidTfnNumber";
import AdminReport from "../components/admin/AdminReport";
import AdminExtension from "../components/admin/AdminExtension";
import AdminCallActive from "../components/admin/AdminCallActive";
import AdminLayout from "../components/admin/AdminLayout";
import ServerStats from "../components/admin/Serverstats";
import AdminQueue from "../components/admin/AdminQueue";
import ManageCallActive from "../user_portals/manage_portal/ManageCallActive";
import AdminMinutes from "../components/admin/AdminMinutes";
import AdminCarrier from "../components/admin/AdminCarrier";
import MangaeBilling from "../user_portals/manage_portal/MangaeBilling";
import ManageQueueMember from "../user_portals/manage_portal/ManageQueueMember";
import AdminView from "../components/admin/AdminView";
import AdminQueueMember from "../components/admin/AdminQueueMember";
import AdminLiveExtension from "../components/admin/AdminLiveExtension";
import AdminHistory from "../components/admin/AdminHistory";
import AdminAuditLog from "../components/admin/AdminAuditLogs";
import AdminivrUploads from "../components/admin/AdminivrUploads";
import AdminMOH from "../components/admin/AdminMOH";
import ManageLiveExtension from "../user_portals/manage_portal/ManageLiveExtension";
import AdminPermission from "../components/admin/AdminPermission";
import AdminACL from "../components/admin/AdminACL";
import ManageAuditLogs from "../user_portals/manage_portal/ManageAuditLogs";
import AdminAssistant from "../components/admin/AdminAssistant";
import ManageRecording from "../user_portals/manage_portal/ManageRecording";
import ManageMoh from "../user_portals/manage_portal/ManageMoh";
import ManageQueue from "../user_portals/manage_portal/ManageQueue";
import AdminQueueCalls from "../components/admin/AdminQueueCalls";
import AdminCallBlock from "../components/admin/AdminCallBlock";
import AdminMDR from "../components/admin/AdminMDR";
import AdminBillingMinut from "../components/admin/AdminBillingMinut";
import ResellerLayout from "../components/reseller/ResellerLayout";
import ResellerDashboard from "../components/reseller/ResellerDashboard";
import ResellerUser from "../components/reseller/ResellerUser";
import ResellerManageCampaign from "../components/reseller/ResellerManageCampaign";
import ResellerManageAddBuyer from "../components/reseller/ResellerManageAddBuyer";
import ResellerReport from "../components/reseller/ResellerReport";
import ResellerExtension from "../components/reseller/ResellerExtension";
import ResellerCallActive from "../components/reseller/ResellerCallActive";
import ResellerQueueCalls from "../components/reseller/ResellerQueueCalls";
import ResellerCallBlock from "../components/reseller/ResellerCallBlock";
import ResellerServerStats from "../components/reseller/ResellerServerstats";
import ResellerQueue from "../components/reseller/ResellerQueue";
import ResellerBillingMinut from "../components/reseller/ResellerBillingMinut";
import ResellerQueueMember from "../components/reseller/ResellerQueueMember";
import ResellerMinutes from "../components/reseller/ResellerMinutes";
import ResellerAuditLogs from "../components/reseller/ResellerAuditLogs";
import ResellerivrUploads from "../components/reseller/ResellerivrUploads";
import ResellerMOH from "../components/reseller/ResellerMOH";
import ResellerCarrier from "../components/reseller/ResellerCarrier";
import ResellerView from "../components/reseller/ResellerView";
import ResellerLiveExtension from "../components/reseller/ResellerLiveExtension";
import ResellerHistory from "../components/reseller/ResellerHistory";
import ResellerPermission from "../components/reseller/ResellerPermission";
import ResellerACL from "../components/reseller/ResellerACL";
import ResellerAssistant from "../components/reseller/ResellerAssistant";
import ResellerDidTfnNumber from "../components/reseller/ResellerDidTfnNumber";
import SessionExpired from "../pages/SessionExpired";
import AdminAclHistory from "../components/admin/AdminAclHistory";
import AdminProduct from "../components/admin/AdminProduct";
import AdminInvoice from "../components/admin/AdminInvoice";
import ManageAccounts from "../user_portals/manage_portal/ManageAccounts";
import AdminPayment from "../components/admin/AdminPayment";
import AdminAssign from "../components/admin/AdminAssign";
import AdminCMU from "../components/admin/AdminCMU";
import AdminNewDestination from "../components/admin/AdminNewDestination";

Chart.register(CategoryScale);
function PrivateRoute() {
  const user = JSON.parse(localStorage.getItem("admin"));
  const reseller = JSON.parse(localStorage.getItem("reseller"));
  const current_user = localStorage.getItem("current_user");

  const yValues = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // -------------

  //state
  const color = localStorage.getItem("theme-color");
  const [colorThem, setColorTheme] = useState(color);
  //console.log(colorThem)
  //alert(colorThem)

  //effect
  useEffect(() => {
    //check for selected the ///localstorage value
    const currentThemeColor = localStorage.getItem("them-color");
    //if found set selected theme value in state
    if (currentThemeColor) {
      setColorTheme(currentThemeColor);
    }
  }, []);

  //set theme
  const handleClick = (theme) => {
    //alert(theme)
    setColorTheme(theme);
    localStorage.setItem("theme-color", theme);
  };
  // -------------

  const [chartData, setChartData] = useState({
    type: "line",
    labels: yValues,
    datasets: [
      {
        data: [1000, 2000, 3000, 3100],
        borderColor: "red",
        backgroundColor: "red",
        fill: false,
      },
      {
        data: [300, 400, 600, 332],
        borderColor: "green",
        backgroundColor: "green",
        fill: false,
      },
      {
        data: [1000, 2000, 2500, 2768],
        borderColor: "blue",
        backgroundColor: "blue",
        fill: false,
      },
      {
        data: [1500, 2000, 4000, 400],
        borderColor: "yellow",
        backgroundColor: "yellow",
        fill: false,
      },
    ],
  });
  useEffect(() => {}, []);

  return (
    <>
      {/* <Sidebar/> */}
      <Switch>
        {user !== null ? (
          <>
            <Route
              path={Router.ADMIN_DASHBOARD}
              element={
                <AdminLayout colorThem={colorThem} handleClick={handleClick} />
              }
            >
              <Route
                path={Router.ADMIN_DASHBOARD}
                element={<AdminDashboard colorThem={colorThem} />}
              />
              <Route
                path={Router.ADMIN_USER}
                element={<User colorThem={colorThem} />}
              />
              <Route
                path={Router.ADMIN_ASSIGN}
                element={<AdminAssign colorThem={colorThem} />}
              />
              <Route
                path={Router.ADMIN_DID_TFN_NUMBER}
                element={<DidTfnNumber colorThem={colorThem} />}
              />
              <Route
                path={Router.ADMIN_DID_TFN_NUMBER_NEW}
                element={<AdminNewDestination colorThem={colorThem} />}
              />
              <Route
                path={Router.ADMIN_REPORT}
                element={<AdminReport colorThem={colorThem} />}
              />
              <Route
                path={Router.ADMIN_EXTENSION}
                element={<AdminExtension colorThem={colorThem} />}
              />
              <Route
                path={Router.ADMIN_PAYMENT}
                element={<AdminPayment colorThem={colorThem} />}
              />

              <Route
                path={Router.ADMIN_CALL_ACTIVE}
                element={<AdminCallActive colorThem={colorThem} />}
              />

              <Route
                path={Router.ADMIN_QUEUE_CALLS}
                element={<AdminQueueCalls colorThem={colorThem} />}
              />
              <Route
                path={Router.ADMIN_CALL_BLOCK}
                element={<AdminCallBlock colorThem={colorThem} />}
              />

              <Route
                path={Router.ADMIN_SERVER_STATS}
                element={<ServerStats colorThem={colorThem} />}
              />
              <Route
                path={Router.ADMIN_QUEUE}
                element={<AdminQueue colorThem={colorThem} />}
              />
              <Route
                path={Router.ADMIN_BILLING_MINUTES}
                element={<AdminBillingMinut colorThem={colorThem} />}
              />
              <Route
                path={Router.ADMIN_QUEUE_MEMBER}
                element={<AdminQueueMember colorThem={colorThem} />}
              />
              <Route
                path={Router.ADMIN_MINUTES}
                element={<AdminMinutes colorThem={colorThem} />}
              />
              <Route
                path={Router.ADMIN_CMU}
                element={<AdminCMU colorThem={colorThem}/>}
              />
              <Route
                path={Router.ADMIN_MDR}
                element={<AdminMDR colorThem={colorThem} />}
              />
              <Route
                path={Router.ADMIN_PRODUCT}
                element={<AdminProduct colorThem={colorThem} />}
              />
              <Route
                path={Router.ADMIN_INVOICE}
                element={<AdminInvoice colorThem={colorThem} />}
              />

              <Route
                path={Router.ADMIN_AUDIT_LOGS}
                element={<AdminAuditLog colorThem={colorThem} />}
              />
              <Route
                path={Router.ADMIN_IVR_UPLOADS}
                element={<AdminivrUploads colorThem={colorThem} />}
              />

              <Route
                path={Router.AdminMOH}
                element={<AdminMOH colorThem={colorThem} />}
              />

              <Route
                path={Router.ADMIN_CARRIER}
                element={<AdminCarrier colorThem={colorThem} />}
              />
              <Route
                path={Router.ADMIN_VIEW}
                element={<AdminView colorThem={colorThem} />}
              />
              <Route
                path={Router.ADMIN_LIVE_EXTENSION}
                element={<AdminLiveExtension colorThem={colorThem} />}
              />
              <Route
                path={Router.ADMIN_HISTORY}
                element={<AdminHistory colorThem={colorThem} />}
              />
              <Route
                path={Router.ADMIN_PERMISSIONS_ACCESS}
                element={<AdminPermission colorThem={colorThem} />}
              />
              <Route
                path={Router.ADMIN_ACL}
                element={<AdminACL colorThem={colorThem} />}
              />
              <Route
                path={Router.ADMIN_ACL_HISTORY}
                element={<AdminAclHistory colorThem={colorThem} />}
              />
              <Route
                path={Router.ADMIN_TFN_ASSISTANT}
                element={<AdminAssistant colorThem={colorThem} />}
              />
            </Route>
          </>
        ) : (
          <>
            <Route path="*" element={<SessionExpired />} />
          </>
        )}

        {reseller !== null ? (
          <>
            <Route
              path={Router.RESELLER_DASHBOARD}
              element={
                <ResellerLayout
                  colorThem={colorThem}
                  handleClick={handleClick}
                />
              }
            >
              <Route
                path={Router.RESELLER_DASHBOARD}
                element={<ResellerDashboard colorThem={colorThem} />}
              />
              <Route
                path={Router.RESELLER_USER}
                element={<ResellerUser colorThem={colorThem} />}
              />
              <Route
                path={Router.RESELLER_MANAGE_CAMPAIGN}
                element={<ResellerManageCampaign colorThem={colorThem} />}
              />
              <Route
                path="/reseller_portal/viewbuyer"
                element={<ResellerManageAddBuyer colorThem={colorThem} />}
              />
              <Route
                path={Router.RESELLER_DID_TFN_NUMBER}
                element={<ResellerDidTfnNumber colorThem={colorThem} />}
              />
              <Route
                path={Router.RESELLER_REPORT}
                element={<ResellerReport colorThem={colorThem} />}
              />
              <Route
                path={Router.RESELLER_EXTENSION}
                element={<ResellerExtension colorThem={colorThem} />}
              />

              <Route
                path={Router.RESELLER_CALL_ACTIVE}
                element={<ResellerCallActive colorThem={colorThem} />}
              />

              <Route
                path={Router.RESELLER_QUEUE_CALLS}
                element={<ResellerQueueCalls colorThem={colorThem} />}
              />
              <Route
                path={Router.RESELLER_CALL_BLOCK}
                element={<ResellerCallBlock colorThem={colorThem} />}
              />

              <Route
                path={Router.RESELLER_SERVER_STATS}
                element={<ResellerServerStats colorThem={colorThem} />}
              />
              <Route
                path={Router.RESELLER_QUEUE}
                element={<ResellerQueue colorThem={colorThem} />}
              />
              <Route
                path={Router.RESELLER_BILLING_MINUTES}
                element={<ResellerBillingMinut colorThem={colorThem} />}
              />
              <Route
                path={Router.RESELLER_QUEUE_MEMBER}
                element={<ResellerQueueMember colorThem={colorThem} />}
              />
              <Route
                path={Router.RESELLER_MINUTES}
                element={<ResellerMinutes colorThem={colorThem} />}
              />

              <Route
                path={Router.RESELLER_AUDIT_LOGS}
                element={<ResellerAuditLogs colorThem={colorThem} />}
              />
              <Route
                path={Router.RESELLER_IVR_UPLOADS}
                element={<ResellerivrUploads colorThem={colorThem} />}
              />

              <Route
                path={Router.RESELLER_MOH}
                element={<ResellerMOH colorThem={colorThem} />}
              />

              <Route
                path={Router.RESELLER_CARRIER}
                element={<ResellerCarrier colorThem={colorThem} />}
              />
              <Route
                path={Router.RESELLER_VIEW}
                element={<ResellerView colorThem={colorThem} />}
              />
              <Route
                path={Router.RESELLER_LIVE_EXTENSION}
                element={<ResellerLiveExtension colorThem={colorThem} />}
              />
              <Route
                path={Router.RESELLER_HISTORY}
                element={<ResellerHistory colorThem={colorThem} />}
              />
              <Route
                path={Router.RESELLER_PERMISSIONS_ACCESS}
                element={<ResellerPermission colorThem={colorThem} />}
              />
              <Route
                path={Router.RESELLER_ACL}
                element={<ResellerACL colorThem={colorThem} />}
              />
              <Route
                path={Router.RESELLER_TFN_ASSISTANT}
                element={<ResellerAssistant colorThem={colorThem} />}
              />
            </Route>
          </>
        ) : (
          <>
            <Route path="*" element={<SessionExpired />} />
          </>
        )}
        {current_user !== null ? (
          <>
            <Route path={Router.MANAGE_DASHBOARD} element={<ManageLayout />}>
              <Route index element={<ManageDashboard />} />
              <Route path={Router.MANAGE_EXTENSIONS} element={<Extension />} />
              <Route
                path={Router.MANAGE_CALL_CENTER}
                element={<CallCenter />}
              />
              <Route
                path={Router.MANAGE_OPERATOR_PANEL}
                element={<OperatorPanel />}
              />
              <Route
                path={Router.MANAGE_DESTINATION}
                element={<ManageDestination />}
              />
              <Route path={Router.MANAGE_REPORT} element={<Report />} />
              <Route
                path={Router.MANAGE_CALL_BLOCK}
                element={<ManageCallBlock />}
              />
              <Route
                path={Router.MANAGE_ACCOUNT}
                element={<ManageAccounts />}
              />

              <Route
                path={Router.MANAGE_CALL_ACTIVE}
                element={<ManageCallActive />}
              />
              <Route
                path={Router.MANAGE_RECORDING}
                element={<ManageRecording />}
              />
              <Route path={Router.MANAGE_MOH} element={<ManageMoh />} />
              <Route
                path={Router.MANAGE_LIVE_EXTENSION}
                element={<ManageLiveExtension />}
              />
              <Route path={Router.MANAGE_BILLING} element={<MangaeBilling />} />
              <Route path={Router.MANAGE_QUEUE} element={<ManageQueue />} />
              <Route
                path={Router.MANAGE_QUEUE_MEMBER}
                element={<ManageQueueMember />}
              />
              <Route
                path={Router.MANAGE_AUDIT_LOGS}
                element={<ManageAuditLogs />}
              />
            </Route>
          </>
        ) : (
          <>
            <Route path="*" element={<SessionExpired />} />
          </>
        )}
      </Switch>
    </>
  );
}

export default PrivateRoute;
