import { useState } from "react";
import OrganizationDiagram from "./OrganizationDiagram";
import { solutionsefluid } from "./solutionsefluid";
import "./organization.css";

const GROUPS = [solutionsefluid];

export default function OrganizationView() {
  const [activeGroup, setActiveGroup] = useState(GROUPS[0]);

  return (
    <div>
      {/* Boutons groupes */}
      <div className="org-tabs">
        {GROUPS.map(group => (
          <button
            key={group.id}
            className={activeGroup.id === group.id ? "active" : ""}
            onClick={() => setActiveGroup(group)}
          >
            {group.label}
          </button>
        ))}
      </div>

      {/* Diagramme */}
      <OrganizationDiagram data={activeGroup} />
    </div>
  );
}
