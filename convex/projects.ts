import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getProjects = query({
  args: {
    category: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    if (args.category && args.category !== "all") {
      return await ctx.db
        .query("projects")
        .withIndex("by_category", (q) => q.eq("category", args.category!))
        .order("desc")
        .collect();
    }
    
    return await ctx.db.query("projects").order("desc").collect();
  },
});

export const getFeaturedProjects = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("projects")
      .withIndex("by_featured", (q) => q.eq("featured", true))
      .order("desc")
      .take(3);
  },
});

export const seedProjects = mutation({
  args: {},
  handler: async (ctx) => {
    // Check if projects already exist
    const existingProjects = await ctx.db.query("projects").take(1);
    if (existingProjects.length > 0) {
      return "Projects already seeded";
    }

    const projects = [
      {
        title: "E-Commerce Platform",
        description: "A full-stack e-commerce solution with React, Node.js, and Stripe integration. Features include user authentication, product catalog, shopping cart, and payment processing.",
        techStack: ["React", "Node.js", "MongoDB", "Stripe", "Express"],
        category: "fullstack",
        imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
        liveUrl: "https://demo-ecommerce.example.com",
        githubUrl: "https://github.com/username/ecommerce-platform",
        featured: true,
      },
      {
        title: "Task Management App",
        description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
        techStack: ["Vue.js", "Firebase", "Vuetify", "Socket.io"],
        category: "frontend",
        imageUrl: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
        liveUrl: "https://taskmanager-demo.example.com",
        githubUrl: "https://github.com/username/task-manager",
        featured: true,
      },
      {
        title: "Restaurant Website",
        description: "A responsive restaurant website with online reservation system, menu display, and contact information. Optimized for SEO and mobile devices.",
        techStack: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL"],
        category: "design",
        imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop",
        liveUrl: "https://restaurant-demo.example.com",
        githubUrl: "https://github.com/username/restaurant-website",
        featured: false,
      },
      {
        title: "Weather Dashboard",
        description: "A weather dashboard application that displays current weather conditions and forecasts for multiple cities with beautiful data visualizations.",
        techStack: ["React", "Chart.js", "OpenWeather API", "Tailwind CSS"],
        category: "frontend",
        imageUrl: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400&fit=crop",
        liveUrl: "https://weather-dashboard.example.com",
        githubUrl: "https://github.com/username/weather-dashboard",
        featured: true,
      },
      {
        title: "Blog CMS",
        description: "A content management system for bloggers with markdown support, image uploads, and SEO optimization features.",
        techStack: ["Next.js", "Prisma", "PostgreSQL", "Vercel"],
        category: "fullstack",
        imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop",
        liveUrl: "https://blog-cms.example.com",
        githubUrl: "https://github.com/username/blog-cms",
        featured: false,
      },
      {
        title: "Portfolio Template",
        description: "A modern, responsive portfolio template for developers and designers with dark mode support and smooth animations.",
        techStack: ["HTML5", "CSS3", "JavaScript", "GSAP"],
        category: "design",
        imageUrl: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop",
        liveUrl: "https://portfolio-template.example.com",
        githubUrl: "https://github.com/username/portfolio-template",
        featured: false,
      },
    ];

    for (const project of projects) {
      await ctx.db.insert("projects", project);
    }

    return "Projects seeded successfully";
  },
});
