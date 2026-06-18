/**
 * Featured Products API Route
 * GET /api/products/featured - Get featured products
 */
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Product from '@/lib/models/Product';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const limit = Math.min(20, Math.max(1, Number(searchParams.get('limit')) || 6));

    const products = await Product.find({ featured: true })
      .sort('-createdAt')
      .limit(limit)
      .lean();

    return NextResponse.json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch featured products',
      },
      { status: 500 }
    );
  }
}
