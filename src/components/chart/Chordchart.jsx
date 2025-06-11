
import { Box } from '@mui/material'
import { ResponsiveChord } from '@nivo/chord'

const Data = [
    [
      1691,
      340,
      164,
      1591,
      476
    ],
    [
      397,
      1914,
      342,
      114,
      339
    ],
    [
      416,
      470,
      1434,
      483,
      339
    ],
    [
      64,
      1029,
      1909,
      17,
      341
    ],
    [
      233,
      1204,
      175,
      1799,
      846
    ]
  ]

export default function Chordchart(){
    return(
        <div className="pie-container">
        <Box m="20px">
            <Box height="50vh">

            <ResponsiveChord
        data={Data}
        keys={[ 'John', 'Raoul', 'Jane', 'Marcel', 'Ibrahim' ]}
        margin={{ top: 60, right: 60, bottom: 90, left: 60 }}
        valueFormat=".2f"
        padAngle={0.02}
        innerRadiusRatio={0}
        inactiveArcOpacity={0.3}
        arcBorderWidth={0}
        arcBorderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    '0.3'
                ]
            ]
        }}
        activeRibbonOpacity={0.7}
        inactiveRibbonOpacity={0.25}
        ribbonBorderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.6
                ]
            ]
        }}
        labelRotation={-88}
        labelTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1
                ]
            ]
        }}
        colors={{ scheme: 'oranges' }}
        motionConfig="stiff"
        legends={[
            {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: -15,
                translateY: 75,
                itemWidth: 91,
                itemHeight: 21,
                itemsSpacing: 0,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                symbolSize: 12,
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

    )
}