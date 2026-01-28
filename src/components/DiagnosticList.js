// src/components/DiagnosticList.js
import React from "react";
import "./DiagnosticList.css";

const DiagnosticList = ({ diagnostics = [] }) => {
  if (!diagnostics || diagnostics.length === 0) {
    return <div className="section">No diagnostic records found.</div>;
  }

  return (
    <div className="section">
      <h3>Diagnostic List</h3>
      <ul className="diagnostic-list">
        {diagnostics.map((d, index) => (
          <li key={index} className="diagnostic-item">
            <div className="diagnostic-header">
              <h4>{d.name}</h4>
              {d.status && (
                <span
                  className={`status-tag ${
                    d.status.toLowerCase().includes("observation")
                      ? "status-warning"
                      : d.status.toLowerCase().includes("critical")
                      ? "status-danger"
                      : "status-normal"
                  }`}
                >
                  {d.status}
                </span>
              )}
            </div>
            <p className="diagnostic-description">{d.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DiagnosticList;
