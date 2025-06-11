import { Box } from '@mui/material';
import { ResponsiveLine } from '@nivo/line'
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getResellerDashboardLineChart } from '../../../redux/actions/resellerPortal/resellerPortal_dashboardAction';

function LineChart() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  // Fetch the data on component mount
  useEffect(() => {
      dispatch(getResellerDashboardLineChart());
  }, [dispatch]);

  // Prepare the data for the chart
  const data = useMemo(() => {
      const formattedData = [];
      const chartDataASR = { id: 'ASR', color: 'hsl(210, 70%, 50%)', data: [] };
      const chartDataACD = { id: 'ACD', color: 'hsl(120, 70%, 50%)', data: [] };

      state?.resellerDashboardLineChart?.linechart?.data?.forEach(item => {
          // Format the date to "7 June"
          const date = new Date(item.date);
          const formattedDate = date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' });

          // Push data points
          chartDataASR.data.push({ x: formattedDate, y: item.asr });
          chartDataACD.data.push({ x: formattedDate, y: item.acd });
      });

      formattedData.push(chartDataASR, chartDataACD);
      return formattedData;
  }, [state?.resellerDashboardLineChart?.linechart]);
      return (
        <div className="pie-container">
            <Box m="20px">
                <Box height="50vh">
                <ResponsiveLine
            data={data}
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            xScale={{ type: 'point' }}
            yScale={{
                type: 'linear',
                min: 'auto',
                max: 'auto',
                stacked: false, // Keep this false to avoid summing the values
                reverse: false,
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Value',
                legendOffset: -40,
                legendPosition: 'middle',
            }}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Date',
                legendOffset: 36,
                legendPosition: 'middle',
            }}
            colors={{ scheme: 'dark2' }}
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={-12}
            enableCrosshair={true}
            crosshairType="x"
            useMesh={true}
            legends={[
                {
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 100,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: 'left-to-right',
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: 'circle',
                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemBackground: 'rgba(0, 0, 0, .03)',
                                itemOpacity: 1,
                            },
                        },
                    ],
                },
            ]}
        />

                </Box>
            </Box>
        </div>
    );
};

export default LineChart;
