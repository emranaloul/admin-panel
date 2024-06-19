/**
=========================================================
* Material Dashboard 2  React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { ReactNode, useMemo } from 'react';

// react-chartjs-2 components
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

// @mui material components
import Card from '@mui/material/Card';
import Icon from '@mui/material/Icon';

// Material Dashboard 2 React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import MDProgress from 'components/MDProgress';

// ProgressLineChart configurations
import configs from 'examples/Charts/LineCharts/ProgressLineChart/config';
import { ColorType } from 'types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface ProgressLineChartProps {
  color: ColorType;
  icon: ReactNode;
  title: string;
  count?: string | number;
  progress: number;
  height?: string | number;
  chart: {
    labels: string[];
    data: number[];
  };
}

function ProgressLineChart({
  color,
  icon,
  title,
  count,
  progress,
  height,
  chart,
}: ProgressLineChartProps) {
  const { data, options } = configs(color, chart.labels || [], title, chart.data || []);

  return (
    <Card>
      <MDBox display='flex' alignItems='center' pt={2} px={2}>
        <MDBox
          width='3rem'
          height='3rem'
          display='grid'
          justifyContent='center'
          alignItems='center'
          borderRadius='md'
          shadow='md'
          color='white'
          bgColor={color}
          variant='gradient'
        >
          <Icon fontSize='inherit'>{icon}</Icon>
        </MDBox>
        <MDBox ml={2} lineHeight={1}>
          <MDTypography
            variant='button'
            fontWeight='regular'
            textTransform='capitalize'
            color='text'
          >
            {title}
          </MDTypography>
          {count ? (
            <MDTypography variant='h5' fontWeight='bold'>
              {count}
            </MDTypography>
          ) : null}
        </MDBox>
        <MDBox width='25%' ml='auto'>
          <MDTypography display='block' variant='caption' fontWeight='medium' color='text'>
            {progress}%
          </MDTypography>
          <MDBox mt={0.25}>
            <MDProgress ownerVariant='gradient' ownerColor={color} value={progress} />
          </MDBox>
        </MDBox>
      </MDBox>
      {useMemo(
        () => (
          <MDBox mt={2}>
            <Line data={data} options={options} style={{ height }} redraw />
          </MDBox>
        ),
        [chart, height, color]
      )}
    </Card>
  );
}

// Setting default values for the props of ProgressLineChart
ProgressLineChart.defaultProps = {
  color: 'info',
  count: 0,
  height: '6.25rem',
};

export default ProgressLineChart;
