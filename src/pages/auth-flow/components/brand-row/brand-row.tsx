export const BrandRow = () => (
  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "var(--space-6)" }}>
    <div style={{ width: "24px", height: "24px", border: "1px solid var(--color-text)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-700)" strokeWidth="1.5">
        <path d="M12 3l2.2 5.2L20 9l-4 3.6 1.1 5.9L12 15.8 6.9 18.5 8 12.6 4 9l5.8-.8z" />
      </svg>
    </div>
    <span style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "15px", letterSpacing: "0.02em" }}>
      Wolves-Bane
    </span>
  </div>
);
