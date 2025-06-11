import { Box } from "@mui/material";
import React, { useEffect } from "react";
import PieChart from "./chart/PieChart";
import Barchart from "../chart/Barchart";
import "../../Switcher.scss";
import { useDispatch, useSelector } from "react-redux";
import Adminbarchart from "./chart/Adminbarchart";
import LineChart from "./chart/Linechart";
const drawerWidth = 240;
function ResellerDashboard({ colorThem }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  

  useEffect(() => {
  
          // dispatch(getDashboardChart())
          // dispatch(getExtension())
          // dispatch(getDid())
          // dispatch(getAdminQueue())
   
    
  }, [dispatch]);




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

export default ResellerDashboard;
