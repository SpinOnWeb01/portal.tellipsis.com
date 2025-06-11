
import { Box } from '@mui/material';
import { ResponsiveBar } from '@nivo/bar'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboardChart } from '../../redux/actions/adminPortal/adminPortal_dashboardAction';

// const Data = [
//     {
//       "country": "AD",
//       "hot dog": 130,
//     //   "hot dogColor": "hsl(166, 70%, 50%)",
//     //   "burger": 20,
//     //   "burgerColor": "hsl(322, 70%, 50%)",
//     //   "sandwich": 162,
//     //   "sandwichColor": "hsl(317, 70%, 50%)",
//     //   "kebab": 18,
//     //   "kebabColor": "hsl(314, 70%, 50%)",
//     //   "fries": 159,
//     //   "friesColor": "hsl(323, 70%, 50%)",
//     //   "donut": 172,
//     //   "donutColor": "hsl(67, 70%, 50%)"
//     },
//     {
//        "country": "AE",
//     //   "hot dog": 50,
//       "hot dogColor": "hsl(25, 70%, 50%)",
//       "burger": 77,
//     //   "burgerColor": "hsl(264, 70%, 50%)",
//     //   "sandwich": 128,
//     //   "sandwichColor": "hsl(176, 70%, 50%)",
//     //   "kebab": 87,
//     //   "kebabColor": "hsl(274, 70%, 50%)",
//     //   "fries": 15,
//     //   "friesColor": "hsl(322, 70%, 50%)",
//     //   "donut": 102,
//     //   "donutColor": "hsl(257, 70%, 50%)"
//     },
//     {
//       "country": "AF",
//       //"hot dog": 165,
//     //   "hot dogColor": "hsl(317, 70%, 50%)",
//     //   "burger": 190,
//     //  "burgerColor": "hsl(23, 70%, 50%)",
//       "sandwich": 3,
//       "sandwichColor": "hsl(51, 70%, 50%)",
//     //   "kebab": 180,
//     //   "kebabColor": "hsl(96, 70%, 50%)",
//     //   "fries": 34,
//     //   "friesColor": "hsl(92, 70%, 50%)",
//     //   "donut": 119,
//     //   "donutColor": "hsl(192, 70%, 50%)"
//     },
//     {
//       "country": "AG",
//     //  "hot dog": 185,
//     //   "hot dogColor": "hsl(316, 70%, 50%)",
//     //   "burger": 16,
//     //   "burgerColor": "hsl(201, 70%, 50%)",
//     //   "sandwich": 187,
//     //   "sandwichColor": "hsl(212, 70%, 50%)",
//       "kebab": 69,
//       "kebabColor": "hsl(321, 70%, 50%)",
//     //   "fries": 122,
//     //   "friesColor": "hsl(42, 70%, 50%)",
//     //   "donut": 10,
//     //   "donutColor": "hsl(53, 70%, 50%)"
//     },
//     {
//       "country": "AI",
//     //  "hot dog": 196,
//     //   "hot dogColor": "hsl(277, 70%, 50%)",
//     //   "burger": 70,
//     //   "burgerColor": "hsl(121, 70%, 50%)",
//     //   "sandwich": 21,
//     //   "sandwichColor": "hsl(201, 70%, 50%)",
//     //   "kebab": 74,
//     //   "kebabColor": "hsl(216, 70%, 50%)",
//       "fries": 165,
//       "friesColor": "hsl(116, 70%, 50%)",
//     //   "donut": 66,
//     //   "donutColor": "hsl(213, 70%, 50%)"
//     },
//     {
//       "country": "AL",
//     //  "hot dog": 24,
//     //   "hot dogColor": "hsl(40, 70%, 50%)",
//     //   "burger": 33,
//     //   "burgerColor": "hsl(218, 70%, 50%)",
//     //   "sandwich": 32,
//     //   "sandwichColor": "hsl(325, 70%, 50%)",
//     //   "kebab": 0,
//     //   "kebabColor": "hsl(158, 70%, 50%)",
//     //   "fries": 52,
//     //   "friesColor": "hsl(129, 70%, 50%)",
//       "donut": 36,
//       "donutColor": "hsl(87, 70%, 50%)"
//     },
//     {
//       "country": "AM",
//       "hot dog": 118,
//     //   "hot dogColor": "hsl(183, 70%, 50%)",
//     //   "burger": 27,
//     //   "burgerColor": "hsl(222, 70%, 50%)",
//     //   "sandwich": 30,
//     //   "sandwichColor": "hsl(240, 70%, 50%)",
//     //   "kebab": 64,
//     //   "kebabColor": "hsl(266, 70%, 50%)",
//     //   "fries": 10,
//     //   "friesColor": "hsl(193, 70%, 50%)",
//     //   "donut": 133,
//     //   "donutColor": "hsl(7, 70%, 50%)"
//     }
//   ]



 function Barchart() {
    const state = useSelector((state) => state);
    const [totalDiskSpace, setTotalDiskSpace] = useState("")
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDashboardChart());
    }, []);
