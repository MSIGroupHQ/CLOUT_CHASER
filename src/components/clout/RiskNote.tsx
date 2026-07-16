export function RiskNote({ children }: { children: React.ReactNode }) {
  return (
    <aside className="risk-note" role="note">
      <span className="panel-index">RIGHTS NOTE</span>
      <p>{children}</p>
    </aside>
  );
}
