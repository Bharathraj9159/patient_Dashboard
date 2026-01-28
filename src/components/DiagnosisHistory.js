// src/components/DiagnosisHistory.js
import React, { useEffect, useRef } from "react";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Legend,
} from "chart.js";
import {
  HeartPulse,
  Activity,
  ThermometerSun,
} from "lucide-react"; // simple icons
import "./DiagnosisHistory.css";

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Legend
);

const DiagnosisHistory = ({ vitals }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!vitals || vitals.length === 0) return;

    const ctx = chartRef.current.getContext("2d");
    if (window.bpChart) window.bpChart.destroy();

    const labels = vitals.map(
      (v) => `${v.month || ""} ${v.year || ""}`.trim()
    );
    const systolic = vitals.map(
      (v) => v.blood_pressure?.systolic?.value || 0
    );
    const diastolic = vitals.map(
      (v) => v.blood_pressure?.diastolic?.value || 0
    );

    window.bpChart = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Systolic (mmHg)",
            data: systolic,
            borderColor: "#ef4444",
            fill: false,
            tension: 0.3,
          },
          {
            label: "Diastolic (mmHg)",
            data: diastolic,
            borderColor: "#3b82f6",
            fill: false,
            tension: 0.3,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "bottom" },
          title: { display: true, text: "Blood Pressure History" },
        },
        scales: {
          y: { beginAtZero: false },
        },
      },
    });
  }, [vitals]);

  if (!vitals || vitals.length === 0) {
    return (
      <div className="section">
        <h3>Diagnosis History</h3>
        <p>No blood pressure data available.</p>
      </div>
    );
  }

  const latest = vitals[vitals.length - 1];

  return (
    <div className="section">
      <h3>Diagnosis History</h3>

      <div className="vital-boxes">
        <div className="vital-card">
          <HeartPulse className="vital-icon heart" />
          <div>
            <p>Heart Rate</p>
            <h4>{latest.heart_rate?.value ?? "—"} bpm</h4>
            <span className="vital-status">{latest.heart_rate?.levels}</span>
          </div>
        </div>

        <div className="vital-card">
          <Activity className="vital-icon respiratory" />
          <div>
            <p>Respiratory Rate</p>
            <h4>{latest.respiratory_rate?.value ?? "—"} bpm</h4>
            <span className="vital-status">{latest.respiratory_rate?.levels}</span>
          </div>
        </div>

        <div className="vital-card">
          <ThermometerSun className="vital-icon temperature" />
          <div>
            <p>Temperature</p>
            <h4>{latest.temperature?.value ?? "—"} °F</h4>
            <span className="vital-status">{latest.temperature?.levels}</span>
          </div>
        </div>
      </div>

      <canvas ref={chartRef} width="400" height="200"></canvas>
    </div>
  );
};

export default DiagnosisHistory;
