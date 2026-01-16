import { NextRequest, NextResponse } from 'next/server';
import { payloadService } from '@/lib/services/payloadService';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ collection: string }> }
) {
  const { collection } = await params;
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '100');
    const page = parseInt(searchParams.get('page') || '1');
    const sort = searchParams.get('sort') || '-createdAt';
    const whereParam = searchParams.get('where');

    let where = {};
    if (whereParam) {
      try {
        where = JSON.parse(whereParam);
      } catch (e) {
        // Invalid JSON, ignore
      }
    }

    const result = await payloadService.getCollection(collection, {
      where,
      limit,
      page,
      sort,
      depth: 2,
    });

    return NextResponse.json(result, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    });
  } catch (error) {
    console.error('Error fetching collection:', error);
    return NextResponse.json(
      { error: 'Failed to fetch collection' },
      { status: 500 }
    );
  }
}
