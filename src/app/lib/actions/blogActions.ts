"use server";

import prisma from "@/prisma/db";
import { BlogSchema } from "@/validations/blog";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function findBlogs() {
  try {
    return await prisma.blog.findMany();
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw new Error("Failed to fetch blogs");
  }
}

export async function findBlog(id: string) {
  if (!id) {
    throw new Error("ID is required");
  }
  try {
    return await prisma.blog.findFirst({ where: { id } });
  } catch (error) {
    console.error(`Error finding blog with ID ${id}:`, error);
    throw new Error("Failed to find blog");
  }
}

export async function createBlog(data: BlogSchema) {
  if (!data.title) {
    throw new Error("Title is required");
  }
  if (!data.content) {
    throw new Error("Content is required");
  }

  try {
    await prisma.blog.create({ data });
  } catch (error) {
    console.error("Error creating blog:", error);
    throw new Error("Failed to create blog");
  }
  revalidatePath("/blog");
  redirect("/blog");
}

export async function updateBlog(id: string, data: BlogSchema) {
  if (!id) {
    throw new Error("ID is required");
  }
  if (!data.title && !data.content) {
    throw new Error("Title or content is required");
  }

  try {
    await prisma.blog.update({ where: { id }, data });
  } catch (error) {
    console.error(`Error updating blog with ID ${id}:`, error);
    throw new Error("Failed to update blog");
  }
  revalidatePath("/blog");
  redirect("/blog");
}

export async function deleteBlog(id: string) {
  if (!id) {
    throw new Error("ID is required");
  }

  try {
    await prisma.blog.delete({ where: { id } });
  } catch (error) {
    console.error(`Error deleting blog with ID ${id}:`, error);
    throw new Error("Failed to delete blog");
  }
  revalidatePath("/blog");
  redirect("/blog");
}
