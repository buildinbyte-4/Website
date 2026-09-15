import { NextResponse } from 'next/server';

export class ApiError extends Error {
  constructor(message, status = 500, details = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

export function jsonSuccess(data, status = 200, headers = undefined) {
  return NextResponse.json({ success: true, data }, { status, headers });
}

export function jsonError(error, status = 500, details = null, headers = undefined) {
  const payload = { success: false, error };

  if (details) {
    payload.details = details;
  }

  return NextResponse.json(payload, { status, headers });
}
