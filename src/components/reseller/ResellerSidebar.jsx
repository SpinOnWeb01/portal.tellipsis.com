import React, { useState, useRef, useEffect } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { useNavigate } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';
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
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import HistoryIcon from "@mui/icons-material/History";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import PhoneDisabledIcon from "@mui/icons-material/PhoneDisabled";
import RingVolumeIcon from "@mui/icons-material/RingVolume";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";

// ========Mobile-sidebar===============>
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
// ========End Mobile-sidebar===============>

function ResellerSidebar({ colorThem }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("reseller"));
  const [open, setOpen] = React.useState(false);
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
            onClick={() => navigateTo(Router.RESELLER_DASHBOARD)}
          >
            Dashboard
          </MenuItem>
          <MenuItem
            icon={<PeopleOutlinedIcon />}
            onClick={() => navigateTo(Router.RESELLER_USER)}
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
              icon={<ReceiptOutlinedIcon />}
              onClick={(event) =>
                handleSubMenuClick(event, Router.RESELLER_DID_TFN_NUMBER)
              }
            >
              DID/TFN Number
            </MenuItem>
            <MenuItem
              icon={<StyleIcon />}
              onClick={(event) =>
                handleSubMenuClick(event, Router.RESELLER_TFN_ASSISTANT)
              }
            >
              TFN Suspend
            </MenuItem>
          </SubMenu>
          <MenuItem
            icon={<CalendarTodayOutlinedIcon />}
            onClick={() => navigateTo(Router.RESELLER_EXTENSION)}
          >
            Extension
          </MenuItem>
          <MenuItem
            icon={<HelpOutlineOutlinedIcon />}
            onClick={() => navigateTo(Router.RESELLER_REPORT)}
          >
            Report
          </MenuItem>
          <MenuItem
            icon={<Call />}
            onClick={() => navigateTo(Router.RESELLER_CALL_ACTIVE)}
          >
            Active Calls
          </MenuItem>
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
              onClick={(event) => handleSubMenuClick(event, Router.RESELLER_QUEUE)}
            >
              Queue
            </MenuItem>
            <Tooltip title="Queue Members" disableInteractive interactive>
              <MenuItem
                icon={<GroupAddIcon />}
                onClick={(event) =>
                  handleSubMenuClick(event, Router.RESELLER_QUEUE_MEMBER)
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
                handleSubMenuClick(event, Router.RESELLER_BILLING_MINUTES)
              }
            >
              Minutes
            </MenuItem>
            <MenuItem
                            icon={<HistoryToggleOffIcon />}
                            onClick={(event) =>
                              handleSubMenuClick(event, Router.RESELLER_MDR)
                            }
                          >
                            MDR
                          </MenuItem>
            <MenuItem
              icon={<AvTimerIcon />}
              onClick={(event) =>
                handleSubMenuClick(event, Router.RESELLER_MINUTES)
              }
            >
              Details
            </MenuItem>

            <MenuItem
              icon={<HistoryIcon />}
              onClick={(event) =>
                handleSubMenuClick(event, Router.RESELLER_HISTORY)
              }
            >
              History
            </MenuItem>
          </SubMenu>
          <SubMenu
            title="Settings"
            icon={<SettingsIcon />}
            onClick={() => handleSubMenu()}
            open={openSettingMenu === "setting"}
          >
           
            <MenuItem
              icon={<VerifiedUserIcon />}
              onClick={(event) =>
                handleSubMenuClick(event, Router.RESELLER_AUDIT_LOGS)
              }
            >
              Audit logs
            </MenuItem>
           
          </SubMenu>
        </Menu>
      </ProSidebar>
    </Box>
  );

  return (
    <>
      {user?.user_role === "SuperAdmin" ||
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
                        {/* <Button className='menu_icon_button_box' style={{ position: "relative", zIndex: "999", top: "-40px" }} onClick={toggleDrawer(true)}> */}
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
                      id="RESELLER_sidebar"
                      style={{ background: "#ffffff", color: "black" }}
                    >
                      <Menu iconShape="square">
                        <MenuItem
                          icon={<HomeOutlinedIcon />}
                          onClick={() => navigateTo(Router.RESELLER_DASHBOARD)}
                        >
                          Dashboard
                        </MenuItem>
                        {user?.permissions?.map((item, index) => {
                          return (
                            <>
                              {item === "list_user" ? (
                                <>
                                  <MenuItem
                                    icon={<PeopleOutlinedIcon />}
                                    onClick={() =>
                                      navigateTo(Router.RESELLER_USER)
                                    }
                                  >
                                    User
                                  </MenuItem>
                                </>
                              ) : (
                                <></>
                              )}
                            </>
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
                            icon={<ReceiptOutlinedIcon />}
                            onClick={(event) =>
                              handleSubMenuClick(
                                event,
                                Router.RESELLER_DID_TFN_NUMBER
                              )
                            }
                          >
                            DID/TFN Number
                          </MenuItem>
                          {user.user_role === "Reseller" ? (
                            <></>
                          ) : (
                            <>
                              {" "}
                              <MenuItem
                                icon={<StyleIcon />}
                                onClick={(event) =>
                                  handleSubMenuClick(
                                    event,
                                    Router.RESELLER_TFN_ASSISTANT
                                  )
                                }
                              >
                                TFN Suspend
                              </MenuItem>
                            </>
                          )}
                        </SubMenu>
                        <MenuItem
                          icon={<CalendarTodayOutlinedIcon />}
                          onClick={() => navigateTo(Router.RESELLER_EXTENSION)}
                        >
                          Extension
                        </MenuItem>
                        {user.user_role === "Reseller" ? (
                          <></>
                        ) : (
                          <>
                            <MenuItem
                              icon={<HelpOutlineOutlinedIcon />}
                              onClick={() => navigateTo(Router.RESELLER_REPORT)}
                            >
                              Report
                            </MenuItem>
                          </>
                        )}

                        {user.user_role === "Reseller" ? (
                          <></>
                        ) : (
                          <>
                            <SubMenu
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
                                    Router.RESELLER_CALL_ACTIVE
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
                                      Router.RESELLER_QUEUE_CALLS
                                    )
                                  }
                                >
                                  Queue Calls
                                </MenuItem>
                              </Tooltip>
                            </SubMenu>
                          </>
                        )}

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
                              handleSubMenuClick(event, Router.RESELLER_QUEUE)
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
                                  Router.RESELLER_QUEUE_MEMBER
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
                handleSubMenuClick(event, Router.RESELLER_BILLING_MINUTES)
              }
            >
              Usage Minutes
            </MenuItem>
                          </>) : (<></>)}
                          
                          <MenuItem
                            icon={<QueryBuilderIcon />}
                            onClick={(event) =>
                              handleSubMenuClick(event, Router.RESELLER_MINUTES)
                            }
                          >
                            Details
                          </MenuItem>
                          

                          <MenuItem
                            icon={<HistoryIcon />}
                            onClick={(event) =>
                              handleSubMenuClick(event, Router.RESELLER_HISTORY)
                            }
                          >
                            History
                          </MenuItem>
                        </SubMenu>
                        {/* <MenuItem icon={<AvTimerIcon />} onClick={() => navigateTo(Router.RESELLER_MINUTES)}>
                          Billing
                        </MenuItem> */}
                      
                        <SubMenu
                          title="Settings"
                          icon={<SettingsIcon />}
                          onClick={() => handleSubMenu()}
                          open={openSettingMenu === "setting"}
                        >
                          <MenuItem
                            icon={<VerifiedUserIcon />}
                            onClick={(event) =>
                              handleSubMenuClick(event, Router.RESELLER_AUDIT_LOGS)
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
                                  handleSubMenuClick(event, Router.RESELLER_ACL)
                                }
                              >
                                ACL
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
                                    Router.RESELLER_PERMISSIONS_ACCESS
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
                                    Router.RESELLER_SERVER_STATS
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

export default ResellerSidebar;
