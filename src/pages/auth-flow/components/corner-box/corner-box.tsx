import React from "react";

interface CornerBoxProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const CornerBox = ({ children, className, style }: CornerBoxProps) => (
  <div className={className} style={style}>
    <i className="corner tl" />
    <i className="corner tr" />
    <i className="corner bl" />
    <i className="corner br" />
    {children}
  </div>
);
