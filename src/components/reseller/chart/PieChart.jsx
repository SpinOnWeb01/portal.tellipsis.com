import React, { useEffect, useMemo, useState } from "react";
import { ResponsivePie } from '@nivo/pie';
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getResellerDashboardBillingChart } from "../../../redux/actions/resellerPortal/resellerPortal_dashboardAction";

function PieChart() {
const dispatch = useDispatch();
const state = useSelector((state) => state)
const [remainingMinutes, setRemainingMinutes] = useState("");
const [roundOffMinutes, setRoundOffMinutes] = useState("");
const [totalMinutes, setTotalMinutes] = useState("");
const [totalUsedMinutes, setTotalUsedMinutes] = useState("");
useEffect(()=>{
dispatch(getResellerDashboardBillingChart())
},[])
  const data = [
    {
      "id": "Total Remaining Minutes",
      "label": "Total Remaining Minutes",
      "value": remainingMinutes,
      "color": "hsl(240, 100%, 50%)"
    },
    {
      "id": "Total Minutes",
      "label": "Total Minutes",
      "value": totalMinutes,
      "color": "hsl(358, 70%, 50%)"
    },
    {
      "id": "Monthly Used Minutes",
      "label": "Monthly Used Minutes",
      "value": roundOffMinutes,
      "color": "hsl(174, 70%, 50%)"
    },
    {
      "id": "Total Used Minutes",
      "label": "Total Used Minutes",
      "value": totalUsedMinutes,
     // "color": "hsl(96, 70%, 50%)"
    },
  ];

  const rows = useMemo(() => {
    state?.resellerDashboardBillingChart?.billingchart &&
    state?.resellerDashboardBillingChart?.billingchart?.forEach((item, index) => {
      setRemainingMinutes(item?.remaining_minutes);
      setRoundOffMinutes(item?.roundoff_minutes);
      setTotalMinutes(item?.total_minutes);
      setTotalUsedMinutes(item?.total_used_minutes);
      });
  }, [state?.resellerDashboardBillingChart?.billingchart]);

  return (
    <div className="pie-container">
      <Box m="20px">
        <Box height="50vh">
        <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        colors={{ scheme: 'set1' }}
        borderWidth={1}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.2
                ]
            ]
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    2
                ]
            ]
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
        fill={[
            {
                match: {
                    id: 'ruby'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'c'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'go'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'python'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'scala'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'lisp'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'elixir'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'javascript'
                },
                id: 'lines'
            }
        ]}
        legends={[
            {
                anchor: 'bottom',
                direction: 'column',
                justify: false,
                translateX: -150,
                translateY: 80,
                itemsSpacing: 1,
                itemWidth: 158,
                itemHeight: 23,
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
  );
}

export default PieChart;
