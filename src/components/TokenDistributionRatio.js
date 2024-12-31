// Tệp ChartComponent.js
import React, { useEffect, useState } from 'react';
import * as echarts from 'echarts';
import { fetchWalletDatanew } from '../services/SupabaseClient';

const ChartComponent = () => {
  const [chartData, setChartData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const { tokenCount } = await fetchWalletDatanew();

    // Danh sách các giá trị cần loại bỏ
      const excludedTokens = ["9eF4iX4BzeKnvJ7gSw5L725jk48zJw2m66NFxHHvpump", "zrvL3iuAqoBdfwAmaUYrYcS8UjUk6LbKrexT7aepump"]; 

    // Lấy 20 token được mua nhiều nhất
      const topTokens = Object.entries(tokenCount)
        .filter(([name]) => !excludedTokens.includes(name)) // Loại bỏ token nằm trong excludedTokens
        .sort((a, b) => b[1] - a[1])  // Sắp xếp theo số lần mua giảm dần
        .slice(0, 22);  // Chỉ lấy 20 token đầu tiên

      // Chuyển đổi thành định dạng phù hợp với ECharts
      const chartData = topTokens.map(([name, value]) => ({
        name,
        value,
      }));

      setChartData(chartData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (chartData.length > 0) {
      // Khởi tạo biểu đồ
      const chart = echarts.init(document.getElementById('chart'));

      const option = {
        tooltip: {
          trigger: 'item',
        },
        legend: {
          top: '5%',
          left: 'center',
        },
        series: [
          {
            name: 'Tokens',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2,
            },
            label: {
              show: false,
              position: 'center',
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: 'bold',
              },
            },
            labelLine: {
              show: false,
            },
            data: chartData,
          },
        ],
      };

      chart.setOption(option);
    }
  }, [chartData]);

  return (
    <div>
      <div id="chart" style={{ width: '600px', height: '400px' }}></div>
    </div>
  );
};

export default ChartComponent;
