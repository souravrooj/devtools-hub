import { MetadataRoute } from "next";
import { TOOLS } from "@/data/tools";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    // Sitemap for official tools
    const toolEntries = TOOLS.map((tool) => ({
        url: `${baseUrl}${tool.href}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.8,
    }));

    // Base Sitemap
    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "daily" as const,
            priority: 1.0,
        },
        ...toolEntries,
    ];
}
