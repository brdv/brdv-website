import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";

export async function GET(context: APIContext) {
  const posts = await getCollection("blog");

  return rss({
    title: "BRDV Blog",
    description: "Posts by Bram de Vries on software development",
    site: context.site!,
    trailingSlash: true,
    items: posts
      .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
      .map((post) => ({
        title: post.data.title,
        pubDate: post.data.date,
        description: post.data.description,
        link: `/blog/${post.data.slug || post.slug}/`,
      })),
  });
}
