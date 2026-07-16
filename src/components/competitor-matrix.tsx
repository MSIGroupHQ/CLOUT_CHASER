import { competitorReview, competitorRows } from "@/lib/clout/competitive-position";

export function CompetitorMatrix() {
  return (
    <>
      <p className="matrix-scroll-hint">Swipe or scroll horizontally to compare the complete vendor-published view.</p>
      <div
        className="matrix-scroll competitor-matrix-scroll"
        role="region"
        aria-label="Clout Chaser and adjacent creator intelligence tools"
        tabIndex={0}
      >
        <table className="feature-matrix competitor-feature-matrix">
          <caption className="sr-only">
            Vendor-published feature and value comparison for Clout Chaser and four adjacent creator intelligence products.
          </caption>
          <thead>
            <tr>
              <th scope="col">Product</th>
              <th scope="col">Platform focus</th>
              <th scope="col">Signal discovery</th>
              <th scope="col">Creation handoff</th>
              <th scope="col">Language</th>
              <th scope="col">Public proof</th>
              <th scope="col">Team path</th>
              <th scope="col">Published value</th>
            </tr>
          </thead>
          <tbody>
            {competitorRows.map((row) => (
              <tr className={row.isClout ? "is-clout-row" : undefined} key={row.product}>
                <th scope="row">
                  <a href={row.href} rel={row.href.startsWith("http") ? "noreferrer" : undefined}>
                    {row.product}
                  </a>
                  {row.isClout ? <small>Launch scope</small> : <small>Official source</small>}
                </th>
                <td>{row.platform}</td>
                <td>{row.discovery}</td>
                <td>{row.handoff}</td>
                <td>{row.language}</td>
                <td>{row.proof}</td>
                <td>{row.team}</td>
                <td>{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="comparison-source-note">
        Checked {competitorReview.checkedAt}. {competitorReview.note}
      </p>
    </>
  );
}
