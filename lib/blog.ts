import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const dir = path.join(process.cwd(), "content", "blog");

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  readMinutes: number;
};

const readMinutes = (text: string) => Math.max(1, Math.ceil(text.trim().split(/\s+/).length / 200));

export function getPost(slug: string) {
  const file = path.join(dir, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  const meta: PostMeta = {
    slug,
    title: String(data.title),
    description: String(data.description ?? ""),
    date: String(data.date),
    author: String(data.author ?? "Zekured"),
    readMinutes: readMinutes(content),
  };
  return { meta, content };
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => getPost(f.replace(/\.mdx$/, ""))!.meta)
    .sort((a, b) => b.date.localeCompare(a.date));
}
