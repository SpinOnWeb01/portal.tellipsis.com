import React, { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { useNavigate } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import AssignmentIcon from "@mui/icons-material/Assignment";
import FormatOverlineIcon from "@mui/icons-material/FormatOverline";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import ChangeHistoryIcon from "@mui/icons-material/ChangeHistory";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import { Box, IconButton, Tooltip } from "@mui/material";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import ReceiptIcon from "@mui/icons-material/Receipt";
import Router from "../../routes/route";
import KeyIcon from "@mui/icons-material/Key";
import { Call } from "@mui/icons-material";
import AddToQueueIcon from "@mui/icons-material/AddToQueue";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import StyleIcon from "@mui/icons-material/Style";
import SettingsIcon from "@mui/icons-material/Settings";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import QueueMusicIcon from "@mui/icons-material/PlayCircleRounded";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import HistoryIcon from "@mui/icons-material/History";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import PhoneDisabledIcon from "@mui/icons-material/PhoneDisabled";
import AddCardIcon from "@mui/icons-material/AddCard";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

// ========Mobile-sidebar===============>
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
// ========End Mobile-sidebar===============>

function Sidebar({ colorThem }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("admin"));
  const [open, setOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const [openSettingMenu, setOpenSettingMenu] = useState(null);
  const navigateTo = (route) => {
    setOpen(false);
    navigate(route);
    setOpenSubMenu(null); // Close submenu when navigating to a different route
    setOpenSettingMenu(null);
  };
  const drawerWidth = 240;
  const menuWidth = 200;

  const handleSubMenu = () => {
    if (openSettingMenu !== "setting") {
      setOpenSettingMenu("setting");
    } else if (openSettingMenu === "setting") {
      setOpenSettingMenu(null);
    }
  };

  const handleSubMenuClick = (event, route) => {
    event.stopPropagation(); // Prevent event bubbling
    navigate(route);
    setOpen(false);
    // if(openSettingMenu)
    // {

    // setOpenSubMenu(null);
    // }
    // if(openSubMenu){
    //   setOpenSettingMenu(null)
    //    }
  };

  // ======Mobile sidebar======>

  const toggleDrawer = () => () => {
    setOpen((prevState) => !prevState);
  };

  useEffect(() => {
    // Close the sidebar when switching between mobile and desktop views
    setOpen(false);
  }, [drawerWidth]);


  const DrawerList = (
    <Box id="side_bar_screen" sx={{ width: menuWidth }} role="presentation">
      <ProSidebar id="admin_sidebar" style={{ background: "#ffffff" }}>
        <Menu iconShape="square">
          <MenuItem
            icon={<HomeOutlinedIcon />}
            onClick={() => navigateTo(Router.ADMIN_DASHBOARD)}
          >
            Dashboard
          </MenuItem>
          <MenuItem
            icon={<PeopleOutlinedIcon />}
            onClick={() => navigateTo(Router.ADMIN_USER)}
          >
            User
          </MenuItem>
          
          <SubMenu
            title="Destination"
            icon={<ReceiptOutlinedIcon />}
            onClick={() =>
              setOpenSubMenu(
                openSubMenu === "destination" ? null : "destination"
              )
            }
            open={openSubMenu === "destination"}
          >
            <MenuItem
              icon={<AssignmentIcon />}
              onClick={(event) =>
                handleSubMenuClick(event, Router.ADMIN_ASSIGN)
              }
            >
              Assigned
            </MenuItem>
            <MenuItem
              icon={<FormatOverlineIcon />}
              onClick={(event) =>
                handleSubMenuClick(event, Router.ADMIN_DID_TFN_NUMBER)
              }
            >
              Unassigned
            </MenuItem>
            <MenuItem
              icon={<StyleIcon />}
              onClick={(event) =>
                handleSubMenuClick(event, Router.ADMIN_TFN_ASSISTANT)
              }
            >
              Suspended
            </MenuItem>
          </SubMenu>
          <MenuItem
            icon={<FormatOverlineIcon />}
            onClick={() => navigateTo(Router.ADMIN_DID_TFN_NUMBER_NEW)}
          >
            Did Number
          </MenuItem>

          <MenuItem
            icon={<CalendarTodayOutlinedIcon />}
            onClick={() => navigateTo(Router.ADMIN_EXTENSION)}
          >
            Extension
          </MenuItem>
          <MenuItem
            icon={<AddCardIcon />}
            onClick={() => navigateTo(Router.ADMIN_PAYMENT)}
          >
            Payment
          </MenuItem>
          <MenuItem
            icon={<HelpOutlineOutlinedIcon />}
            onClick={() => navigateTo(Router.ADMIN_REPORT)}
          >
            Report
          </MenuItem>
          <MenuItem
            icon={<Call />}
            onClick={() => navigateTo(Router.ADMIN_CALL_ACTIVE)}
          >
            Live Calls
          </MenuItem>

          {/* <SubMenu
                              title="Live Calls"
                              icon={<RingVolumeIcon />}
                              onClick={() =>
                                setOpenSubMenu(
                                  openSubMenu === "livecalls"
                                    ? null
                                    : "livecalls"
                                )
                              }
                              open={openSubMenu === "livecalls"}
                            >
                              <MenuItem
                                icon={<Call />}
                                onClick={(event) =>
                                  handleSubMenuClick(
                                    event,
                                    Router.ADMIN_CALL_ACTIVE
                                  )
                                }
                              >
                                Active Calls
                              </MenuItem>

                              <Tooltip
                                title="Queue Calls"
                                disableInteractive
                                interactive
                              >
                                <MenuItem
                                  icon={<AddIcCallIcon />}
                                  onClick={(event) =>
                                    handleSubMenuClick(
                                      event,
                                      Router.ADMIN_QUEUE_CALLS
                                    )
                                  }
                                >
                                  Queue Calls
                                </MenuItem>
                              </Tooltip>
                            </SubMenu> */}

          {/* ==add-menu======= */}
          <SubMenu
            title=" All Products"
            icon={<AddToQueueIcon />}
            onClick={() =>
              setOpenSubMenu(openSubMenu === "products" ? null : "products")
            }
            open={openSubMenu === "products"}
          >
            <MenuItem
              icon={<CardGiftcardIcon />}
              onClick={(event) =>
                handleSubMenuClick(event, Router.ADMIN_PRODUCT)
              }
            >
              Products
            </MenuItem>
            <Tooltip title="Invoice" disableInteractive interactive>
              <MenuItem
                icon={<ReceiptIcon />}
                onClick={(event) =>
                  handleSubMenuClick(event, Router.ADMIN_INVOICE)
                }
              >
                Invoice
              </MenuItem>
            </Tooltip>
          </SubMenu>
          {/* ===End-add-menu======= */}

          <SubMenu
            title="Queues"
            icon={<AddToQueueIcon />}
            onClick={() =>
              setOpenSubMenu(openSubMenu === "queues" ? null : "queues")
            }
            open={openSubMenu === "queues"}
          >
            <MenuItem
              icon={<AddToQueueIcon />}
              onClick={(event) => handleSubMenuClick(event, Router.ADMIN_QUEUE)}
            >
              Queue
            </MenuItem>
            <Tooltip title="Queue Members" disableInteractive interactive>
              <MenuItem
                icon={<GroupAddIcon />}
                onClick={(event) =>
                  handleSubMenuClick(event, Router.ADMIN_QUEUE_MEMBER)
                }
              >
                Members
              </MenuItem>
            </Tooltip>
          </SubMenu>

          <SubMenu
            title="Billing"
            icon={<AccountBalanceWalletIcon />}
            onClick={() =>
              setOpenSubMenu(openSubMenu === "billing" ? null : "billing")
            }
            open={openSubMenu === "billing"}
          >
            <MenuItem
              icon={<AvTimerIcon />}
              onClick={(event) =>
                handleSubMenuClick(event, Router.ADMIN_BILLING_MINUTES)
              }
            >
              Usage Minutes
            </MenuItem>
            {/* <MenuItem
                            icon={<HistoryToggleOffIcon />}
                            onClick={(event) =>
                              handleSubMenuClick(event, Router.ADMIN_MDR)
                            }
                          >
                            MDR
                          </MenuItem> */}
            <MenuItem
              icon={<AvTimerIcon />}
              onClick={(event) =>
                handleSubMenuClick(event, Router.ADMIN_MINUTES)
              }
            >
              Details
            </MenuItem>

            <MenuItem
              icon={<HistoryIcon />}
              onClick={(event) =>
                handleSubMenuClick(event, Router.ADMIN_HISTORY)
              }
            >
              RCR
            </MenuItem>
            <MenuItem
              icon={<CalendarMonthIcon />}
              onClick={(event) => handleSubMenuClick(event, Router.ADMIN_CMU)}
            >
              CMU
            </MenuItem>
          </SubMenu>
          {/* <MenuItem icon={<AvTimerIcon />} onClick={() => navigateTo(Router.ADMIN_MINUTES)}>
                          Billing
                        </MenuItem> */}

          <MenuItem
            icon={<PhoneDisabledIcon />}
            onClick={() => navigateTo(Router.ADMIN_CALL_BLOCK)}
          >
            Call Block
          </MenuItem>
          <MenuItem
            icon={<StyleIcon />}
            onClick={() => navigateTo(Router.ADMIN_CARRIER)}
          >
            Outbound Carrier
          </MenuItem>
          <MenuItem
            icon={<DynamicFeedIcon />}
            onClick={() => navigateTo(Router.ADMIN_LIVE_EXTENSION)}
          >
            SIP Registrations
          </MenuItem>
          <SubMenu
            title="Settings"
            icon={<SettingsIcon />}
            onClick={() => handleSubMenu()}
            open={openSettingMenu === "setting"}
          >
            <MenuItem
              id="recording"
              icon={<RecordVoiceOverIcon />}
              onClick={(event) =>
                handleSubMenuClick(event, Router.ADMIN_IVR_UPLOADS)
              }
            >
              Recordings
            </MenuItem>
            <MenuItem
              icon={<QueueMusicIcon />}
              onClick={(event) => handleSubMenuClick(event, Router.AdminMOH)}
            >
              MOH
            </MenuItem>
            <MenuItem
              icon={<VerifiedUserIcon />}
              onClick={(event) =>
                handleSubMenuClick(event, Router.ADMIN_AUDIT_LOGS)
              }
            >
              Audit logs
            </MenuItem>
            <MenuItem
              icon={<KeyIcon />}
              onClick={(event) => handleSubMenuClick(event, Router.ADMIN_ACL)}
            >
              ACL
            </MenuItem>
            <MenuItem
              icon={<ChangeHistoryIcon />}
              onClick={(event) =>
                handleSubMenuClick(event, Router.ADMIN_ACL_HISTORY)
              }
            >
              ACL History
            </MenuItem>
            <MenuItem
              icon={<AssignmentIndIcon />}
              onClick={(event) =>
                handleSubMenuClick(event, Router.ADMIN_PERMISSIONS_ACCESS)
              }
            >
              Permissions
            </MenuItem>
            <MenuItem
              icon={<QueryStatsIcon />}
              onClick={(event) =>
                handleSubMenuClick(event, Router.ADMIN_SERVER_STATS)
              }
            >
              Server Stats
            </MenuItem>
          </SubMenu>
        </Menu>
      </ProSidebar>
    </Box>
  );

  return (
    <>
      {user?.user_role === "Superadmin" ||
      user?.user_role === "Admin" ||
      user?.user_role === "Reseller" ? (
        <>
          <div id="app" style={{}}>
            <Box
              sx={{
                "& .pro-sidebar-inner": {
                  background: `#0e397f !important`,
                  width: `240px`,
                  height: "100vh !important",
                },
                "& .pro-icon-wrapper": {
                  backgroundColor: "transparent !important",
                },
                "& .pro-inner-item": {
                  padding: "5px 35px 5px 20px !important",
                  borderBottom: "1px solid #042253",
                  color: "#fff",
                },
                "& .pro-inner-item:hover": {
                  color: "#f5751d !important",
                },
                "& .pro-menu-item.active": {
                  color: "#fff !important",
                },
              }}
            >
              <div className={`App ${colorThem} `}>
                <div className="contant_box">
                  <Box
                    className="right_sidebox pt-4 d-lg-none d-md-none d-sm-none d-xs-block d-block"
                    component="main"
                    sx={{
                      flexGrow: 1,
                      p: 3,
                      width: { sm: `calc(100% - ${drawerWidth}px)` },
                    }}
                  >
                    <div className="row">
                      <div className="col-12">
                        <IconButton
                          style={{
                            position: "relative",
                            zIndex: "999",
                            top: "-40px",
                          }}
                          className="menu_icon_button menu_icon_button_box"
                          onClick={toggleDrawer(true)}
                        >
                          <MenuIcon />
                        </IconButton>
                        {/* </Button> */}
                        <Drawer open={open} onClose={toggleDrawer(false)}>
                          {DrawerList}
                        </Drawer>
                      </div>
                    </div>
                  </Box>

                  <div className="d-lg-block d-md-block d-sm-block d-xs-none d-none side_bar_media">
                    <ProSidebar
                      id="admin_sidebar"
                      style={{ background: "#ffffff", color: "black" }}
                    >
                      <Menu iconShape="square">
                        <MenuItem
                          icon={<HomeOutlinedIcon />}
                          onClick={() => navigateTo(Router.ADMIN_DASHBOARD)}
                        >
                          Dashboard
                        </MenuItem>
                        {user?.permissions?.map((item, index) => {
                          return (
                            <div key={index}>
                              {item === "list_user" ? (
                                <>
                                  <MenuItem
                                    icon={<PeopleOutlinedIcon />}
                                    onClick={() =>
                                      navigateTo(Router.ADMIN_USER)
                                    }
                                  >
                                    User
                                  </MenuItem>
                                </>
                              ) : (
                                <></>
                              )}
                            </div>
                          );
                        })}

                       

                        <SubMenu
                          title="Destination"
                          icon={<ReceiptOutlinedIcon />}
                          onClick={() =>
                            setOpenSubMenu(
                              openSubMenu === "destination"
                                ? null
                                : "destination"
                            )
                          }
                          open={openSubMenu === "destination"}
                        >
                          <MenuItem
                            icon={<AssignmentIcon />}
                            onClick={(event) =>
                              handleSubMenuClick(event, Router.ADMIN_ASSIGN)
                            }
                          >
                            Assigned
                          </MenuItem>
                          <MenuItem
                            icon={<FormatOverlineIcon />}
                            onClick={(event) =>
                              handleSubMenuClick(
                                event,
                                Router.ADMIN_DID_TFN_NUMBER
                              )
                            }
                          >
                            Unassigned
                          </MenuItem>
                          {user.user_role === "Reseller" ? (
                            <></>
                          ) : (
                            <>
                              <MenuItem
                                icon={<StyleIcon />}
                                onClick={(event) =>
                                  handleSubMenuClick(
                                    event,
                                    Router.ADMIN_TFN_ASSISTANT
                                  )
                                }
                              >
                                Suspended
                              </MenuItem>
                            </>
                          )}
                        </SubMenu>
                         <MenuItem
                          icon={<FormatOverlineIcon />}
                          onClick={() =>
                            navigateTo(Router.ADMIN_DID_TFN_NUMBER_NEW)
                          }
                        >
                          Did Number
                        </MenuItem>
                        <MenuItem
                          icon={<CalendarTodayOutlinedIcon />}
                          onClick={() => navigateTo(Router.ADMIN_EXTENSION)}
                        >
                          Extension
                        </MenuItem>
                        <MenuItem
                          icon={<AddCardIcon />}
                          onClick={() => navigateTo(Router.ADMIN_PAYMENT)}
                        >
                          Payment
                        </MenuItem>
                        {user.user_role === "Reseller" ? (
                          <></>
                        ) : (
                          <>
                            <MenuItem
                              icon={<HelpOutlineOutlinedIcon />}
                              onClick={() => navigateTo(Router.ADMIN_REPORT)}
                            >
                              Report
                            </MenuItem>
                          </>
                        )}
                        {user.user_role === "Reseller" ? (
                          <></>
                        ) : (
                          <>
                            <MenuItem
                              icon={<Call />}
                              onClick={() =>
                                navigateTo(Router.ADMIN_CALL_ACTIVE)
                              }
                            >
                              Live Calls
                            </MenuItem>
                            {/* <SubMenu
                              title="Live Calls"
                              icon={<RingVolumeIcon />}
                              onClick={() =>
                                setOpenSubMenu(
                                  openSubMenu === "livecalls"
                                    ? null
                                    : "livecalls"
                                )
                              }
                              open={openSubMenu === "livecalls"}
                            >
                              <MenuItem
                                icon={<Call />}
                                onClick={(event) =>
                                  handleSubMenuClick(
                                    event,
                                    Router.ADMIN_CALL_ACTIVE
                                  )
                                }
                              >
                                Active Calls
                              </MenuItem>

                              <Tooltip
                                title="Queue Calls"
                                disableInteractive
                                interactive
                              >
                                <MenuItem
                                  icon={<AddIcCallIcon />}
                                  onClick={(event) =>
                                    handleSubMenuClick(
                                      event,
                                      Router.ADMIN_QUEUE_CALLS
                                    )
                                  }
                                >
                                  Queue Calls
                                </MenuItem>
                              </Tooltip>
                            </SubMenu> */}
                          </>
                        )}

                        {/* ==add-menu======= */}
                        <SubMenu
                          title=" All Products"
                          icon={<AddToQueueIcon />}
                          onClick={() =>
                            setOpenSubMenu(
                              openSubMenu === "products" ? null : "products"
                            )
                          }
                          open={openSubMenu === "products"}
                        >
                          <MenuItem
                            icon={<CardGiftcardIcon />}
                            onClick={(event) =>
                              handleSubMenuClick(event, Router.ADMIN_PRODUCT)
                            }
                          >
                            Products
                          </MenuItem>
                          <Tooltip
                            title="Invoice"
                            disableInteractive
                            interactive
                          >
                            <MenuItem
                              icon={<ReceiptIcon />}
                              onClick={(event) =>
                                handleSubMenuClick(event, Router.ADMIN_INVOICE)
                              }
                            >
                              Invoice
                            </MenuItem>
                          </Tooltip>
                        </SubMenu>
                        {/* ===End-add-menu======= */}

                        <SubMenu
                          title="Queues"
                          icon={<AddToQueueIcon />}
                          onClick={() =>
                            setOpenSubMenu(
                              openSubMenu === "queues" ? null : "queues"
                            )
                          }
                          open={openSubMenu === "queues"}
                        >
                          <MenuItem
                            icon={<AddToQueueIcon />}
                            onClick={(event) =>
                              handleSubMenuClick(event, Router.ADMIN_QUEUE)
                            }
                          >
                            Queue
                          </MenuItem>
                          <Tooltip
                            title="Queue Members"
                            disableInteractive
                            interactive
                          >
                            <MenuItem
                              icon={<GroupAddIcon />}
                              onClick={(event) =>
                                handleSubMenuClick(
                                  event,
                                  Router.ADMIN_QUEUE_MEMBER
                                )
                              }
                            >
                              Members
                            </MenuItem>
                          </Tooltip>
                        </SubMenu>
                        <SubMenu
                          title="Billing"
                          icon={<AccountBalanceWalletIcon />}
                          onClick={() =>
                            setOpenSubMenu(
                              openSubMenu === "billing" ? null : "billing"
                            )
                          }
                          open={openSubMenu === "billing"}
                        >
                          {user.user_role !== "Reseller" ? (
                            <>
                              <MenuItem
                                icon={<AvTimerIcon />}
                                onClick={(event) =>
                                  handleSubMenuClick(
                                    event,
                                    Router.ADMIN_BILLING_MINUTES
                                  )
                                }
                              >
                                Usage Minutes
                              </MenuItem>
                            </>
                          ) : (
                            <></>
                          )}

                          {/* <MenuItem
                            icon={<HistoryToggleOffIcon />}
                            onClick={(event) =>
                              handleSubMenuClick(event, Router.ADMIN_MDR)
                            }
                          >
                            MDR
                          </MenuItem> */}
                          <MenuItem
                            icon={<QueryBuilderIcon />}
                            onClick={(event) =>
                              handleSubMenuClick(event, Router.ADMIN_MINUTES)
                            }
                          >
                            Details
                          </MenuItem>

                          <MenuItem
                            icon={<HistoryIcon />}
                            onClick={(event) =>
                              handleSubMenuClick(event, Router.ADMIN_HISTORY)
                            }
                          >
                            RCR
                          </MenuItem>
                          <MenuItem
                            icon={<CalendarMonthIcon />}
                            onClick={(event) =>
                              handleSubMenuClick(event, Router.ADMIN_CMU)
                            }
                          >
                            CMU
                          </MenuItem>
                        </SubMenu>
                        {/* <MenuItem icon={<AvTimerIcon />} onClick={() => navigateTo(Router.ADMIN_MINUTES)}>
                          Billing
                        </MenuItem> */}
                        <MenuItem
                          icon={<PhoneDisabledIcon />}
                          onClick={() => navigateTo(Router.ADMIN_CALL_BLOCK)}
                        >
                          Call Block
                        </MenuItem>
                        {user.user_role === "Reseller" ? (
                          <></>
                        ) : (
                          <>
                            {" "}
                            <MenuItem
                              icon={<StyleIcon />}
                              onClick={() => navigateTo(Router.ADMIN_CARRIER)}
                            >
                              Outbound Carrier
                            </MenuItem>
                          </>
                        )}
                        <MenuItem
                          icon={<DynamicFeedIcon />}
                          onClick={() =>
                            navigateTo(Router.ADMIN_LIVE_EXTENSION)
                          }
                        >
                          SIP Registrations
                        </MenuItem>
                        <SubMenu
                          title="Settings"
                          icon={<SettingsIcon />}
                          onClick={() => handleSubMenu()}
                          open={openSettingMenu === "setting"}
                        >
                          <MenuItem
                            id="recording"
                            icon={<RecordVoiceOverIcon />}
                            onClick={(event) =>
                              handleSubMenuClick(
                                event,
                                Router.ADMIN_IVR_UPLOADS
                              )
                            }
                          >
                            Recordings
                          </MenuItem>
                          <MenuItem
                            icon={<QueueMusicIcon />}
                            onClick={(event) =>
                              handleSubMenuClick(event, Router.AdminMOH)
                            }
                          >
                            MOH
                          </MenuItem>
                          <MenuItem
                            icon={<VerifiedUserIcon />}
                            onClick={(event) =>
                              handleSubMenuClick(event, Router.ADMIN_AUDIT_LOGS)
                            }
                          >
                            Audit logs
                          </MenuItem>
                          {user.user_role === "Reseller" ? (
                            <></>
                          ) : (
                            <>
                              {" "}
                              <MenuItem
                                icon={<KeyIcon />}
                                onClick={(event) =>
                                  handleSubMenuClick(event, Router.ADMIN_ACL)
                                }
                              >
                                ACL
                              </MenuItem>
                              <MenuItem
                                icon={<ChangeHistoryIcon />}
                                onClick={(event) =>
                                  handleSubMenuClick(
                                    event,
                                    Router.ADMIN_ACL_HISTORY
                                  )
                                }
                              >
                                ACL History
                              </MenuItem>
                            </>
                          )}
                          {user.user_role === "Reseller" ? (
                            <></>
                          ) : (
                            <>
                              {" "}
                              <MenuItem
                                icon={<AssignmentIndIcon />}
                                onClick={(event) =>
                                  handleSubMenuClick(
                                    event,
                                    Router.ADMIN_PERMISSIONS_ACCESS
                                  )
                                }
                              >
                                Permissions
                              </MenuItem>
                            </>
                          )}
                          {user.user_role === "Reseller" ? (
                            <></>
                          ) : (
                            <>
                              {" "}
                              <MenuItem
                                icon={<QueryStatsIcon />}
                                onClick={(event) =>
                                  handleSubMenuClick(
                                    event,
                                    Router.ADMIN_SERVER_STATS
                                  )
                                }
                              >
                                Server Stats
                              </MenuItem>
                            </>
                          )}
                        </SubMenu>
                      </Menu>
                    </ProSidebar>
                  </div>
                </div>
              </div>
            </Box>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default Sidebar;
