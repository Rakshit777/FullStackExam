import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Reports() {
  const [sqlReport, setSqlReport] = useState([]);
  const [mongoReport, setMongoReport] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      const sqlRes = await axios.get('http://localhost:5000/reports/top-spenders');
      const mongoRes = await axios.get('http://localhost:5000/products/summary/categories');
      setSqlReport(sqlRes.data);
      setMongoReport(mongoRes.data);
    };
    fetchReports();
  }, []);

  return (
    <div>
      <h1>Reports</h1>

      <h2>Top 3 Spenders (SQL)</h2>
      <ul>
        {sqlReport.map((report: any) => (
          <li key={report.id}>{report.name} - ${report.total_spent}</li>
        ))}
      </ul>

      <h2>Product Categories Summary (MongoDB)</h2>
      <ul>
        {mongoReport.map((cat: any) => (
          <li key={cat._id}>{cat._id}: {cat.totalProducts} products, Avg Price: ${cat.avgPrice.toFixed(2)}</li>
        ))}
      </ul>
    </div>
  );
} 
