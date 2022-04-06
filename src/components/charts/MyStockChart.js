import React from "react";
import Highcharts from "highcharts/highstock";

import indicatorsAll from "highcharts/indicators/indicators-all";
import annotationsAdvanced from "highcharts/modules/annotations-advanced";
import priceIndicator from "highcharts/modules/price-indicator";
import fullScreen from "highcharts/modules/full-screen";
import stockTools from "highcharts/modules/stock-tools";

import HighchartsReact from "highcharts-react-official";

indicatorsAll(Highcharts);
annotationsAdvanced(Highcharts);
priceIndicator(Highcharts);
fullScreen(Highcharts);
stockTools(Highcharts);

const MyStockChart = ({ financialData }) => {
  const stockChartOptions = {
    rangeSelector: {
      selected: 1,
    },
    chart: {
      height: 600,
    },
    title: {
      text: `${financialData.metaData[1]} Historical`,
    },

    yAxis: [
      {
        labels: {
          align: "right",
          x: -3,
        },
        title: {
          text: "Candlestick",
        },
        height: "70%",
        lineWidth: 2,
        resize: {
          enabled: true,
        },
      },
      {
        labels: {
          align: "right",
          x: -3,
        },
        title: {
          text: "Volume",
        },
        top: "65%",
        height: "35%",
        offset: 0,
        lineWidth: 2,
      },
    ],

    xAxis: [
      {
        type: "datetime",
      },
      {
        type: "datetime",
      },
    ],

    // tooltip: {
    //   split: true,
    // },
    series: [
      {
        type: "candlestick",
        id: `${financialData.metaData[1]}-ohlc`,
        name: `${financialData.metaData[1]} Stock Price`,
        data: financialData.ohlcData,
      },
      {
        type: "column",
        id: `${financialData.metaData[1]}-volume`,
        name: `${financialData.metaData[1]} Volume`,
        data: financialData.volumeData,
        yAxis: 1,
      },
    ],
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 800,
          },
          chartOptions: {
            rangeSelector: {
              inputEnabled: false,
            },
          },
        },
      ],
    },
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      constructorType={"stockChart"}
      options={stockChartOptions}
    />
  );
};

export default MyStockChart;
