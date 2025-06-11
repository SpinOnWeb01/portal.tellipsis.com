
import { Box } from '@mui/material';
import { ResponsiveBar } from '@nivo/bar'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getResellerDashboardChart } from '../../../redux/actions/resellerPortal_dashboardAction';

 function Barchart() {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getResellerDashboardChart());
    }, []);
//  if (state?.allDashboardChart?.managereport?.total_disk_space !== undefined){
//     setTotalDiskSpace(state?.allDashboardChart?.managereport?.total_disk_space)
//  }
    const total_disk_space = state?.resellerDashboardChart?.managereport?.total_disk_space;
    const total_memory = state?.resellerDashboardChart?.managereport?.total_memory
    const used_disk_space = state?.resellerDashboardChart?.managereport?.used_disk_space

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
