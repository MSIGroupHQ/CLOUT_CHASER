import { accessTypes, membershipColumns, membershipRows } from "@/lib/clout/membership";

function accessTone(value: string) {
  if (value === "—") return "none";
  if (/custom|eligible|request|package|risk-based|later|preview|notes|delivery/i.test(value)) return "conditional";
  return "included";
}

export function MembershipMatrix() {
  return (
    <>
      <div className="access-type-grid">
        {accessTypes.map((type) => (
          <article key={type.label}>
            <span className="panel-index">{type.label}</span>
            <h3>{type.title}</h3>
            <p>{type.body}</p>
          </article>
        ))}
      </div>

      <p className="matrix-scroll-hint">Swipe or scroll horizontally to compare every access type.</p>
      <div
        className="matrix-scroll membership-matrix-scroll"
        role="region"
        aria-label="Clout Chaser access and membership comparison"
        tabIndex={0}
      >
        <table className="feature-matrix membership-feature-matrix">
          <caption className="sr-only">
            Features available to guests, one-off buyers, members, teams, and business users.
          </caption>
          <thead>
            <tr>
              <th scope="col">Inside Clout Chaser</th>
              {membershipColumns.map((column) => (
                <th scope="col" key={column.key}>
                  <strong>{column.label}</strong>
                  <small>{column.detail}</small>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {membershipRows.map((row) => (
              <tr key={row.feature}>
                <th scope="row">{row.feature}</th>
                {membershipColumns.map((column) => {
                  const value = row.values[column.key];
                  return (
                    <td data-access={accessTone(value)} key={column.key}>
                      {value}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
