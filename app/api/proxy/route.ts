import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url');

  if (!url) {
    console.error('Proxy error: URL parameter is missing');
    return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 });
  }

  console.log('Attempting to fetch:', url);

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    });

    if (!response.ok) {
      console.error(`Proxy error: Failed to fetch ${url}. Status: ${response.status} ${response.statusText}`);
      return NextResponse.json({ error: `Failed to fetch: ${response.status} ${response.statusText}` }, { status: response.status });
    }

    const contentType = response.headers.get('content-type');
    const body = await response.arrayBuffer();

    console.log('Successfully fetched resource. Content-Type:', contentType);

    return new NextResponse(body, {
      headers: {
        'Content-Type': contentType || 'application/octet-stream',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json({ error: 'Failed to fetch the resource' }, { status: 500 });
  }
}
