import React from "react";
import { Search } from "lucide-react";
import "./Sidebar.css";

const Sidebar = ({ patients, selectedPatient, onSelect }) => {
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredPatients = patients.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Patients</h2>

      <div className="sidebar-search">
        <Search size={18} className="search-icon" />
        <input
          type="text"
          placeholder="Search patient..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <ul className="patient-list">
        {filteredPatients.map((p, index) => (
          <li
            key={index}
            className={`patient-item ${
              selectedPatient?.name === p.name ? "active" : ""
            }`}
            onClick={() => onSelect(p)}
          >
            <div className="patient-info">
              <img
                src={p.profile_picture || "https://via.placeholder.com/50"}
                alt={p.name}
                className="patient-thumb"
              />
              <span className="patient-name">{p.name}</span>
            </div>
          </li>
        ))}
        {filteredPatients.length === 0 && (
          <p className="no-results">No patients found</p>
        )}
      </ul>
    </aside>
  );
};

export default Sidebar;
