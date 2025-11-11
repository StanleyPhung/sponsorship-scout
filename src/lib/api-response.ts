import superjson from 'superjson';
import { NextResponse } from 'next/server';

export function jsonResponse(data: any, status = 200) {
  return new NextResponse(superjson.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
