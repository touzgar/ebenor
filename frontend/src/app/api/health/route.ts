/**
 * Health Check API Route
 * GET /api/health
 */
import { NextResponse } from 'next/server';
import { connectDB, getConnectionState } from '@/lib/mongodb';

export async function GET() {
  try {
    // Try to connect to MongoDB
    await connectDB();
    const dbState = getConnectionState();

    return NextResponse.json({
      success: true,
      message: 'API is running',
      timestamp: new Date().toISOString(),
      database: {
        status: dbState,
        connected: dbState === 'connected',
      },
      version: '2.0.0',
      environment: process.env.NODE_ENV,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'API is running but database connection failed',
        timestamp: new Date().toISOString(),
        database: {
          status: 'error',
          connected: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        },
        version: '2.0.0',
        environment: process.env.NODE_ENV,
      },
      { status: 503 }
    );
  }
}
