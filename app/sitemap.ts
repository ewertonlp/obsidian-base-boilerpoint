import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://obsidianbase.com";

  // Here you define the public routes that you want Google to index
  const routes = [
    "",
    "/login",
    "/register",
    "/pricing", // If you have a separate pricing page
  // "/blog", // Uncomment when creating the blog area
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8, // Home has top priority (1.0)
  }));

  /* 
    If you had a dynamic Blog or E-book, you would fetch from the database here
    and add the results to the array before returning.
  */

  return routes;
}