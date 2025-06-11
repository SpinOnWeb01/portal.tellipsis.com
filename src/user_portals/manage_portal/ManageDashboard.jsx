import React, { useEffect } from "react";
import "../../../src/style.css";
import { useLocation } from "react-router-dom";
import { Line, Pie } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { ResponsivePie } from '@nivo/pie';
import PieChart from "../../components/chart/PieChart";
import Barchart from "../../components/chart/Barchart";
import Chordchart from "../../components/chart/Chordchart";
import RadialBar from "../../components/chart/RadialBar";

import { Box } from "@mui/material";
import { getManageReport } from "../../redux/actions/managePortal/managePortal_reportAction";
import Cpuchart from "../../components/chart/Heatmap";
import dayjs from "dayjs";
function Dashboard() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const current_user = localStorage.getItem("current_user");
    const user = localStorage.getItem(`user_${current_user}`)
  const userId = user?.uid;
  //const location = useLocation();
  //const data = location?.state;
  useEffect(() => {
 
    dispatch(getManageReport({}));
  }, [dispatch]);

  let duration =[];
  let averageDuration = 0;
  let averageBillSec = 0; 
  let billSec =[];
  const testData = () =>{
    state?.allManageReport?.managereport?.data &&
  state?.allManageReport?.managereport?.data?.map((item, index) => {
    if(item?.user_uuid === JSON.stringify(userId) && item.service_type === "MANAGE"){
      duration.push(item?.duration)
    const durations = duration.map(entry => entry);
    const sumDurations = durations?.reduce((sum, duration) => sum + duration, 0);
     averageDuration = sumDurations / duration?.length;
     billSec.push(item?.billsec)
    const bill = billSec?.map(entry => entry);
    const sumBillSec = bill?.reduce((sum, billsec) => sum + billsec, 0);
    averageBillSec = sumBillSec / billSec?.length;

    
    }
  })
  }
   
  testData()
  const data1 = [
    {
      "id": "Average Call Duration",
      "label": "Average Call Duration",
      "value": averageDuration.toFixed(2),
      "color": "hsl(240, 100%, 50%)"
    },
    {
      "id": "Average Bill Sec",
      "label":"Average Bill Sec",
      "value": averageBillSec.toFixed(2),
      "color": "hsl(358, 70%, 50%)"
    },
    // {
    //   "id": "Monthly Used Minutes",
    //   "label": "Monthly Used Minutes",
    //   "value": 4000,
    //   "color": "hsl(174, 70%, 50%)"
    // },
    // {
    //   "id": "Total Used Minutes",
    //   "label": "Total Used Minutes",
    //   "value": 332,
    //  // "color": "hsl(96, 70%, 50%)"
    // },
  ];

  return (
    <>
    <section className="sidebar-sec">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="">
                {/* <!----> */}
                <div className="tab-content" id="pills-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="pills-home"
                    role="tabpanel"
                    aria-labelledby="pills-home-tab"
                  >
                    {/* <!--role-contet--> */}
                    <div className="tab_cntnt_box">
                      <div className="cntnt_title">
                        <h3>Dashboard</h3>
                        {/* <p>
                          Quickly access information and tools related to your
                          account.
                        </p> */}
                      </div>

                      {/* <!--table---> */}
                      <div className="row">
                      
                        <div className="col-lg-6 py-lg-0 py-md-2 py-sm-2 ">
                        
                          
                        <div className="pie-container">
                       
                        <h4>Calls Metrics</h4>
      <Box m="20px">
        <Box height="50vh">
       
          <ResponsivePie
            data={data1}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            borderWidth={1}
            motionStiffness={90}
            motionDamping={15}
            animate={true}
            borderColor={{
              from: 'color',
              modifiers: [['darker', 0.2]]
            }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="#333333"
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{
              from: 'color',
              modifiers: [['darker', 2]]
            }}
            defs={[
              {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: true
              },
              {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
              }
            ]}
            legends={[
              {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 67,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemTextColor: '#000'
                    }
                  }
                ]
              }
            ]}
          />
         
        </Box>
      </Box>
      </div>
    
                         
                        </div>
                        <div className="col-lg-6 py-lg-0 py-md-2 py-sm-2">
                        <div className="pie-container">
      {/* <Box m="20px">
        <Box height="50vh"> */}
                        <h4> Calls Weekly Trend</h4>
                          <RadialBar/>
                        {/* <Cpuchart/>  */}
                        </div>
                        {/* </Box>
                        </Box> */}
                         
                       
                      </div>

                      {/* <div className="col-lg-6 mt-4">
                        
                          
                        <Barchart/> 
                         
                       
                      </div> */}
                      {/* <div className="col-lg-6 mt-4 mrgn_top">
                      
                        
                      <Chordchart/> 
                       
                     
                    </div> */}

                       
                      </div>
                      {/* <!--table-end--> */}
                    </div>
                    {/* <!--role-contet--> */}
                  </div>
                  <div
                    className="tab-pane fade"
                    id="pills-profile"
                    role="tabpanel"
                    aria-labelledby="pills-profile-tab"
                  >
                    {/* <!--role-contet--> */}
                    <div className="tab_cntnt_box">
                      <div className="cntnt_title">
                        <h3>User list</h3>
                      </div>
                      <div className="tab_sub_cntnt">
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Consequuntur debitis praesentium iusto quasi,
                          temporibus accusamus quis possimus saepe ipsa. Vel
                          magni molestiae quae alias harum id esse doloribus ab
                          commodi.
                        </p>
                        <form className="d-flex d-none">
                          <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                          />
                          {/* <!-- <button className="info-btn" type="submit">Search</button> --> */}
                        </form>
                      </div>

                      {/* <!--table---> */}
                      <div className="table_box">
                        <table className="table">
                          <thead>
                            <tr>
                              <th scope="col">#</th>
                              <th scope="col">First</th>
                              <th scope="col">Last</th>
                              <th scope="col">Handle</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th scope="row">1</th>
                              <td>Mark</td>
                              <td>Otto</td>
                              <td>@mdo</td>
                            </tr>
                            <tr>
                              <th scope="row">2</th>
                              <td>Jacob</td>
                              <td>Thornton</td>
                              <td>@fat</td>
                            </tr>
                            <tr>
                              <th scope="row">3</th>
                              <td>Larry the Bird</td>
                              <td>@fat</td>
                              <td>@twitter</td>
                            </tr>
                            <tr>
                              <th scope="row">4</th>
                              <td>Larry the Bird</td>
                              <td>@twitter</td>
                              <td>@fat</td>
                            </tr>
                            <tr>
                              <th scope="row">5</th>
                              <td>Larry the Bird</td>
                              <td>@twitter</td>
                              <td>@twitter</td>
                            </tr>
                            <tr>
                              <th scope="row">6</th>
                              <td>Larry the Bird</td>
                              <td>@twitter</td>
                              <td>@twitter</td>
                            </tr>
                            <tr>
                              <th scope="row">7</th>
                              <td>Larry the Bird</td>
                              <td>@twitter</td>
                              <td>@twitter</td>
                            </tr>
                            <tr>
                              <th scope="row">8</th>
                              <td>Larry the Bird</td>
                              <td>@twitter</td>
                              <td>@twitter</td>
                            </tr>
                            <tr>
                              <th scope="row">9</th>
                              <td>Larry the Bird</td>
                              <td>@twitter</td>
                              <td>@twitter</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      {/* <!--table-end--> */}
                    </div>
                    {/* <!--role-contet--> */}
                  </div>
                  <div
                    className="tab-pane fade"
                    id="pills-contact"
                    role="tabpanel"
                    aria-labelledby="pills-contact-tab"
                  >
                    {/* <!--role-contet--> */}
                    <div className="tab_cntnt_box">
                      <div className="cntnt_title">
                        <h3>Add user</h3>
                      </div>
                      <div className="tab_sub_cntnt">
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Consequuntur debitis praesentium iusto quasi,
                          temporibus accusamus quis possimus saepe ipsa. Vel
                          magni molestiae quae alias harum id esse doloribus ab
                          commodi.
                        </p>
                        <div className="inpt-lft">
                          <input
                            className="form-control me-2 w-25"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                          />
                        </div>
                      </div>

                      {/* <!--table---> */}
                      <div className="row">
                        <div className="col-12">
                          <div className="add_row">
                            <form className="add_frm_box">
                              <div className="row">
                                <div className="col-md-6 col-12 mb-3">
                                  <input
                                    type="name"
                                    className="form-control"
                                    id="fname"
                                    aria-describedby="nameHelp"
                                    placeholder="First Name"
                                  />
                                </div>
                                <div className="col-md-6 col-12 mb-3">
                                  <input
                                    type="name"
                                    className="form-control"
                                    id="lname"
                                    aria-describedby="lnameHelp"
                                    placeholder="Last Name"
                                  />
                                </div>

                                <div className="col-md-6 col-12 mb-3">
                                  <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    aria-describedby="emailHelp"
                                    placeholder="Email"
                                  />
                                  <div id="emailHelp" className="form-text">
                                    We'll never share your email with anyone
                                    else.
                                  </div>
                                </div>
                                <div className="col-md-6 col-12 mb-3">
                                  <input
                                    type="number"
                                    className="form-control"
                                    id="number"
                                    aria-describedby="emailHelp"
                                    placeholder="Phone Number"
                                  />
                                </div>

                                <div className="col-md-6 col-12 mb-3">
                                  <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    aria-describedby="passwordHelp"
                                    placeholder="Password"
                                  />
                                </div>
                                <div className="col-md-6 col-12 mb-3">
                                  <input
                                    type="password"
                                    className="form-control"
                                    id="c_password"
                                    aria-describedby="passwordHelp"
                                    placeholder="Confirm Password"
                                  />
                                </div>
                              </div>
                              <div className="mb-3">
                                <input
                                  type="password"
                                  className="form-control"
                                  id="exampleInputPassword1"
                                />
                              </div>
                              <div className="mb-3 form-check">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id="exampleCheck1"
                                />
                                <label
                                  className="form-check-label"
                                  for="exampleCheck1"
                                >
                                  Check me out
                                </label>
                              </div>
                              <button
                                type="submit"
                                className="info-btn submit_button"
                              >
                                Submit
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                      {/* <!--table-end--> */}
                    </div>
                    {/* <!--role-contet--> */}
                  </div>

                  <div
                    className="tab-pane fade"
                    id="pills-call"
                    role="tabpanel"
                    aria-labelledby="pills-call-tab"
                  >
                    <p style={{ color: "#fff" }}>1</p>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="pills-reports"
                    role="tabpanel"
                    aria-labelledby="pills-reports-tab"
                  >
                    <p style={{ color: "#fff" }}>2</p>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="pills-block"
                    role="tabpanel"
                    aria-labelledby="pills-block-tab"
                  >
                    <p style={{ color: "#fff" }}>3</p>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="pills-log"
                    role="tabpanel"
                    aria-labelledby="pills-log-tab"
                  >
                    <p style={{ color: "#fff" }}>4</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
   
     
    </>
  );
}

export default Dashboard;
