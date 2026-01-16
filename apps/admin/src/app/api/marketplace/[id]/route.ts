import { NextRequest, NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/server";
import { z } from "zod";

const UpdateMarketplaceItemSchema = z.object({
  slug: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  full_description: z.string().optional().nullable(),
  price_usd: z.number().optional(),
  currency: z.string().optional(),
  image: z.string().optional(),
  images: z.array(z.string()).optional().nullable(),
  category: z.string().optional(),
  status: z.enum(["draft", "pending", "published", "suspended", "unpublished", "archived"]).optional(),
  authenticated: z.boolean().optional(),
  certificate: z.string().optional().nullable(),
  authenticated_date: z.string().optional().nullable(),
  coa_issuer: z.string().optional().nullable(),
  signed_by: z.string().optional().nullable(),
  condition: z.string().optional().nullable(),
  provenance: z.string().optional().nullable(),
  seller_name: z.string().optional().nullable(),
  seller_rating: z.number().optional().nullable(),
  seller_verified: z.boolean().optional().nullable(),
  is_featured: z.boolean().optional(),
  featured_order: z.number().optional().nullable(),
  commission_rate: z.number().optional().nullable(),
}).partial();

// GET /api/marketplace/[id] - Get single item
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = createServiceRoleClient();

    const { data, error } = await supabase
      .from("marketplace_items")
      .select("*")
      .eq("id", id)
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

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching marketplace item:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PATCH /api/marketplace/[id] - Update item
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = createServiceRoleClient();
    const body = await request.json();

    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/f7dc8aa7-be7f-4274-bffb-71b80fe9d9f5',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'route.ts:77',message:'PATCH request body received',data:{id,bodyKeys:Object.keys(body),bodyValues:Object.values(body).map(v=>v===undefined?'undefined':typeof v)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
    // #endregion

    const validated = UpdateMarketplaceItemSchema.parse(body);

    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/f7dc8aa7-be7f-4274-bffb-71b80fe9d9f5',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'route.ts:80',message:'Validation passed',data:{validatedKeys:Object.keys(validated),validatedValues:Object.values(validated).map(v=>v===undefined?'undefined':typeof v)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
    // #endregion

    // Filter out undefined values and prepare update data
    const updateData: any = {};
    Object.keys(validated).forEach((key) => {
      const value = (validated as any)[key];
      if (value !== undefined) {
        updateData[key] = value;
      }
    });

    if (validated.images !== undefined) {
      updateData.images = validated.images ? JSON.stringify(validated.images) : null;
    }

    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/f7dc8aa7-be7f-4274-bffb-71b80fe9d9f5',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'route.ts:95',message:'UpdateData prepared',data:{updateDataKeys:Object.keys(updateData),updateDataLength:Object.keys(updateData).length,updateDataValues:Object.entries(updateData).reduce((acc:Record<string,string>,[k,v])=>{acc[k]=v===undefined?'undefined':typeof v;return acc},{})},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
    // #endregion

    // Check if there's anything to update
    if (Object.keys(updateData).length === 0) {
      // No updates, just return the existing item
      const { data: existingItem, error: fetchError } = await supabase
        .from("marketplace_items")
        .select("*")
        .eq("id", id)
        .single();

      if (fetchError) {
        return NextResponse.json(
          { error: fetchError.message },
          { status: 400 }
        );
      }

      if (!existingItem) {
        return NextResponse.json(
          { error: "Item not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(existingItem);
    }

    // First verify item exists
    const { data: existingItem, error: checkError } = await supabase
      .from("marketplace_items")
      .select("id")
      .eq("id", id)
      .maybeSingle();

    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/f7dc8aa7-be7f-4274-bffb-71b80fe9d9f5',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'route.ts:112',message:'Item existence check',data:{hasError:!!checkError,errorMessage:checkError?.message,hasExistingItem:!!existingItem,existingItemId:(existingItem as any)?.id},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'G'})}).catch(()=>{});
    // #endregion

    if (checkError) {
      return NextResponse.json(
        { error: checkError.message },
        { status: 400 }
      );
    }

    if (!existingItem) {
      return NextResponse.json(
        { error: "Item not found" },
        { status: 404 }
      );
    }

    const { data, error } = await (supabase
      .from("marketplace_items") as any)
      .update(updateData)
      .eq("id", id)
      .select()
      .maybeSingle();

    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/f7dc8aa7-be7f-4274-bffb-71b80fe9d9f5',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'route.ts:167',message:'Supabase update result',data:{hasError:!!error,errorMessage:error?.message,errorCode:error?.code,errorDetails:error?.details,hasData:!!data,dataKeys:data?Object.keys(data):null,updateData},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
    // #endregion

    if (error) {
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/f7dc8aa7-be7f-4274-bffb-71b80fe9d9f5',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'route.ts:175',message:'Returning error response',data:{errorMessage:error.message,status:400},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'H'})}).catch(()=>{});
      // #endregion
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    if (!data) {
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/f7dc8aa7-be7f-4274-bffb-71b80fe9d9f5',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'route.ts:184',message:'No data returned from update',data:{id,updateDataKeys:Object.keys(updateData),status:500},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'I'})}).catch(()=>{});
      // #endregion
      // If no data returned, fetch the item directly to verify it still exists
      const { data: fetchedItem, error: fetchError } = await supabase
        .from("marketplace_items")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (fetchError || !fetchedItem) {
        return NextResponse.json(
          { error: "Item not found after update attempt" },
          { status: 404 }
        );
      }

      // Update may have succeeded but select didn't return data
      // Return the fetched item instead
      return NextResponse.json(fetchedItem);
    }

    // Log audit
    await (supabase.from("audit_logs") as any)
      .insert({
        action: "UPDATE",
        entity_type: "marketplace_item",
        entity_id: id,
        metadata: { updates: validated },
      });

    return NextResponse.json(data);
  } catch (error) {
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/f7dc8aa7-be7f-4274-bffb-71b80fe9d9f5',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'route.ts:170',message:'Catch block error',data:{errorType:error instanceof z.ZodError?'ZodError':error?.constructor?.name,errorMessage:error instanceof Error?error.message:String(error),zodIssues:error instanceof z.ZodError?error.issues:null},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
    // #endregion

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.issues },
        { status: 400 }
      );
    }
    console.error("Error updating marketplace item:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/marketplace/[id] - Delete item
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = createServiceRoleClient();

    const { error } = await supabase
      .from("marketplace_items")
      .delete()
      .eq("id", id);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    // Log audit
    await (supabase.from("audit_logs") as any)
      .insert({
        action: "DELETE",
        entity_type: "marketplace_item",
        entity_id: id,
      });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting marketplace item:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

