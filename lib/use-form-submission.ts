"use client";

import { useState } from "react";
import type { ZodTypeAny } from "zod";
import { postJson } from "@/lib/api-client";

export type FieldErrors = Record<string, string | undefined>;

type State<T> =
  | { status: "idle" | "submitting" }
  | { status: "error"; message: string }
  | { status: "success"; data: T };

function firstErrors(fieldErrors: Record<string, string[] | undefined> = {}): FieldErrors {
  return Object.fromEntries(
    Object.entries(fieldErrors).map(([field, messages]) => [field, messages?.[0]]),
  );
}

/**
 * Validates with the same zod schema the route handler uses, then posts. Server-side
 * field errors (e.g. a slot that filled up) are merged back into the same shape.
 */
export function useFormSubmission<T>(endpoint: string, schema: ZodTypeAny) {
  const [state, setState] = useState<State<T>>({ status: "idle" });
  const [errors, setErrors] = useState<FieldErrors>({});

  async function submit(values: Record<string, unknown>) {
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      setErrors(firstErrors(parsed.error.flatten().fieldErrors));
      setState({ status: "error", message: "Please check the highlighted fields." });
      return;
    }

    setErrors({});
    setState({ status: "submitting" });
    const result = await postJson<T>(endpoint, parsed.data);

    if (result.ok) {
      setState({ status: "success", data: result.data });
    } else {
      setErrors(firstErrors(result.fieldErrors));
      setState({ status: "error", message: result.error });
    }
  }

  return { state, errors, submit, reset: () => setState({ status: "idle" }) };
}
