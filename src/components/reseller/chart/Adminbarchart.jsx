import React, { useEffect, useState } from "react";
import { ResponsivePie } from '@nivo/pie'
import { Box } from "@mui/material";
import axios from "axios";
import { api } from "../../../mockData";

function Adminbarchart() {
  const [chartData, setChartData] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (chartData?.data) {
      setRows(
        chartData?.data?.map((item, index) => ({
          value: item?.extensions_limit,
          label: item?.username,
        }))
      );
    } else {
      setRows([]);
    }
  }, [chartData]);

  const fetchData = async () => {
    const token = JSON.parse(localStorage.getItem("reseller"));
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${api.dev}/api/user_extnlimit_stats`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access_token} `,
        },
      };
      await axios
        .request(config)
        .then((response) => {
          setChartData(response?.data);
        })
        .catch((error) => {});
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // const data = rows?.map((item) => ({

  //     ...item, id: item.label, value: item.value
  // }))
  // const { value:maxValue } = rows?.reduce((prev, current) =>
  //     (prev.value > current.value) ? prev : current)

  // const yMax = Math.round(maxValue + (maxValue % 4))

  let data = [];
  let yMax = 0;
  let maxValue = 0;

  if (rows && rows.length > 0) {
    data = rows.map((item) => ({
      ...item,
      id: item.label,
      value: item.value,
    }));

    ({ value: maxValue } = rows.reduce((prev, current) =>
      prev.value > current.value ? prev : current
    ));

    yMax = Math.round(maxValue + (maxValue % 4));
  }

  // Now you can use `data`, `maxValue`, and `yMax` variables outside of the condition

  return (
    <>
      <div className="pie-container">
        <Box m="20px">
          <Box sx={{ height: "50vh" }}>
            {/* <ResponsiveBar
              data={data}
              //indexBy="country"
              labelTextColor={"white"}
              margin={{ top: 50, bottom: 50, left: 100, right: 40 }}
              padding={0.4}
              tooltip={(toolTip) => (
                <span style={{ fontSize: "12px", color: "black" }}>
                  {toolTip.value}
                </span>
              )}
              labelFormat={(d) => (
                <tspan fontSize={"11px"} y={-10}>
                  {d.toFixed(1)}
                </tspan>
              )}
              colors={"#005587"}
              theme={lineGraphSettings.theme}
              borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
              axisTop={null}
              axisRight={null}
              minValue={0}
              maxValue={yMax}
              gridYValues={5}
              axisBottom={{
                tickSize: 0,
                tickPadding: 5,
                legend: "User Name",
                tickRotation: 0,
                legendPosition: "middle",
                legendOffset: 32,
              }}
              axisLeft={{
                tickValues: 5,
                tickSize: 0,
                tickPadding: 10,
                legend: "Extension Limit",
                // format: v => `${v} %`,
                legendPosition: "middle",
                legendOffset: -50,
              }}
              animate={true}
              motionStiffness={90}
              motionDamping={15}
            /> */}
 <ResponsivePie
            data={data}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            padAngle={0.7}
            cornerRadius={3}
            activeInnerRadiusOffset={7}
            activeOuterRadiusOffset={7}
            colors={{ scheme: 'category10' }}
            borderColor={{
                from: 'color',
                modifiers: [
                    ['darker', '1.2']
                ]
            }}
            arcLinkLabelsTextOffset={4}
            arcLinkLabelsTextColor={{ from: 'color', modifiers: [] }}
            arcLinkLabelsDiagonalLength={14}
            arcLinkLabelsStraightLength={5}
            arcLinkLabelsColor="black"
            arcLabelsRadiusOffset={0.85}
            arcLabelsSkipAngle={2}
            arcLabelsTextColor={{
                from: 'color',
                modifiers: [
                    ['darker', 2]
                ]
            }}
            tooltip={({ datum }) => (
                <strong style={{color:"black"}}>{`Extension Limit: ${datum.value}`}</strong>
            )}
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
            fill={[
                { match: { id: 'ruby' }, id: 'dots' },
                { match: { id: 'c' }, id: 'dots' },
                { match: { id: 'go' }, id: 'dots' },
                { match: { id: 'python' }, id: 'dots' },
                { match: { id: 'scala' }, id: 'lines' },
                { match: { id: 'lisp' }, id: 'lines' },
                { match: { id: 'elixir' }, id: 'lines' },
                { match: { id: 'javascript' }, id: 'lines' }
            ]}
            // legends={[
            //     {
            //         anchor: 'bottom',
            //         direction: 'column',
            //         justify: false,
            //         translateX: 160,
            //         translateY: -118,
            //         itemsSpacing: 0,
            //         itemWidth: 10,
            //         itemHeight: 14,
            //         itemTextColor: '#999',
            //         itemDirection: 'left-to-right',
            //         itemOpacity: 1,
            //         symbolSize: 11,
            //         symbolShape: 'circle',
            //         effects: [
            //             {
            //                 on: 'hover',
            //                 style: {
            //                     itemTextColor: '#000'
            //                 }
            //             }
            //         ]
            //     }
            // ]}
        />
          </Box>
        </Box>
      </div>
    </>
  );
}

export default Adminbarchart;
