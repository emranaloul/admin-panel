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
// Material Dashboard 2 React base styles
import { TypographyOptions } from '@mui/material/styles/createTypography';
import typography from 'assets/theme/base/typography';
import { ChartData, ChartDataset, ChartOptions, ChartTypeRegistry } from 'chart.js';

function configs<TType extends keyof ChartTypeRegistry>(
  labels: string[],
  datasets: ChartDataset<TType>[]
): { data: ChartData<TType>; options: ChartOptions<TType> } {
  return {
    data: {
      labels,
      datasets: [...datasets],
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            // drawBorder: false,
            display: true,
            drawOnChartArea: true,
            drawTicks: false,
            // borderDash: [5, 5],
            color: '#c1c4ce5c',
          },
          ticks: {
            display: true,
            color: '#b2b9bf',
            padding: 10,
            font: {
              size: 11,
              family: (typography as TypographyOptions).fontFamily,
              style: 'normal',
              lineHeight: 2,
            },
          },
        },
        x: {
          beginAtZero: true,
          grid: {
            // drawBorder: false,
            display: false,
            drawOnChartArea: true,
            drawTicks: true,
            color: '#c1c4ce5c',
          },
          ticks: {
            display: true,
            color: '#b2b9bf',
            padding: 20,
            font: {
              size: 11,
              family: (typography as TypographyOptions).fontFamily,
              style: 'normal',
              lineHeight: 2,
            },
          },
        },
      },
    } as ChartOptions<TType>,
  };
}

export default configs;
