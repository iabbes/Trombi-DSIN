import "./organization.css";

export default function OrganizationDiagram({ data }) {
  return (
    <div className="org-container">
      <div className="org-header">
        <h1>{data.title}</h1>
        <h2>{data.subtitle}</h2>
      </div>

      <div className="org-manager">
        CHEF DE GROUPE : <strong>{data.manager}</strong>
      </div>

      <div className="org-perimeters">
        {data.perimeters.map(p => (
          <div key={p.name} className={`org-perimeter ${p.color}`}>
            <h3>{p.name}</h3>
            {p.members.map(m => (
              <div key={m.name} className="org-member">
                <strong>{m.name}</strong>
                <span>{m.role}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="org-support">
        <h3>Support, Production et Recette</h3>
        <div className="org-support-list">
          {data.support.map(name => (
            <span key={name}>{name}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
