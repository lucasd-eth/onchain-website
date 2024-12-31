import React, { useEffect, useRef } from "react";
import { fetchWalletData } from "../services/SupabaseClient";
import * as echarts from "echarts";

const WalletProfitChart = () => {
  const chartRef = useRef(null);
  const [rawData, setRawData] = React.useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchWalletData();
      setRawData(data);
    };
    fetchData();
  }, []);

  const segments = [
    { name: "0-5k$", range: (profit) => profit >= 0 && profit <= 5000 },
    { name: "5-10k$", range: (profit) => profit > 5000 && profit <= 10000 },
    { name: "10-15k$", range: (profit) => profit > 10000 && profit <= 15000 },
    { name: "15-20k$", range: (profit) => profit > 15000 && profit <= 20000 },
    { name: "20-25k$", range: (profit) => profit > 20000 && profit <= 25000 },
    { name: "25-30k$", range: (profit) => profit > 25000 && profit <= 30000 },
    { name: "30-35k$", range: (profit) => profit > 30000 && profit <= 35000 },
    { name: "35-40k$", range: (profit) => profit > 35000 && profit <= 40000 },
    { name: "40-45k$", range: (profit) => profit > 40000 && profit <= 45000 },
    { name: "45-50k$", range: (profit) => profit > 45000 && profit <= 50000 },
    { name: "over 50k$", range: (profit) => profit > 50000 },
  ];

  // Move groupedData calculation inside useEffect to recalculate when rawData changes
  const [groupedData, setGroupedData] = React.useState([]);

  useEffect(() => {
    const updatedGroupedData = segments.map((segment) => ({
      name: segment.name,
      count: rawData.filter((item) => segment.range(item.avg_pnl_latestmonth)).length,
    }));
    setGroupedData(updatedGroupedData);
  }, [rawData]);  // Recalculate when rawData changes

  useEffect(() => {
    const chartInstance = echarts.init(chartRef.current);

    const option = {
      title: {
        text: "Phân khúc lãi của ví",
        left: "center",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
        formatter: (params) => {
          const data = params[0];
          const segmentName = data.name;
          const count = data.value;
          return `${segmentName}: ${count} wallets`;
        },
      },
      xAxis: {
        type: "category",
        data: groupedData.map((data) => data.name),
        axisLabel: {
          rotate: 30,
          interval: 0,
        },
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: groupedData.map((data) => data.count),
          type: "bar",
          itemStyle: {
            color: "#007bff",
          },
          label: {
            show: true,
            position: "top",
          },
          emphasis: {
            itemStyle: {
              color: "#0056b3",
            },
          },
        },
      ],
    };

    chartInstance.setOption(option);

    return () => {
      chartInstance.dispose();
    };
  }, [groupedData]);  // Redraw the chart when groupedData changes

  return (
    <div>
      <h1>Phân khúc lãi của ví</h1>
      <div ref={chartRef} style={{ width: "600px", height: "400px" }}></div>
    </div>
  );
};

export default WalletProfitChart;
