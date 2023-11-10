import React, { useRef, useEffect } from "react";
import * as echarts from "echarts";

const RoundChart = ({ option, height }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      let chartInstance = echarts.getInstanceByDom(chartRef.current);
      if (!chartInstance) {
        chartInstance = echarts.init(chartRef.current);
      }
      chartInstance.setOption(option);
      window.addEventListener("resize", chartInstance.resize);
      return () => window.removeEventListener("resize", chartInstance.resize);
    }
  }, [option]);

  return <div ref={chartRef} style={{width: '100%', height }} />;
};

export default RoundChart;
