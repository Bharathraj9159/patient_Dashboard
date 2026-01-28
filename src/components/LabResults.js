// src/components/LabResults.js
import React from "react";
import { FaDownload } from "react-icons/fa";
import "./LabResults.css";

const LabResults = ({ results = [] }) => {
  if (!results || results.length === 0) {
    return <div className="card">No lab results available.</div>;
  }

  return (
    <div className="card">
      <h3>Lab Results</h3>
      <table className="lab-table">
        <thead>
          <tr>
            <th>Test</th>
            <th>Download</th>
          </tr>
        </thead>
        <tbody>
          {results.map((r, index) => {
            const testName = typeof r === "string" ? r : r.name || "Unknown Test";
            return (
              <tr key={index}>
                <td>{testName}</td>
                <td className="download-icon">
                  <FaDownload className="icon" title={`Download ${testName}`} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default LabResults;
