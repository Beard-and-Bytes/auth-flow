import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordField } from "../password-field/password-field";

type FormValues = {
  email: string;
  password: string;
  passwordConfirm: string;
  displayName: string;
  agreedToTerms: boolean;
  agreedToPrivacyPolicy: boolean;
};

const schema = z
  .object({
    email: z.email(),
    password: z
      .string()
      .min(12, "Must be at least 12 characters")
      .refine(
        (v) => /[A-Z]/.test(v),
        "Must contain at least one uppercase letter",
      )
      .refine(
        (v) => /[a-z]/.test(v),
        "Must contain at least one lowercase letter",
      )
      .refine((v) => /[0-9]/.test(v), "Must contain at least one digit")
      .refine(
        (v) => /[^A-Za-z0-9]/.test(v),
        "Must contain at least one special character",
      ),
    passwordConfirm: z.string(),
    displayName: z.string().min(1, "Display name is required"),
    agreedToTerms: z.boolean().refine((v) => v === true, {
      message: "You must agree to the terms of service",
    }),
    agreedToPrivacyPolicy: z.boolean().refine((v) => v === true, {
      message: "You must agree to the privacy policy",
    }),
  })
  .superRefine((data, ctx) => {
    if (data.passwordConfirm !== data.password) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["passwordConfirm"],
      });
    }
  });

interface RegisterFormProps {
  onLogin?: () => void;
}

export const RegisterForm = ({ onLogin }: RegisterFormProps) => {
  const [registered, setRegistered] = useState(false);

  const {
    handleSubmit,
    formState: { errors, isSubmitted },
    register,
    reset,
    control,
    trigger,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { agreedToTerms: false, agreedToPrivacyPolicy: false },
  });

  const password = useWatch({ control, name: "password" });

  useEffect(() => {
    if (isSubmitted) {
      trigger("passwordConfirm");
    }
  }, [password, isSubmitted, trigger]);

  const onSubmit = () => {
    reset();
    setRegistered(true);
  };

  if (registered) {
    return (
      <div style={{ textAlign: "center" }}>
        <h2 style={{ marginBottom: "4px" }}>Check your email</h2>
        <p
          className="text-muted"
          style={{ fontSize: "13.5px", marginBottom: "var(--space-6)" }}
        >
          We sent a verification link to your inbox. Click it to activate your
          account.
        </p>
        {onLogin && (
          <span
            role="button"
            tabIndex={0}
            onClick={onLogin}
            onKeyDown={(e) => e.key === "Enter" && onLogin()}
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 600,
              fontSize: "13px",
              color: "var(--color-accent-700)",
              cursor: "pointer",
            }}
          >
            Back to log in
          </span>
        )}
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ marginBottom: "4px" }}>Create your account</h2>
      <p
        className="text-muted"
        style={{ fontSize: "13.5px", marginBottom: "var(--space-6)" }}
      >
        Set up your workspace in a minute.
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="field" style={{ marginBottom: "var(--space-4)" }}>
          <label htmlFor="reg-email">Email</label>
          <input
            className="input"
            id="reg-email"
            type="email"
            placeholder="Enter your email address"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          {errors.email && (
            <p
              style={{
                fontSize: "12px",
                color: "#c0392b",
                marginTop: "4px",
                marginBottom: 0,
              }}
            >
              {errors.email.message}
            </p>
          )}
        </div>

        <PasswordField
          id="reg-password"
          label="Password"
          placeholder="Enter a password"
          wrapperStyle={{ marginBottom: "var(--space-2)" }}
          error={errors.password?.message}
          {...register("password")}
        />

        <p
          className="text-muted"
          style={{ fontSize: "12px", margin: "0 0 var(--space-4)" }}
        >
          At least 12 characters with uppercase, lowercase, a digit, and a
          special character.
        </p>

        <PasswordField
          id="reg-password-confirm"
          label="Password Confirmation"
          placeholder="Re-enter your password"
          wrapperStyle={{ marginBottom: "var(--space-4)" }}
          error={errors.passwordConfirm?.message}
          {...register("passwordConfirm")}
        />

        <div className="field" style={{ marginBottom: "var(--space-4)" }}>
          <label htmlFor="displayName">Display Name</label>
          <input
            className="input"
            id="displayName"
            type="text"
            placeholder="Enter your display name"
            aria-invalid={!!errors.displayName}
            {...register("displayName")}
          />
          {errors.displayName && (
            <p
              style={{
                fontSize: "12px",
                color: "#c0392b",
                marginTop: "4px",
                marginBottom: 0,
              }}
            >
              {errors.displayName.message}
            </p>
          )}
        </div>

        <label
          style={{
            display: "flex",
            gap: "8px",
            alignItems: "center",
            fontSize: "13px",
            marginBottom: "var(--space-2)",
            cursor: "pointer",
          }}
        >
          <input
            type="checkbox"
            style={{
              width: "16px",
              height: "16px",
              accentColor: "var(--color-accent)",
            }}
            {...register("agreedToTerms")}
          />
          I agree to the <a href="#">Terms of Service</a>
        </label>
        {errors.agreedToTerms && (
          <p
            style={{
              fontSize: "12px",
              color: "#c0392b",
              marginTop: "4px",
              marginBottom: "var(--space-2)",
            }}
          >
            {errors.agreedToTerms.message}
          </p>
        )}

        <label
          style={{
            display: "flex",
            gap: "8px",
            alignItems: "center",
            fontSize: "13px",
            marginBottom: "var(--space-6)",
            cursor: "pointer",
          }}
        >
          <input
            type="checkbox"
            style={{
              width: "16px",
              height: "16px",
              accentColor: "var(--color-accent)",
            }}
            {...register("agreedToPrivacyPolicy")}
          />
          I agree to the <a href="#">Privacy Policy</a>
        </label>
        {errors.agreedToPrivacyPolicy && (
          <p
            style={{
              fontSize: "12px",
              color: "#c0392b",
              marginTop: "-14px",
              marginBottom: "var(--space-4)",
            }}
          >
            {errors.agreedToPrivacyPolicy.message}
          </p>
        )}

        <button type="submit" className="btn btn-primary btn-block">
          Register
        </button>
      </form>

      {onLogin && (
        <p
          style={{
            textAlign: "center",
            fontSize: "13.5px",
            marginTop: "var(--space-6)",
            marginBottom: 0,
          }}
        >
          Already have an account?{" "}
          <span
            role="button"
            tabIndex={0}
            onClick={onLogin}
            onKeyDown={(e) => e.key === "Enter" && onLogin()}
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 600,
              fontSize: "13px",
              color: "var(--color-accent-700)",
              cursor: "pointer",
            }}
          >
            Log in
          </span>
        </p>
      )}
    </div>
  );
};
