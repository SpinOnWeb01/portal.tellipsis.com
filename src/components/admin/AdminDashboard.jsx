import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import PieChart from "../chart/PieChart";
import Heatmap from "../chart/Heatmap";
import Barchart from "../chart/Barchart";
import Chordchart from "../chart/Chordchart";
import GroupsIcon from '@mui/icons-material/Groups';

import "../../Switcher.scss";
import { getDashboardChart } from "../../redux/actions/adminPortal/adminPortal_dashboardAction";
import { useDispatch, useSelector } from "react-redux";
import { getExtension } from "../../redux/actions/adminPortal/extensionAction";
import { getDid } from "../../redux/actions/adminPortal/destinationAction";
import { getReport } from "../../redux/actions/adminPortal/reportAction";
import { getAdminQueue } from "../../redux/actions/adminPortal/adminPortal_queueAction";
import Adminbarchart from "../chart/Adminbarchart";
import { useLocation } from 'react-router-dom';
import LineChart from "../chart/Linechart";
import { IconBase } from "react-icons/lib";
import { api } from "../../mockData";
import axios from "axios";
const drawerWidth = 240;
function AdminDashboard({ colorThem }) {
  const state = useSelector((state) => state);
  const token = JSON.parse(localStorage.getItem("admin"));
  const [callsSummary, setCallsSummary] = useState({});
  const dispatch = useDispatch();
  

  useEffect(() => {
  
          dispatch(getDashboardChart())
          dispatch(getExtension(""))
          dispatch(getDid())
          dispatch(getAdminQueue())
   
    
  }, [dispatch]);

  useEffect(()=>{
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${api.dev}/api/calls_summary`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.access_token} `,
      },
    };
    axios
      .request(config)
      .then((response) => {
        setCallsSummary(response?.data?.data)
      })
      .catch((error) => {
      });
    
  },[])



  return (
    <>
      <div className={`App ${colorThem} `}>
        <div className="contant_box">
          <Box
            className="right_sidebox mobile_top_pddng"
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              width: { sm: `calc(100% - ${drawerWidth}px)` },
            }}
          >

<div className="row pb-3">
            <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <div className="dashboard_card_row d_card_one mb-2">
                <div className="d_card_left">
                  <Typography variant="h2">Total missed calls</Typography>
                  <Typography variant="h3">{callsSummary.Missed}</Typography>
                  <Typography variant="h4">today</Typography>
                </div>
                <div className="d_card_right">
                  <IconBase className="d_icon">
                     <GroupsIcon />
                  </IconBase>
                </div>
              </div>
            </div>

            {/* <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12">
              <div className="dashboard_card_row d_card_two mb-2">
                <div className="d_card_left">
                  <Typography variant="h2">Total unique calls</Typography>
                  <Typography variant="h3">0</Typography>
                  <Typography variant="h4">today</Typography>
                </div>
                <div className="d_card_right">
                  <IconBase className="d_icon">
                     <GroupsIcon />
                  </IconBase>
                </div>
              </div>
            </div> */}

            <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <div className="dashboard_card_row d_card_three mb-2">
                <div className="d_card_left">
                  <Typography variant="h2">Total calls </Typography>
                  <Typography variant="h3">{callsSummary.Total}</Typography>
                  <Typography variant="h4">today</Typography>
                </div>
                <div className="d_card_right">
                  <IconBase className="d_icon">
                     <GroupsIcon />
                  </IconBase>
                </div>
              </div>
            </div>

            <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <div className="dashboard_card_row d_card_four mb-0">
                <div className="d_card_left">
                  <Typography variant="h2">Total Answered calls</Typography>
                  <Typography variant="h3">{callsSummary.Answered}</Typography>
                  <Typography variant="h4">today</Typography>
                </div>
                <div className="d_card_right">
                  <IconBase className="d_icon">
                     <GroupsIcon />
                  </IconBase>
                </div>
              </div>
            </div>


            {/* <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12">
              <div className="dashboard_card_row d_card_four mb-0">
                <div className="d_card_left">
                  <Typography variant="h2">Total Active calls
                  </Typography>
                  <Typography variant="h3">0</Typography>
                  <Typography variant="h4">today</Typography>
                </div>
                <div className="d_card_right">
                  <IconBase className="d_icon">
                     <GroupsIcon />
                  </IconBase>
                </div>
              </div>
            </div> */}
           </div>


           <div className="row">
              <div className="col-lg-6 ">
              <div className="pie-container">
              <h4>Calls Minutes Summary</h4>
                <PieChart />
              </div>
              </div>

            

              {/* <div className="col-lg-6 mt-4">
                <Heatmap />
              </div>
              */}

              <div className="col-lg-6 ">
              <div className="pie-container">
              <h4>User Extension Limits</h4>
                <Adminbarchart />
              </div> 
              </div>

              {/* <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                <div className="dshbrd_list_row">
                  <h4 className="dshbrd_list_title">category</h4>
                  <ul>
                    <li>
                      <h4>order</h4>
                      <div className="d-flex justify-content-between align-items-center">
                        <span>0</span>
                        <span>ind</span>
                      </div>
                    </li>

                    <li style={{border:"1px solid #318ac7"}}>
                      <h4 style={{color:'#318ac7'}}>order</h4>
                      <div className="d-flex justify-content-between align-items-center">
                        <span>0</span>
                        <span>ind</span>
                      </div>
                    </li>

                    <li style={{border:"1px solid #fe8a24"}}>
                      <h4 style={{color:'#fe8a24'}}>order</h4>
                      <div className="d-flex justify-content-between align-items-center">
                        <span>0</span>
                        <span>ind</span>
                      </div>
                    </li>

                    <li style={{border:"1px solid #24c957"}}>
                      <h4 style={{color:'#24c957'}}>order</h4>
                      <div className="d-flex justify-content-between align-items-center">
                        <span>0</span>
                        <span>ind</span>
                      </div>
                    </li>

                    <li>
                      <h4>order</h4>
                      <div className="d-flex justify-content-between align-items-center">
                        <span>0</span>
                        <span>ind</span>
                      </div>
                    </li>

                    <li style={{border:"1px solid #318ac7"}}>
                      <h4 style={{color:'#318ac7'}}>order</h4>
                      <div className="d-flex justify-content-between align-items-center">
                        <span>0</span>
                        <span>ind</span>
                      </div>
                    </li>

                    <li style={{border:"1px solid #fe8a24"}}>
                      <h4 style={{color:'#fe8a24'}}>order</h4>
                      <div className="d-flex justify-content-between align-items-center">
                        <span>0</span>
                        <span>ind</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div> */}


              <div className="col-lg-12 mt-4">
              <div className="pie-container">
              <h4>Server Status</h4>
                <Barchart />
              </div>
              </div>

              <div className="col-lg-12 mt-4">
              <div className="pie-container">
              <h4>Average Call Duration(ACD) and Answer-Seizure Ratio(ASR) Trend Chart</h4>
                <LineChart />
              </div>
              </div>
            </div>
          </Box>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
