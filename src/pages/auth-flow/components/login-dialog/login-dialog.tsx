import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterForm } from "../register-form/register-form";
import { AuthCard } from "../auth-card/auth-card";
import { PasswordField } from "../password-field/password-field";
import { BASE_PATH } from "../../routes";

type Mode = "login" | "register";

interface LoginDialogProps {
  initialMode?: Mode;
}

type FormValues = {
  email: string;
  password: string;
};

const schema = z.object({
  email: z.email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export const LoginDialog = ({ initialMode = "login" }: LoginDialogProps) => {
  const [mode, setMode] = useState<Mode>(initialMode);
  const [loggedIn, setLoggedIn] = useState(false);

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = () => {
    reset();
    setLoggedIn(true);
  };

  if (loggedIn) {
    return (
      <AuthCard>
        <div style={{ textAlign: "center" }}>
          <h2 style={{ marginBottom: "4px" }}>You&apos;re logged in!</h2>
          <p
            className="text-muted"
            style={{ fontSize: "13.5px", marginBottom: "var(--space-6)" }}
          >
            Welcome back.
          </p>
          <button
            className="btn btn-primary btn-block"
            onClick={() => { reset(); setLoggedIn(false); }}
          >
            Log out
          </button>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard>
      {mode === "login" ? (
        <div>
          <h2 style={{ marginBottom: "4px" }}>Login</h2>
          <p
            className="text-muted"
            style={{ fontSize: "13.5px", marginBottom: "var(--space-6)" }}
          >
            Please enter your email and password to login.
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="field" style={{ marginBottom: "var(--space-4)" }}>
              <label htmlFor="email">Email</label>
              <input
                className="input"
                id="email"
                type="email"
                placeholder="Enter your email"
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
              id="password"
              label="Password"
              placeholder="Enter your password"
              wrapperStyle={{ marginBottom: "var(--space-6)" }}
              error={errors.password?.message}
              {...register("password")}
            />

            <button type="submit" className="btn btn-primary btn-block">
              Login
            </button>
          </form>

          <p
            style={{
              textAlign: "center",
              fontSize: "13.5px",
              marginTop: "var(--space-6)",
              marginBottom: 0,
            }}
          >
            Don&apos;t have an account?{" "}
            <span
              role="button"
              tabIndex={0}
              onClick={() => setMode("register")}
              onKeyDown={(e) => e.key === "Enter" && setMode("register")}
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 600,
                fontSize: "13px",
                color: "var(--color-accent-700)",
                cursor: "pointer",
              }}
            >
              Register
            </span>
          </p>
          <p
            style={{
              textAlign: "center",
              fontSize: "13.5px",
              marginTop: "var(--space-2)",
              marginBottom: 0,
            }}
          >
            <Link
              to={`${BASE_PATH}/request-reset`}
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 600,
                fontSize: "13px",
                color: "var(--color-accent-700)",
                textDecoration: "none",
              }}
            >
              Forgot password?
            </Link>
          </p>
        </div>
      ) : (
        <RegisterForm onLogin={() => setMode("login")} />
      )}
    </AuthCard>
  );
};
