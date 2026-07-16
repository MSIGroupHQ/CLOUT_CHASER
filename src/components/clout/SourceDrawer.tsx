export function SourceDrawer({ sourceNote }: { sourceNote: string }) {
  return (
    <details className="source-drawer">
      <summary>Open source note</summary>
      <p>{sourceNote}</p>
    </details>
  );
}
