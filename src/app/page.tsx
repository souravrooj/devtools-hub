"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import ToolCard from "@/components/ui/ToolCard";
import SearchBar from "@/components/ui/SearchBar";
import { TOOLS, CATEGORIES } from "@/data/tools";
import { useFavorites } from "@/hooks/useFavorites";
import { useRecentlyUsed } from "@/hooks/useRecentlyUsed";
import type { ToolCategory, Tool } from "@/types";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<ToolCategory | "all" | "favorites">(
    "all"
  );
  const { favorites } = useFavorites();
  const { recents } = useRecentlyUsed();
  const [tools, setTools] = useState<Tool[]>(TOOLS);

  // Fetch enhanced tools with stats
  useEffect(() => {
    const fetchTools = async () => {
      try {
        const res = await fetch("/api/tools");
        const json = await res.json();
        if (json.success && json.data.tools) {
          setTools(json.data.tools);
        }
      } catch (err) {
        console.error("Failed to fetch tools stats:", err);
      }
    };
    fetchTools();
  }, []);

  const recentTools = useMemo(() => {
    return recents
      .map(id => tools.find(t => t.id === id))
      .filter((t): t is typeof TOOLS[0] => !!t);
  }, [recents, tools]);

  const filtered = useMemo(() => {
    let results = tools;

    // Favorites filter
    if (activeCategory === "favorites") {
      results = results.filter((t) => favorites.includes(t.id));
    } else if (activeCategory !== "all") {
      // Category filter
      results = results.filter((t) => t.category === activeCategory);
    }

    // Search filter
    const q = search.toLowerCase().trim();
    if (q) {
      results = results.filter((tool) => {
        const haystack = [
          tool.name,
          tool.description,
          tool.category,
          ...(tool.keywords ?? []),
        ]
          .join(" ")
          .toLowerCase();
        return haystack.includes(q);
      });
    }

    return results;
  }, [search, activeCategory, favorites, tools]);

  const available = filtered.filter((t) => t.available);
  const comingSoon = filtered.filter((t) => !t.available);

  return (
    <>
      {/* Hero Section */}
      <section
        style={{
          padding: "4rem 0 2.5rem",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle gradient orb */}
        <div
          style={{
            position: "absolute",
            top: "-120px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "600px",
            height: "400px",
            background:
              "radial-gradient(ellipse at center, rgb(99 102 241 / 0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div
          className="container animate-fade-in"
          style={{ position: "relative" }}
        >
          <div
            className="badge badge-accent"
            style={{
              marginBottom: "1rem",
              display: "inline-flex",
            }}
          >
            ⚡ Free · No login · Instant results
          </div>

          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1.15,
              margin: "0 0 0.75rem",
              color: "var(--text-primary)",
            }}
          >
            Developer Tools,{" "}
            <span
              style={{
                background: "linear-gradient(135deg, var(--accent), #8b5cf6, #ec4899)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              All in One Place
            </span>
          </h1>

          <p
            style={{
              fontSize: "1.125rem",
              color: "var(--text-secondary)",
              maxWidth: "560px",
              margin: "0 auto 2rem",
              lineHeight: 1.6,
            }}
          >
            Format JSON, generate passwords, preview Markdown, encode Base64,
            and more — instantly, right in your browser.
          </p>

          {/* Search */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <SearchBar value={search} onChange={setSearch} />
          </div>

          {/* Recently Used (Client only) */}
          {recentTools.length > 0 && activeCategory === "all" && !search && (
            <div
              className="animate-fade-in"
              style={{
                marginTop: "2rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                animationDelay: "100ms"
              }}
            >
              <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.75rem" }}>
                Recently Used
              </div>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", justifyContent: "center" }}>
                {recentTools.map(tool => (
                  <Link
                    key={tool.id}
                    href={tool.href}
                    className="btn btn-ghost btn-sm"
                    style={{ background: "var(--bg-muted)", borderRadius: "var(--radius-md)", padding: "0.5rem 0.75rem" }}
                  >
                    <span>{tool.icon}</span>
                    <span style={{ fontSize: "0.8125rem" }}>{tool.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Category Tabs */}
      <section className="container" style={{ paddingBottom: "1.5rem" }}>
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <button
            onClick={() => setActiveCategory("all")}
            className={`btn btn-sm ${activeCategory === "all" ? "btn-primary" : "btn-ghost"}`}
          >
            All Tools
          </button>
          <button
            onClick={() => setActiveCategory("favorites")}
            className={`btn btn-sm ${activeCategory === "favorites" ? "btn-primary" : "btn-ghost"}`}
            style={{ color: favorites.length > 0 ? "#ef4444" : "inherit" }}
          >
            ❤️ Favorites {favorites.length > 0 && `(${favorites.length})`}
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`btn btn-sm ${activeCategory === cat.id ? "btn-primary" : "btn-ghost"}`}
            >
              <span>{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Tools Grid */}
      <section className="container" style={{ paddingBottom: "3rem" }}>
        {available.length > 0 && (
          <>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                gap: "1.25rem",
              }}
            >
              {available.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </>
        )}

        {/* Coming Soon Section */}
        {comingSoon.length > 0 && (
          <div style={{ marginTop: "3rem" }}>
            <h2
              style={{
                fontSize: "1.125rem",
                fontWeight: 700,
                color: "var(--text-muted)",
                marginBottom: "1rem",
                letterSpacing: "-0.02em",
              }}
            >
              🔮 Coming Soon
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fill, minmax(320px, 1fr))",
                gap: "1.25rem",
              }}
            >
              {comingSoon.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </div>
        )}

        {/* No results */}
        {filtered.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "4rem 0",
            }}
          >
            <p
              style={{
                fontSize: "3rem",
                marginBottom: "0.5rem",
              }}
            >
              🔍
            </p>
            <p
              style={{
                fontSize: "1.125rem",
                fontWeight: 600,
                color: "var(--text-primary)",
                marginBottom: "0.25rem",
              }}
            >
              No tools found
            </p>
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: "0.9375rem",
              }}
            >
              Try a different search term or category
            </p>
          </div>
        )}
      </section>
    </>
  );
}
