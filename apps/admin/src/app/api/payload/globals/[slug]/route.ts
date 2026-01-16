import { NextRequest, NextResponse } from 'next/server';
import { payloadService } from '@/lib/services/payloadService';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const result = await payloadService.getGlobal(slug, 2);

    return NextResponse.json(result, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    });
  } catch (error) {
    console.error('Error fetching global:', error);
    return NextResponse.json(
      { error: 'Failed to fetch global' },
      { status: 500 }
    );
  }
}
