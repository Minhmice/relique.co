import { NextRequest, NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/server";

// GET /api/marketplace/[slug] - Get single published marketplace item by slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const supabase = createServiceRoleClient();

    const { data, error } = await supabase
      .from("marketplace_items")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return NextResponse.json(
          { error: "Item not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    // Transform data to match MarketplaceListing schema
    const item = {
      id: data.id,
      slug: data.slug,
      title: data.title,
      description: data.description,
      fullDescription: data.full_description || undefined,
      price: data.price_usd,
      image: data.image,
      images: data.images ? (typeof data.images === "string" ? JSON.parse(data.images) : data.images) : undefined,
      category: data.category,
      authenticated: data.authenticated,
      certificate: data.certificate || undefined,
      authenticatedDate: data.authenticated_date || undefined,
      coaIssuer: data.coa_issuer || undefined,
      signedBy: data.signed_by || undefined,
      condition: data.condition || undefined,
      provenance: data.provenance || undefined,
      status: data.status,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };

    return NextResponse.json(item);
  } catch (error) {
    console.error("Error fetching marketplace item:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

