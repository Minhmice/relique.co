import { getPayload } from 'payload';
import config from '../../../../payload.config';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ truncated: string[] }> }
) {
  const payload = await getPayload({ config });
  return payload.handler(request);
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ truncated: string[] }> }
) {
  const payload = await getPayload({ config });
  return payload.handler(request);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ truncated: string[] }> }
) {
  const payload = await getPayload({ config });
  return payload.handler(request);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ truncated: string[] }> }
) {
  const payload = await getPayload({ config });
  return payload.handler(request);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ truncated: string[] }> }
) {
  const payload = await getPayload({ config });
  return payload.handler(request);
}
