import React, { useEffect, useRef } from 'react';
import { Chart, LineElement, PointElement, CategoryScale, LinearScale, Title, Legend, Tooltip } from 'chart.js';

Chart.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Legend, Tooltip);

const ProductTrendChart = ({ searchData }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy(); // Destroy previous instance to prevent duplicate rendering
    }

    // Prepare dataset
    const labels = searchData.labels; // X-axis labels, e.g., dates
    const datasets = searchData.products.map((product, index) => ({
      label: product.name,
      data: product.history, // Historical trend data
      borderColor: product.color || getRandomColor(), // Custom color or generate random
      fill: false,
      tension: 0.4, // Smooth line
    }));

    // Chart configuration
    chartInstanceRef.current = new Chart(ctx, {
      type: 'line',
      data: { labels, datasets },
      options: {
        responsive: true,
        plugins: {
          title: { display: true, text: 'Product Trends' },
          legend: { position: 'top' },
          tooltip: { enabled: true },
        },
        scales: {
          x: { title: { display: true, text: 'Date' } },
          y: { title: { display: true, text: 'Value' } },
        },
      },
    });
  }, [searchData]);

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return <canvas ref={chartRef}></canvas>;
};

export default ProductTrendChart;
