import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "../../lib/utils";

type InputFieldProps = React.ComponentProps<"input"> & {
  label: string;
  ariaInvalid?: boolean;
  errorMessage?: string;
  helperText?: string;
};

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (
    { label, id, type, ariaInvalid, errorMessage, helperText, className, ...inputProps },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPasswordField = type === "password";
    const isCheckboxField = type === "checkbox";

    if (isCheckboxField) {
      return (
        <div className="flex flex-col">
          <div className="flex items-center space-x-2">
            <Input
              ref={ref}
              id={id}
              type="checkbox"
              aria-invalid={ariaInvalid}
              className={cn("h-4 w-4", className)}
              {...inputProps}
            />
            <Label htmlFor={id} className="text-sm">
              {label}
            </Label>
          </div>
          {errorMessage && (
            <p className="pl-6 text-sm text-red-500">{errorMessage}</p>
          )}
        </div>
      );
    }

    return (
      <div>
        <Label className="pb-2" htmlFor={id}>
          {label}
        </Label>
        {isPasswordField ? (
          <div className="relative">
            <Input
              ref={ref}
              id={id}
              type={showPassword ? "text" : "password"}
              aria-invalid={ariaInvalid}
              className={cn("pr-8", className)}
              {...inputProps}
            />
            <button
              type="button"
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>
        ) : (
          <Input
            ref={ref}
            id={id}
            type={type}
            aria-invalid={ariaInvalid}
            className={className}
            {...inputProps}
          />
        )}
        {helperText && <p className="text-sm text-muted-foreground">{helperText}</p>}
        {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
      </div>
    );
  },
);

InputField.displayName = "InputField";
