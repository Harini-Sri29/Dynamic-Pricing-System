function linearRegression(data) {
    const n = data.length;
    let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
  
    data.forEach(({ x, y }) => {
      sumX += x;
      sumY += y;
      sumXY += x * y;
      sumX2 += x * x;
    });
  
    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX ** 2);
    const intercept = (sumY - slope * sumX) / n;
  
    return { slope, intercept };
  }
  
  function forecast(data, futureX) {
    const { slope, intercept } = linearRegression(data);
    return slope * futureX + intercept;
  }
  
  module.exports = { linearRegression, forecast };