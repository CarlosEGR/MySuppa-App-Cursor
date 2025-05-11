import { NextResponse } from 'next/server';
import { apiKeyService } from '../../lib/api';

export async function POST(request) {
  try {
    const { apiKey } = await request.json();

    if (!apiKey) {
      return NextResponse.json(
        { message: 'API key is required' },
        { status: 400 }
      );
    }

    // Validate the API key using your service
    const isValid = await apiKeyService.validateKey(apiKey);

    if (!isValid) {
      return NextResponse.json(
        { message: 'Invalid API key' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { message: 'API key is valid' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error validating API key:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 