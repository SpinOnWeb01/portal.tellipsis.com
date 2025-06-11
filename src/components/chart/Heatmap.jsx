// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/heatmap
import { Box } from '@mui/material';
import { ResponsiveHeatMap } from '@nivo/heatmap'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const Data = [
    {
      "id": "Japan",
      "data": [
        {
          "x": "Train",
          "y": -41331
        },
        {
          "x": "Subway",
          "y": -9523
        },
        {
          "x": "Bus",
          "y": 90493
        },
        {
          "x": "Car",
          "y": 23002
        },
        {
          "x": "Boat",
          "y": 30901
        },
        {
          "x": "Moto",
          "y": -61834
        },
        {
          "x": "Moped",
          "y": 6439
        },
        {
          "x": "Bicycle",
          "y": -62570
        },
        {
          "x": "Others",
          "y": -45864
        }
      ]
    },
    {
      "id": "France",
      "data": [
        {
          "x": "Train",
          "y": 53530
        },
        {
          "x": "Subway",
          "y": 53351
        },
        {
          "x": "Bus",
          "y": 6694
        },
        {
          "x": "Car",
          "y": 84165
        },
        {
          "x": "Boat",
          "y": 89144
        },
        {
          "x": "Moto",
          "y": -34975
        },
        {
          "x": "Moped",
          "y": 43899
        },
        {
          "x": "Bicycle",
          "y": -55489
        },
        {
          "x": "Others",
          "y": 13808
        }
      ]
    },
    {
      "id": "US",
      "data": [
        {
          "x": "Train",
          "y": 53900
        },
        {
          "x": "Subway",
          "y": -13844
        },
        {
          "x": "Bus",
          "y": -17822
        },
        {
          "x": "Car",
          "y": -60836
        },
        {
          "x": "Boat",
          "y": -35971
        },
        {
          "x": "Moto",
          "y": -43822
        },
        {
          "x": "Moped",
          "y": -34353
        },
        {
          "x": "Bicycle",
          "y": -6697
        },
        {
          "x": "Others",
          "y": 18083
        }
      ]
    },
    {
      "id": "Germany",
      "data": [
        {
          "x": "Train",
          "y": -86925
        },
        {
          "x": "Subway",
          "y": 60287
        },
        {
          "x": "Bus",
          "y": -42216
        },
        {
          "x": "Car",
          "y": -59787
        },
        {
          "x": "Boat",
          "y": -73822
        },
        {
          "x": "Moto",
          "y": 59928
        },
        {
          "x": "Moped",
          "y": 13833
        },
        {
          "x": "Bicycle",
          "y": -43770
        },
        {
          "x": "Others",
          "y": 88811
        }
      ]
    },
    {
      "id": "Norway",
      "data": [
        {
          "x": "Train",
          "y": 41255
        },
        {
          "x": "Subway",
          "y": 80636
        },
        {
          "x": "Bus",
          "y": 46528
        },
        {
          "x": "Car",
          "y": 37484
        },
        {
          "x": "Boat",
          "y": 87444
        },
        {
          "x": "Moto",
          "y": -2224
        },
        {
          "x": "Moped",
          "y": -69530
        },
        {
          "x": "Bicycle",
          "y": -31268
        },
        {
          "x": "Others",
          "y": 7641
        }
      ]
    },
    {
      "id": "Iceland",
      "data": [
        {
          "x": "Train",
          "y": -29220
        },
        {
          "x": "Subway",
          "y": 77782
        },
        {
          "x": "Bus",
          "y": -62506
        },
        {
          "x": "Car",
          "y": 32527
        },
        {
          "x": "Boat",
          "y": 68149
        },
        {
          "x": "Moto",
          "y": 18713
        },
        {
          "x": "Moped",
          "y": -62690
        },
        {
          "x": "Bicycle",
          "y": -38373
        },
        {
          "x": "Others",
          "y": -14674
        }
      ]
    },
    {
      "id": "UK",
      "data": [
        {
          "x": "Train",
          "y": -86161
        },
        {
          "x": "Subway",
          "y": 27953
        },
        {
          "x": "Bus",
          "y": -77230
        },
        {
          "x": "Car",
          "y": 86204
        },
        {
          "x": "Boat",
          "y": -54572
        },
        {
          "x": "Moto",
          "y": -22831
        },
        {
          "x": "Moped",
          "y": 71937
        },
        {
          "x": "Bicycle",
          "y": 38520
        },
        {
          "x": "Others",
          "y": 11636
        }
      ]
    },
    {
      "id": "Vietnam",
      "data": [
        {
          "x": "Train",
          "y": 25535
        },
        {
          "x": "Subway",
          "y": 89631
        },
        {
          "x": "Bus",
          "y": 1923
        },
        {
          "x": "Car",
          "y": 80635
        },
        {
          "x": "Boat",
          "y": 66384
        },
        {
          "x": "Moto",
          "y": 91885
        },
        {
          "x": "Moped",
          "y": -16919
        },
        {
          "x": "Bicycle",
          "y": 65287
        },
        {
          "x": "Others",
          "y": 32808
        }
      ]
    }
  ]
  
function Heatmap  ()  {

    return( <div className="pie-container">
    <Box m="20px">
      <Box height="50vh">
    <ResponsiveHeatMap
            data={Data}
        margin={{ top: 60, right: 90, bottom: 60, left: 90 }}
        valueFormat=">-.2s"
        axisTop={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: -90,
            legend: '',
            legendOffset: 46
        }}
        axisRight={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'country',
            legendPosition: 'middle',
            legendOffset: 70
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'country',
            legendPosition: 'middle',
            legendOffset: -72
        }}
        colors={{
            type: 'diverging',
            scheme: 'red_yellow_blue',
            divergeAt: 0.5,
            minValue: -100000,
            maxValue: 100000
        }}
        emptyColor="#555555"
        legends={[
            {
                anchor: 'bottom',
                translateX: 0,
                translateY: 30,
                length: 400,
                thickness: 8,
                direction: 'row',
                tickPosition: 'after',
                tickSize: 3,
                tickSpacing: 4,
                tickOverlap: false,
                tickFormat: '>-.2s',
                title: 'Value →',
                titleAlign: 'start',
                titleOffset: 4
            }
        ]}
    
    />
    </Box></Box></div>)
};
    


export default Heatmap;