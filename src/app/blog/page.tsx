import { findBlogs } from "@/lib/actions/blogActions";
import type { Blog } from "@/types/blog";

export default async function Blog() {
  const initialBlogs = await findBlogs();

  return (
    <div>
      <h1>Blog Page</h1>
      <p>This is the blog page.</p>
      <ul>
        {initialBlogs.map((blog: Blog) => (
          <li key={blog.id} className="border my-3">
            <h2>{blog.title}</h2>
            <p>{blog.content}</p>
            <p>Created at: {blog.createdAt.toLocaleDateString()}</p>
            <p>Updated at: {blog.updatedAt.toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
