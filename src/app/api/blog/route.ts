import { NextResponse } from "next/server";
import prisma from "@/prisma/db";

export async function GET() {
  const blogs = await prisma.blog.findMany();
  return NextResponse.json(blogs);
}

export async function POST(request: Request) {
  const data = await request.json();
  const newBlog = await prisma.blog.create({ data });
  return NextResponse.json(newBlog, { status: 201 });
}
