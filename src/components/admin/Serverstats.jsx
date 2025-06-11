import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import PieChart from "../chart/PieChart";
import Heatmap from "../chart/Cpuchart";
import Barchart from "../chart/Barchart";
import Chordchart from "../chart/Chordchart";
import Memoryusage from "../chart/Memoryusage";
import Diskusage from "../chart/Diskusage";

import "../../Switcher.scss";
import { getDashboardChart } from "../../redux/actions/adminPortal/adminPortal_dashboardAction";
import { useDispatch, useSelector } from "react-redux";
import Cpuchart from "../chart/Cpuchart";
import LineChart from "../chart/Linechart";
const drawerWidth = 240;



function ServerStats({ colorThem }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDashboardChart());
  }, []);

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
            <div className="row mt-lg-0 mt-md-0 mt-sm-4">
            <div className="col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-12 my-xxl-4 my-xl-4 mt-lg-0 mt-md-0 mt-sm-4 position-relative">
                      <h5 className="chart_title_1">CPU Usage</h5>
                      <Cpuchart  className="chart_box" /> 
                        {/* <PieChart/>  */}
                         
                       
                      </div>
                      <div className="col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-12 my-xxl-4 my-xl-4 mt-lg-0 mt-md-0 mt-sm-4 position-relative">
                      <h5 className="chart_title_1">Memory Usage</h5>
                      <Memoryusage  className="chart_box" /> 
                    </div>

                    <div className="col-xxl-4 col-xl-4 col-lg-12 col-md-12 col-12 my-xxl-4 my-xl-4 mt-lg-4 my-md-4 mt-sm-4 position-relative">
                    <h5 className="chart_title_1">Disk Usage</h5>
                      <Diskusage  className="chart_box" /> 
                     
                    </div>
              {/* <div className="col-lg-6 mt-4">
                <Chordchart />
              </div> */}

<div className="col-lg-12 my-xxl-0 mt-lg-0 mt-md-4 mt-sm-4 position-relative">
<div className="pie-container">
              <h4 className="chart_title_1">Server Status</h4>
                <Barchart />
                </div>
              </div>
            </div>
          </Box>
        </div>
      </div>
    </>
  );
}

export default ServerStats;
