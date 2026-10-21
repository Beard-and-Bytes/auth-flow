import React from "react";
import { BrandRow } from "../brand-row/brand-row";
import { CornerBox } from "../corner-box/corner-box";

export const AuthCard = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "var(--space-8) var(--space-4)",
      background: "var(--color-bg)",
    }}
  >
    <CornerBox
      className="blueprint elev-md"
      style={{
        width: "440px",
        maxWidth: "100%",
        padding: "var(--space-8)",
        background: "var(--color-bg)",
      }}
    >
      <BrandRow />
      {children}
    </CornerBox>
  </div>
);
