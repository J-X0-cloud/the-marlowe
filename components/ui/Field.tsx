import clsx from "clsx";
import type { ReactNode } from "react";

type FieldProps = {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
};

/** Label + control + inline error in the `.field` column layout. */
export function Field({ id, label, error, children }: FieldProps) {
  return (
    <div className={clsx("field", error && "has-error")}>
      <label htmlFor={id}>{label}</label>
      {children}
      {error ? (
        <p className="field-error" id={`${id}-error`}>
          {error}
        </p>
      ) : null}
    </div>
  );
}

/** Connects a control to its Field error for assistive tech. */
export function errorProps(id: string, error?: string) {
  return error ? { "aria-invalid": true, "aria-describedby": `${id}-error` } : {};
}
