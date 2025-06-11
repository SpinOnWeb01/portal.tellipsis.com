import { Box } from '@mui/material';
import { ResponsivePie } from '@nivo/pie'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboardChart } from '../../redux/actions/adminPortal/adminPortal_dashboardAction';

function Diskusage() {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDashboardChart());
    }, []);

    const value = state?.allDashboardChart?.managereport?.disk_usage_per
    const maxValue = 100;
    const difference = maxValue - value;

    const data = [
        {
            "id": "used",
            "label": "Used",
            "value": value,
            "color": "hsl(148, 70%, 50%)"
        },
        {
            "id": "free",
            "label": "Free",
            "value": difference,
            "color": "hsl(0, 70%, 50%)"
        }
    ];

    return (
        <div className="pie-container">
            <Box m="20px">
                <Box height="50vh">
                    <ResponsivePie
                        data={data}
                        margin={{ top: 40, right: 80, bottom: 60, left: 80 }}
                        startAngle={-90}
                        innerRadius={0.5}
                        padAngle={0.7}
                        cornerRadius={3}
                        colors={{ scheme: 'nivo' }}
                        borderWidth={1}
                        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                        radialLabelsSkipAngle={10}
                        radialLabelsTextXOffset={6}
                        radialLabelsTextColor="#333333"
                        radialLabelsLinkOffset={0}
                        radialLabelsLinkDiagonalLength={16}
                        radialLabelsLinkHorizontalLength={24}
                        radialLabelsLinkStrokeWidth={1}
                        radialLabelsLinkColor={{ from: 'color' }}
                        slicesLabelsSkipAngle={10}
                        slicesLabelsTextColor="#333333"
                        animate={true}
                        motionStiffness={90}
                        motionDamping={15}
                        legends={[
                            {
                                anchor: 'bottom',
                                direction: 'row',
                                translateY: 56,
                                itemWidth: 100,
                                itemHeight: 18,
                                itemTextColor: '#999',
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
};

export default Diskusage;
