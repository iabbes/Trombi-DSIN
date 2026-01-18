import { useState } from "react";
import people from "./data/people.json";
import projects from "./data/projects.json";
import "./App.css";
import OrganizationView from "./organization/organizationView.jsx";


function App() {
  const [viewMode, setViewMode] = useState("trombinoscope");

// "trombinoscope" | "organisation"
  const [search, setSearch] = useState("");
  const [activeDepartment, setActiveDepartment] = useState(null);
  const [activeGroup, setActiveGroup] = useState(null);
  const [hoveredDepartment, setHoveredDepartment] = useState(null); // pour le survol
  

  const organization = {
    "SI Activités": [
      "Solutions Industrie",
      "Solutions Clients",
      "Solutions eFluid"
    ],
    "SI Entreprise": [
      "Solutions Groupe",
      "Data / IA",
      "Services Transverses",
      "Intégration & Interfaces"
    ],
    "Opérateur Infrastructures": [
      "Réseaux & Télécoms",
      "IT / OT",
      "Exploitation"
    ],
    "CIO Office": [
      "Performance & Gouvernance"
    ],
    "Cybersécurité": []
  };

  const filteredPeople = people.filter(p => {
    const matchSearch =
      `${p.firstName} ${p.lastName} ${p.role} ${p.group} ${p.projects.join(" ")}`
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchDepartment =
      !activeDepartment || p.department === activeDepartment;

    const matchGroup =
      !activeGroup || p.group === activeGroup;

    return matchSearch && matchDepartment && matchGroup;
  });

  return (
    <div style={{ padding: "20px" }}>
      <h1>Qui fait quoi à la DSIN ? 🧐</h1>
      {viewMode === "organisation" && (
    <OrganizationView />
  )}
      

{/* Navbar Départements & groupes */}
<nav className="navbar">
<div className="nav-item">
  <button
    className={`nav-department ${viewMode === "trombinoscope" ? "active" : ""}`}
    onClick={() => setViewMode("trombinoscope")}
  >
    Trombinoscope
  </button>
</div>

<div className="nav-item">
  <button
    className={`nav-department ${viewMode === "organisation" ? "active" : ""}`}
    onClick={() => setViewMode("organisation")}
  >
    Organisation
  </button>
</div>
  {/* Bouton spécial DSIN */}
  <div className="nav-item">
    <button
      className={`nav-department ${!activeDepartment && !activeGroup ? "active" : ""}`}
      onClick={() => {
        setActiveDepartment(null);
        setActiveGroup(null);
      }}
    >
      DSIN
    </button>
  </div>

  {Object.keys(organization).map(dep => (
  <div
    key={dep}
    className="nav-item"
    onMouseEnter={() => setHoveredDepartment(dep)}
    onMouseLeave={() => setHoveredDepartment(null)}
  >
    <button
      className={`nav-department ${activeDepartment === dep ? "active" : ""}`}
      onClick={() => {
        setActiveDepartment(dep); // active le département pour filtrer les membres
        setActiveGroup(null);     // désactive le groupe
      }}
    >
      {dep}
    </button>

    {/* Menu déroulant visible uniquement au survol */}
    {hoveredDepartment === dep && organization[dep].length > 0 && (
      <div className="nav-groups">
        {organization[dep].map(group => (
          <button
            key={group}
            className={`nav-group ${activeGroup === group ? "active" : ""}`}
            onClick={() => setActiveGroup(group)}
          >
            {group}
          </button>
        ))}
      </div>
    )}
  </div>
))}

</nav>

{/* Trombinoscope */}
{viewMode === "trombinoscope" && (
  <div>
    {/* Recherche */}
    <input
      placeholder="Rechercher par nom, rôle, groupe ou projet"
      value={search}
      onChange={e => setSearch(e.target.value)}
      style={{ padding: "10px", width: "300px", marginTop: "20px" }}
    />

    {/* Résumé filtre */}
    {(activeDepartment || activeGroup) && (
      <p style={{ marginTop: "10px" }}>
        Filtre :
        <strong> {activeDepartment}</strong>
        {activeGroup && ` → ${activeGroup}`}
      </p>
    )}

    {/* Compteur */}
    <p style={{ marginTop: "10px", color: "#666" }}>
      {filteredPeople.length === 0
        ? "Aucune personne trouvée"
        : `${filteredPeople.length} personne${filteredPeople.length > 1 ? "s" : ""}`}
    </p>

    {/* Trombinoscope */}
    <div className="cards-grid">
      {filteredPeople.map((p, i) => (
        <div key={i} className="card">
          <img src={p.photo} width="100%" />
          <h3>{p.firstName} {p.lastName}</h3>
          <p>{p.role}</p>
          <p><strong>{p.group}</strong></p>
          <p style={{ fontSize: "12px" }}>{p.scope}</p>
          <p style={{ fontSize: "12px" }}>
            Projects: {p.projects.join(", ")}
          </p>
          </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
export default App;
