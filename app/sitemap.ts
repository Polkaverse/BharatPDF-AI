import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/tools/split-pdf",
    "/tools/merge-pdf",
    "/tools/rotate-pdf",
    "/tools/compress-pdf",
    "/tools/esign",
    "/tools/ocr",
    "/tools/invoice-generator",
  ];

  return routes.map((route) => ({
    url: `https://pdfstudio.site${route}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: route === "" ? 1.0 : 0.8,
  }));
}
