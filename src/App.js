import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPhoneAlt, FaUser, FaBirthdayCake } from "react-icons/fa";
import Sidebar from "./components/Sidebar";
import DiagnosisHistory from "./components/DiagnosisHistory";
import DiagnosticList from "./components/DiagnosticList";
import LabResults from "./components/LabResults";
import "./App.css";

const App = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(
          "https://fedskillstest.coalitiontechnologies.workers.dev/",
          {
            headers: {
              Authorization: "Basic " + btoa("coalition:skills-test"),
            },
          }
        );

        if (Array.isArray(response.data) && response.data.length > 0) {
          setPatients(response.data);
          setSelectedPatient(response.data[0]); // Select first patient
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  if (loading) return <div className="loading">Loading patient data...</div>;
  if (!selectedPatient) return <div className="error">No patient selected</div>;

  return (
    <div className="app">
      <Sidebar
        patients={patients}
        selectedPatient={selectedPatient}
        onSelect={setSelectedPatient}
      />

      <main className="main-content">
        <div className="patient-header">
          <img
            src={selectedPatient.profile_picture || "https://via.placeholder.com/100"}
            alt={selectedPatient.name}
            className="patient-avatar"
          />
          <div className="patient-details">
            <h2>{selectedPatient.name}</h2>
            <p>
              <FaUser className="icon" /> {selectedPatient.gender} &nbsp; | &nbsp;
              <FaBirthdayCake className="icon" /> {selectedPatient.date_of_birth} &nbsp; | &nbsp;
              <FaPhoneAlt className="icon" /> {selectedPatient.phone_number}
            </p>
            <p className="patient-notes">{selectedPatient.notes}</p>
          </div>
        </div>

        {/* Pass the correct API fields here */}
      <DiagnosisHistory vitals={selectedPatient.diagnosis_history || []} />
<DiagnosticList diagnostics={selectedPatient.diagnostic_list || []} />
<LabResults results={selectedPatient.lab_results || []} />

      </main>
    </div>
  );
};

export default App;
