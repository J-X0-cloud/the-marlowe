import { NextResponse } from "next/server";
import type { ZodError } from "zod";

export type ApiError = {
  ok: false;
  error: string;
  fieldErrors?: Record<string, string[] | undefined>;
};

export type ApiSuccess<T> = { ok: true; data: T };

export type ApiResult<T> = ApiSuccess<T> | ApiError;

export function ok<T>(data: T, status = 200) {
  return NextResponse.json<ApiSuccess<T>>({ ok: true, data }, { status });
}

export function fail(error: string, status: number, fieldErrors?: ApiError["fieldErrors"]) {
  return NextResponse.json<ApiError>({ ok: false, error, fieldErrors }, { status });
}

export function validationFailed(error: ZodError) {
  return fail("Please check the highlighted fields.", 422, error.flatten().fieldErrors);
}

export async function readJson(request: Request): Promise<unknown> {
  try {
    return await request.json();
  } catch {
    return null;
  }
}
