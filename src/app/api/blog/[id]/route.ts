import prisma from "@/prisma/db";
import { blogPatchSchema } from "@/validations/blog";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type BlogParams = {
  params: { id: string };
};

export async function PATCH(request: NextRequest, { params }: BlogParams) {
  const body = await request.json();
  const validation = blogPatchSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      { error: validation.error.format() },
      { status: 400 }
    );
  }

  const blog = await prisma.blog.findUnique({
    where: { id: params.id },
  });

  if (!blog) {
    return NextResponse.json({ error: "Blog not found" }, { status: 404 });
  }

  const updateBlog = await prisma.blog.update({
    where: { id: blog.id },
    data: { ...body },
  });

  revalidatePath(`/api/blog/${params.id}`);
  redirect(`/blog/${params.id}`);

  return NextResponse.json(updateBlog, { status: 200 });
}

export async function DELETE(request: NextRequest, { params }: BlogParams) {
  const blog = await prisma.blog.findUnique({
    where: { id: params.id },
  });

  if (!blog) {
    return NextResponse.json({ error: "Blog not found" }, { status: 404 });
  }

  await prisma.blog.delete({ where: { id: blog.id } });

  return NextResponse.json({ message: "Blog deleted" }, { status: 200 });
}
