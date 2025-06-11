import React from 'react';
import { ResponsiveRadialBar } from '@nivo/radial-bar';
import { Box } from '@mui/material';

function RadialBar() {
    const data = [
        {
          "id": "Call Count",
          "data": [
            {
              "x": "call_count",
              "y": 1
            },
            {
                "x": "call_count",
                "y": 5
              },
           
        
          ]
        },
        {
          "id": "Day Of Week",
          "data": [
          
            {
              "x": "day_of_week",
              "y": 1
            },
            {
                "x": "day_of_week",
                "y": 2
              },
          ]
        },
        {
            "id": "Hours",
            "data": [
            
              {
                "x": "hour",
                "y": 9
              },
              {
                  "x": "hour",
                  "y": 9
                },
            ]
          },
        // {
        //   "id": "Online",
        //   "data": [
        //     {
        //       "x": "Vegetables",
        //       "y": 12
        //     },
        //     {
        //       "x": "Fruits",
        //       "y": 172
        //     },
        //     {
        //       "x": "Meat",
        //       "y": 149
        //     }
        //   ]
        // },
        // {
        //   "id": "Marché",
        //   "data": [
        //     {
        //       "x": "Vegetables",
        //       "y": 167
        //     },
        //     {
        //       "x": "Fruits",
        //       "y": 249
        //     },
        //     {
        //       "x": "Meat",
        //       "y": 82
        //     }
        //   ]
        // }
      ];

    return (
        <Box m="20px">
            <Box height="50vh">
            <ResponsiveRadialBar
        data={data}
        valueFormat=">-.2f"
        padding={0.4}
        cornerRadius={2}
        margin={{ top: 40, right: 120, bottom: 40, left: 40 }}
        colors={{ scheme: 'category10' }}
        borderWidth={1}
        radialAxisStart={{ tickSize: 5, tickPadding: 5, tickRotation: 0 }}
        circularAxisOuter={{ tickSize: 5, tickPadding: 12, tickRotation: 0 }}
        legends={[
            {
                anchor: 'right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 100,
                itemsSpacing: 6,
                itemDirection: 'left-to-right',
                itemWidth: 100,
                itemHeight: 18,
                
                itemTextColor: '#999',
                symbolSize: 18,
                symbolShape: 'square',
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
    );
}

export default RadialBar;
