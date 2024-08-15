const fs = require('fs');
const path = require('path');

// Чтение JSON файла
const report = JSON.parse(fs.readFileSync('./lhci-report/lhci-report.json', 'utf-8'));

// Пример получения данных для графика
const metrics = {
  lcp: report.audits['largest-contentful-paint'].numericValue,
  fid: report.audits['first-input-delay'].numericValue,
  cls: report.audits['cumulative-layout-shift'].numericValue,
};

// Генерация HTML с графиком
const html = `
<!DOCTYPE html>
<html>
<head>
  <title>Web Vitals Report</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
  <h1>Web Vitals Metrics</h1>
  <canvas id="webVitalsChart" width="400" height="200"></canvas>
  <script>
    var ctx = document.getElementById('webVitalsChart').getContext('2d');
    var chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['LCP', 'FID', 'CLS'],
        datasets: [{
          label: 'Web Vitals Metrics',
          data: [${metrics.lcp}, ${metrics.fid}, ${metrics.cls}],
          backgroundColor: ['rgba(75, 192, 192, 0.2)'],
          borderColor: ['rgba(75, 192, 192, 1)'],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  </script>
</body>
</html>
`;

// Запись HTML файла
fs.writeFileSync('./lhci-report-with-graphs/index.html', html);
