import { NextRequest, NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/types";

type MarketplaceItemRow = Database["public"]["Tables"]["marketplace_items"]["Row"];

// GET /api/marketplace - List published marketplace items
export async function GET(request: NextRequest) {
  try {
    const supabase = createServiceRoleClient();
    const searchParams = request.nextUrl.searchParams;
    
    const category = searchParams.get("category");
    const sort = searchParams.get("sort") || "price-desc";
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "100");
    const offset = (page - 1) * pageSize;

    // Only fetch published items
    let query = supabase
      .from("marketplace_items")
      .select("*", { count: "exact" })
      .eq("status", "published")
      .range(offset, offset + pageSize - 1);

    if (category && category !== "ALL SPORTS") {
      query = query.eq("category", category);
    }

    // Apply sorting
    switch (sort) {
      case "price-asc":
        query = query.order("price_usd", { ascending: true });
        break;
      case "price-desc":
        query = query.order("price_usd", { ascending: false });
        break;
      case "newest":
        query = query.order("created_at", { ascending: false });
        break;
      default:
        query = query.order("price_usd", { ascending: false });
    }

    const { data, error, count } = await query;

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    // Transform data to match MarketplaceListing schema
    const items = (data || []).map((item: MarketplaceItemRow) => ({
      id: item.id,
      slug: item.slug,
      title: item.title,
      description: item.description,
      fullDescription: item.full_description || undefined,
      price: item.price_usd,
      image: item.image,
      images: item.images ? (typeof item.images === "string" ? JSON.parse(item.images) : item.images) : undefined,
      category: item.category,
      authenticated: item.authenticated,
      certificate: item.certificate || undefined,
      authenticatedDate: item.authenticated_date || undefined,
      coaIssuer: item.coa_issuer || undefined,
      signedBy: item.signed_by || undefined,
      condition: item.condition || undefined,
      provenance: item.provenance || undefined,
      status: item.status,
      createdAt: item.created_at,
      updatedAt: item.updated_at,
    }));

    return NextResponse.json({
      items,
      total: count || 0,
      page,
      pageSize,
      totalPages: Math.ceil((count || 0) / pageSize),
    });
  } catch (error) {
    console.error("Error fetching marketplace items:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

