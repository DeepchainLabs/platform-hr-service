import "reflect-metadata";
import { BlogService } from "@/services/BlogService";
import { NextRequest, NextResponse } from "next/server";
import Container from "typedi";

const blogService = Container.get(BlogService);

export async function GET(request: NextRequest) {
  const data = await blogService.findUsersByIds([
    "63a891f8-8670-4e41-a8ce-74179a3ce69a",
    "ef7ea3e6-5e31-442a-9cb8-5727b2cddd3e",
    "4e7290b5-92a7-4764-894a-9dc5a19d7d15",
    "1e6bbf50-dcda-4224-8001-afb53e7d2691",
  ]);
  return NextResponse.json(data);
}
