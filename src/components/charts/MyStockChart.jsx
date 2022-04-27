import React from "react";

import Highcharts from "highcharts/highstock";

import indicatorsAll from "highcharts/indicators/indicators-all";
import annotationsAdvanced from "highcharts/modules/annotations-advanced";
import priceIndicator from "highcharts/modules/price-indicator";
import heikinashi from "highcharts/modules/heikinashi";
import hollowcandlestick from "highcharts/modules/hollowcandlestick";
import fullScreen from "highcharts/modules/full-screen";
import exporting from "highcharts/modules/exporting";
import stockTools from "highcharts/modules/stock-tools";

import brandDark from "highcharts/themes/brand-dark";

import HighchartsReact from "highcharts-react-official";
import { getSelectedData } from "../../helpers/selectedData";

indicatorsAll(Highcharts);
annotationsAdvanced(Highcharts);
priceIndicator(Highcharts);
heikinashi(Highcharts);
hollowcandlestick(Highcharts);
fullScreen(Highcharts);
exporting(Highcharts);
stockTools(Highcharts);
brandDark(Highcharts);

const MyStockChart = ({ financialData }) => {
  let ohlcData = Object.keys(financialData.ohlcData).map((key) => [
    financialData.ohlcData[key].timestamp,
    financialData.ohlcData[key].open,
    financialData.ohlcData[key].high,
    financialData.ohlcData[key].low,
    financialData.ohlcData[key].close,
  ]);

  let volumeData = Object.keys(financialData.volumeData).map((key) => [
    financialData.volumeData[key].timestamp,
    financialData.volumeData[key].volume,
  ]);

  const currencyOptions = { style: "currency", currency: "USD" };
  const numberFormat = new Intl.NumberFormat("en-US", currencyOptions);

  let groupingUnits = [
    ["day", [1]],
    ["week", [1]],
    ["month", [1, 3, 6]],
  ];

  const stockChartOptions = {
    chart: {
      height: 500,
      width: 1000,
      // events: {
      //   load: function () {
      //     let context = this.series[2];
      //     console.log(context);
      //     this.series
      //       .flatMap((serie) => serie.groupedData)
      //       .forEach((point, inx) => {
      //         context.groupedData[1].color = point.color;
      //       });
      //   },
      // },
      events: {
        render: function (event) {
          // console.log(event);
          let filteredXValues = getSelectedData(
            financialData.ohlcData,
            event.target.xAxis[0].min,
            event.target.xAxis[0].max
          );
          // console.log(filteredXValues);
        },
      },
    },
    title: {
      text: `${financialData.metaData[1]} Stock Price`,
    },
    credits: {
      enabled: false,
    },
    legend: {
      enabled: true,
    },
    rangeSelector: {
      buttons: [
        {
          type: "month",
          count: 1,
          text: "1m",
        },
        {
          type: "month",
          count: 3,
          text: "3m",
        },
        {
          type: "month",
          count: 6,
          text: "6m",
        },
        {
          type: "year",
          count: 1,
          text: "YTD",
        },
        {
          type: "year",
          count: 1,
          text: "1y",
        },
        {
          type: "all",
          text: "All",
        },
      ],
      selected: 4,
    },
    yAxis: [
      {
        offset: 10,
        labels: {
          formatter: function () {
            return numberFormat.format(this.value);
          },
          align: "left",
          x: 15,
        },
        title: {
          text: "OHLC",
        },
        height: "75%",
        lineWidth: 2,
        resize: {
          enabled: true,
        },
      },
      {
        offset: 10,
        labels: {
          align: "left",
          x: 15,
        },
        title: {
          text: "Volume",
        },
        top: "70%",
        height: "30%",
        lineWidth: 2,
        resize: {
          enabled: true,
        },
      },
    ],
    xAxis: {
      type: "datetime",
    },
    tooltip: {
      shape: "square",
      headerShape: "callout",
      borderWidth: 0,
      shadow: false,
      positioner: function (width, height, point) {
        var chart = this.chart,
          position;

        if (point.isHeader) {
          position = {
            x: Math.max(
              // Left side limit
              chart.plotLeft,
              Math.min(
                point.plotX + chart.plotLeft - width / 2,
                // Right side limit
                chart.chartWidth - width - chart.marginRight
              )
            ),
            y: point.plotY,
          };
        } else {
          position = {
            x: point.series.chart.plotLeft,
            y: point.series.yAxis.top - chart.plotTop,
          };
        }

        return position;
      },
      // formatter: function () {
      //   return numberFormat.format(this.y, 0);
      // },
    },
    series: [
      {
        dataGrouping: {
          groupPixelWidth: 20,
          units: groupingUnits,
        },
        type: "candlestick",
        id: `${financialData.metaData[1]}-ohlc`,
        name: `${financialData.metaData[1]} Stock Price`,
        data: ohlcData,
        tooltip: {
          valuePrefix: `$`,
        },
      },
      {
        dataGrouping: {
          groupPixelWidth: 20,
          units: groupingUnits,
        },
        type: "column",
        id: `${financialData.metaData[1]}-volume`,
        name: `${financialData.metaData[1]} Volume`,
        data: volumeData,
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
