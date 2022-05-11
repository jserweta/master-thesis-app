import React, { useState, useRef, useEffect } from "react";

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
import { getDataSelectedOnChart } from "../../helpers/preparePatternDetectionData";

import * as Patterns from "../../logic/candlestickPatterns/index";

indicatorsAll(Highcharts);
annotationsAdvanced(Highcharts);
priceIndicator(Highcharts);
heikinashi(Highcharts);
hollowcandlestick(Highcharts);
fullScreen(Highcharts);
exporting(Highcharts);
stockTools(Highcharts);
brandDark(Highcharts);

const MyStockChart = ({ financialData, patternDetection, companyName }) => {
  let stockChartComponent = useRef(null);
  let selectedPattern = useRef({});

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

  // let groupingUnits = [
  //   ["day", [1]],
  //   ["week", [1]],
  //   ["month", [1, 3, 6]],
  // ];

  const addFlagsToChart = (patternIndexes, displayedData, flagName) => {
    let chartSeries = stockChartComponent.current.chart.series[0];

    let patternFlags =
      stockChartComponent.current.chart.get("candlestickPattern");

    chartSeries.processedXData.forEach((chartXSeriesElem, i) => {
      patternIndexes.forEach((patternIndexesElem) => {
        if (chartXSeriesElem === displayedData.timestamp[patternIndexesElem]) {
          let index = patternFlags.xData.indexOf(
            displayedData.timestamp[patternIndexesElem]
          );
          if (index === -1) {
            patternFlags.addPoint({
              x: chartXSeriesElem,
              y: chartSeries.processedYData[i][0],
              text: `<h2 class="tooltipPattern__header">${flagName}</h2><br>
                      <h1 class="tooltipPattern__category">Open: </h1><p>$${chartSeries.processedYData[i][0]}</p><br>
                      <h1 class="tooltipPattern__category">High: </h1><p>$${chartSeries.processedYData[i][1]}</p><br>
                      <h1 class="tooltipPattern__category">Low: </h1><p>$${chartSeries.processedYData[i][2]}</p><br>
                      <h1 class="tooltipPattern__category">Close: </h1><p>$${chartSeries.processedYData[i][3]}</p>`,
              title: "●",
            });
          }
        }
      });
    });
  };

  const clearFlagsData = () => {
    let patternFlags =
      stockChartComponent.current.chart.get("candlestickPattern");
    // stockChartComponent.current.chart.series[2].setData([]);
    patternFlags.setData([]);
  };

  const findCandlestickPattern = function (dataMin, dataMax) {
    let addFlags = false;
    let patternIndexes;
    const displayedData = getDataSelectedOnChart(
      financialData.ohlcData,
      dataMin, // chart.xAxis[0].min,
      dataMax //chart.xAxis[0].max
    );

    switch (selectedPattern.current.name) {
      case "Doji":
        patternIndexes = Patterns.doji(displayedData);
        addFlags = true;
        break;
      case "Morning star":
        patternIndexes = Patterns.morningStar(displayedData);
        addFlags = true;
        break;
      case "Evening star":
        patternIndexes = Patterns.eveningStar(displayedData);
        addFlags = true;
        break;
      case "Bullish hammer stick":
        patternIndexes = Patterns.bullishHammerStick(displayedData);
        addFlags = true;
        break;
      case "Bearish hammer stick":
        patternIndexes = Patterns.bearishHammerStick(displayedData);
        addFlags = true;
        break;
      case "Dark cloud cover":
        patternIndexes = Patterns.darkCloudCover(displayedData);
        addFlags = true;
        break;
      case "Three black crows":
        patternIndexes = Patterns.threeBlackCrows(displayedData);
        addFlags = true;
        break;
      case "Three white soldiers":
        patternIndexes = Patterns.threeWhiteSoldiers(displayedData);
        addFlags = true;
        break;
      case "Bearish harami":
        patternIndexes = Patterns.bearishHarami(displayedData);
        addFlags = true;
        break;
      case "Bearish harami cross":
        patternIndexes = Patterns.bearishHaramiCross(displayedData);
        addFlags = true;
        break;
      case "Bearish inverted hammer stick":
        patternIndexes = Patterns.bearishInvertedHammerStick(displayedData);
        addFlags = true;
        break;
      case "Bearish spinning top":
        patternIndexes = Patterns.bearishSpinningTop(displayedData);
        addFlags = true;
        break;
      case "Bullish spinning top":
        patternIndexes = Patterns.bullishSpinningTop(displayedData);
        addFlags = true;
        break;
      case "Bullish inverted hammer stick":
        patternIndexes = Patterns.bullishInvertedHammerStick(displayedData);
        addFlags = true;
        break;
      case "Bullish harami":
        patternIndexes = Patterns.bullishHarami(displayedData);
        addFlags = true;
        break;
      case "Bullish harami cross":
        patternIndexes = Patterns.bullishHaramiCross(displayedData);
        addFlags = true;
        break;
      // case "Abandoned baby":
      //   patternIndexes = Patterns.abandonedBaby(displayedData);
      //   addFlags = true;
      //   break;
      case "Dragonfly doji":
        patternIndexes = Patterns.dragonflyDoji(displayedData);
        addFlags = true;
        break;
      case "Gravestone doji":
        patternIndexes = Patterns.gravestoneDoji(displayedData);
        addFlags = true;
        break;
      case "Morning doji star":
        patternIndexes = Patterns.morningDojiStar(displayedData);
        addFlags = true;
        break;
      case "Evening doji star":
        patternIndexes = Patterns.eveningDojiStar(displayedData);
        addFlags = true;
        break;
      case "Bullish engulfing":
        patternIndexes = Patterns.bullishEngulfing(displayedData);
        addFlags = true;
        break;
      case "Bearish engulfing":
        patternIndexes = Patterns.bearishEngulfing(displayedData);
        addFlags = true;
        break;
      case "Piercing line":
        patternIndexes = Patterns.piercingLine(displayedData);
        addFlags = true;
        break;
      default:
        addFlags = false;
        clearFlagsData();
    }
    addFlags &&
      addFlagsToChart(
        patternIndexes,
        displayedData,
        selectedPattern.current.name
      );
  };

  const [stockChartOptions] = useState({
    chart: {
      height: 500,
      renderTo: "chartContainer",
      // width: 1000,
    },
    title: {
      text: `${companyName}`,
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
        height: "85%",
        lineWidth: 2,
        resize: {
          enabled: true,
        },
      },
      {
        offset: 10,
        labels: {
          align: "left",
          x: 40,
        },
        title: {
          text: "Volume",
        },
        top: "70%",
        height: "25%",
        lineWidth: 2,
        resize: {
          enabled: true,
        },
      },
    ],
    xAxis: {
      type: "datetime",
      events: {
        afterSetExtremes: function (e) {
          findCandlestickPattern(e.min, e.max);
        },
      },
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
          if ("category" in point) {
            position = {
              x: point.series.chart.plotLeft,
              y: point.series.yAxis.top - chart.plotTop,
            };
          } else {
            position = {
              x: chart.plotLeft,
              y: chart.plotTop,
            };
          }
        }

        return position;
      },
    },
    series: [
      {
        // dataGrouping: {
        //   groupPixelWidth: 20,
        //   units: groupingUnits,
        // },
        type: "candlestick",
        id: "candlestickDataSeries", //`${financialData.metaData[1]}-ohlc`
        name: `${financialData.metaData[1]} Stock Price`,
        data: ohlcData,
        tooltip: {
          valuePrefix: `$`,
        },
      },
      {
        // dataGrouping: {
        //   groupPixelWidth: 20,
        //   units: groupingUnits,
        // },
        type: "column",
        id: `${financialData.metaData[1]}-volume`,
        name: `${financialData.metaData[1]} Volume`,
        data: volumeData,
        yAxis: 1,
      },
      {
        id: "candlestickPattern",
        type: "flags",
        data: [],
        onSeries: "candlestickDataSeries",
        showInLegend: false,
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
  });

  useEffect(() => {
    if (Object.keys(patternDetection).length !== 0) {
      selectedPattern.current = patternDetection;
      clearFlagsData();
    }

    if (stockChartComponent.current.chart !== null) {
      stockChartComponent.current.chart.rangeSelector.clickButton(
        2,
        { type: "month", count: "6" },
        true
      );
      findCandlestickPattern(
        stockChartComponent.current.chart.xAxis[0].min,
        stockChartComponent.current.chart.xAxis[0].max
      );
    }
  }, [patternDetection, selectedPattern]);

  return (
    <HighchartsReact
      ref={stockChartComponent}
      highcharts={Highcharts}
      constructorType={"stockChart"}
      options={stockChartOptions}
      allowChartUpdate={true}
      containerProps={{ style: { width: "100%" } }}
    />
  );
};

export default MyStockChart;
