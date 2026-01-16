import { handleEndpoints } from 'payload';
import config from '../../../../payload.config';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ truncated: string[] }> }
) {
  await params;
  return handleEndpoints({
    config,
    request,
  });
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ truncated: string[] }> }
) {
  await params;
  return handleEndpoints({
    config,
    request,
  });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ truncated: string[] }> }
) {
  await params;
  return handleEndpoints({
    config,
    request,
  });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ truncated: string[] }> }
) {
  await params;
  return handleEndpoints({
    config,
    request,
  });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ truncated: string[] }> }
) {
  await params;
  return handleEndpoints({
    config,
    request,
  });
}
