export default function Shell({ children, className = '' }) {
  return (
    <div className={`page-shell ${className}`.trim()}>
      <div className="ambient ambient-a" />
      <div className="ambient ambient-b" />
      <div className="mist-layer" />
      <main className="app-frame">{children}</main>
    </div>
  );
}