//  if (state?.allDashboardChart?.managereport?.total_disk_space !== undefined){
//     setTotalDiskSpace(state?.allDashboardChart?.managereport?.total_disk_space)
//  }
    const total_disk_space = state?.allDashboardChart?.managereport?.total_disk_space;
    const total_memory = state?.allDashboardChart?.managereport?.total_memory
    const used_disk_space = state?.allDashboardChart?.managereport?.used_disk_space

    const Data = [
        
        {
          "country": "Total Disk Space",
          "total_disk_space": total_disk_space,
        },
        {
           "country": "Total Memory",
        //   "hot dog": 50,
          "hot dogColor": "hsl(25, 70%, 50%)",
          "total_memory": total_memory,
        },
        {
          "country": "Used Disk Space",
          "used_disk_space": used_disk_space,
          "sandwichColor": "hsl(51, 70%, 50%)",
        },
  
      ]
      const step = 500;
      const ticks = [];
// for (let i = 0; i <= total_disk_space; i += step) {
//     ticks.push(i);
// }


 // Define custom colors
 const customColors = ['#1f6fe7', '#235eb9', '#13c74c']; // Adjust colors here
    

    return (
        <div className="pie-container">
            <Box m="20px">
                {Data.map((item, index)=>{
return(<div key={index}>
{item.used_disk_space !== undefined ? (<><Box height="50vh" >

<ResponsiveBar
    data={Data}
    keys={[
        'used_disk_space',
        'total_memory',
        'total_disk_space'
    ]}
    indexBy="country"
    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
    padding={0.3}
    valueScale={{
        type: 'linear',
        // min: 0,  // set minimum value to 0
        // ticks: ticks
    }}
    indexScale={{ type: 'band', round: true }}
  //  colors={{ scheme: 'purple_blue' }}
    colors={customColors} // Set custom colors here
    defs={[
        {
            id: 'dots',
            type: 'patternDots',
            background: 'inherit',
            color: '#38bcb2',
            size: 4,
            padding: 1,
            stagger: true
        },
        {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: '#eed312',
            rotation: -45,
            lineWidth: 6,
            spacing: 10
        }
    ]}
    fill={[
        {
            match: {
                id: 'fries'
            },
            id: 'dots'
        },
        {
            match: {
                id: 'total_memory'
            },
            id: 'lines'
        }
    ]}
    borderColor={{
        from: 'color',
        modifiers: [
            [
                'darker',
                1.6
            ]
        ]
    }}
    axisTop={null}
    axisRight={null}
    axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Memory',
        legendPosition: 'middle',
        legendOffset: 32,
        truncateTickAt: 0
    }}
    axisLeft={{
        tickSize: 5,
        tickPadding: -5,
        tickRotation: 0,
        legend: 'MB',
        legendPosition: 'middle',
        legendOffset: -40,
        truncateTickAt: 0
    }}
    labelSkipWidth={12}
    labelSkipHeight={12}
    labelTextColor={{
        from: 'color',
        modifiers: [
            [
                'darker',
                '2.2'
            ]
        ]
    }}
    legends={[
        {
            dataFrom: 'keys',
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
                {
                    on: 'hover',
                    style: {
                        itemOpacity: 1
                    }
                }
            ]
        }
    ]}
    role="application"
    ariaLabel="Nivo bar chart demo"
    barAriaLabel={e => e.id + ": " + e.formattedValue + " in country: " + e.indexValue}
/>
</Box></>) : (<></>)}
</div>)
                })}
                
            </Box>
        </div>
        )

};

export default Barchart;
