import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

type PasswordFieldProps = Omit<React.ComponentProps<"input">, "type"> & {
  id: string;
  label: string;
  error?: string;
  wrapperStyle?: React.CSSProperties;
};

export const PasswordField = ({
  id,
  label,
  error,
  wrapperStyle,
  ...inputProps
}: PasswordFieldProps) => {
  const [show, setShow] = useState(false);

  return (
    <div className="field" style={wrapperStyle}>
      <label htmlFor={id}>{label}</label>
      <div style={{ position: "relative" }}>
        <input
          className="input"
          id={id}
          type={show ? "text" : "password"}
          style={{ paddingRight: "36px" }}
          aria-invalid={!!error}
          {...inputProps}
        />
        <span
          onClick={() => setShow((p) => !p)}
          style={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            cursor: "pointer",
            color: "var(--color-text)",
            opacity: 0.55,
            display: "flex",
          }}
        >
          <FontAwesomeIcon icon={show ? faEyeSlash : faEye} />
        </span>
      </div>
      {error && (
        <p
          style={{
            fontSize: "12px",
            color: "#c0392b",
            marginTop: "4px",
            marginBottom: 0,
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
};
