import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { ExternalLink, Github, Filter, Star, Eye } from "lucide-react";

export function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [visibleProjects, setVisibleProjects] = useState<Set<number>>(new Set());
  const projects = useQuery(api.projects.getProjects, { category: selectedCategory });
  const seedProjects = useMutation(api.projects.seedProjects);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Seed projects on component mount
    seedProjects();
  }, [seedProjects]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleProjects(prev => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.1 }
    );

    projectRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [projects]);

  const categories = [
    { id: "all", label: "All Projects", count: projects?.length || 0 },
    { id: "frontend", label: "Frontend", count: projects?.filter(p => p.category === "frontend").length || 0 },
    { id: "fullstack", label: "Full Stack", count: projects?.filter(p => p.category === "fullstack").length || 0 },
    { id: "design", label: "Design", count: projects?.filter(p => p.category === "design").length || 0 }
  ];

  return (
    <section id="projects" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A showcase of my recent work, demonstrating my skills in web development, 
            design, and problem-solving across various technologies and platforms.
          </p>
        </div>

        {/* Enhanced Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`group px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 relative overflow-hidden ${
                selectedCategory === category.id
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:scale-105"
              }`}
            >
              <Filter className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
              <span>{category.label}</span>
              {category.count > 0 && (
                <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                  selectedCategory === category.id
                    ? "bg-white/20 text-white"
                    : "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                }`}>
                  {category.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Enhanced Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects?.map((project, index) => (
            <div
              key={project._id}
              ref={(el) => {
                projectRefs.current[index] = el;
              }}
              data-index={index}
              className={`group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden relative transform ${
                visibleProjects.has(index) 
                  ? 'translate-y-0 opacity-100 scale-100' 
                  : 'translate-y-10 opacity-0 scale-95'
              }`}
              style={{ transitionDelay: `${(index % 3) * 100}ms` }}
            >
              {/* Enhanced Project Image */}
              <div className="relative overflow-hidden h-48">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Overlay buttons */}
                <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white/90 hover:bg-white text-gray-900 rounded-full shadow-lg transform hover:scale-110 transition-all duration-200"
                      aria-label="View live demo"
                    >
                      <Eye className="w-5 h-5" />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white/90 hover:bg-white text-gray-900 rounded-full shadow-lg transform hover:scale-110 transition-all duration-200"
                      aria-label="View source code"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                </div>

                {/* Enhanced Featured Badge */}
                {project.featured && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 shadow-lg">
                    <Star className="w-3 h-3 fill-current" />
                    Featured
                  </div>
                )}

                {/* Category Badge */}
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium capitalize">
                  {project.category}
                </div>
              </div>

              {/* Enhanced Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 leading-relaxed">
                  {project.description}
                </p>

                {/* Enhanced Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.techStack.slice(0, 4).map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium hover:scale-105 transition-transform cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium">
                      +{project.techStack.length - 4}
                    </span>
                  )}
                </div>

                {/* Enhanced Project Links */}
                <div className="flex gap-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span className="font-medium">Live Demo</span>
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg transition-all duration-300 transform hover:scale-105"
                    >
                      <Github className="w-4 h-4" />
                      <span className="font-medium">Code</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Loading State */}
        {!projects && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
              >
                <div className="w-full h-48 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-600 animate-pulse"></div>
                <div className="p-6">
                  <div className="h-6 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-600 rounded mb-2 animate-pulse"></div>
                  <div className="h-4 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-600 rounded mb-4 animate-pulse"></div>
                  <div className="flex gap-2 mb-4">
                    <div className="h-6 w-16 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-600 rounded-full animate-pulse"></div>
                    <div className="h-6 w-20 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-600 rounded-full animate-pulse"></div>
                  </div>
                  <div className="flex gap-4">
                    <div className="h-10 flex-1 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-600 rounded animate-pulse"></div>
                    <div className="h-10 w-20 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-600 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Project Count */}
        {projects && projects.length > 0 && (
          <div className="text-center mt-12">
            <p className="text-gray-600 dark:text-gray-300">
              Showing {projects.length} {selectedCategory === "all" ? "projects" : `${selectedCategory} projects`}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
