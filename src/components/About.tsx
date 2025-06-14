import { Code, Palette, Search, Zap, Award, Coffee, Clock, Users } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export function About() {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedSkills, setAnimatedSkills] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  const skills = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Frontend Development",
      description: "React, Vue.js, TypeScript, Tailwind CSS",
      color: "blue"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Backend Development", 
      description: "Node.js, Express, Python, PostgreSQL",
      color: "green"
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "UI/UX Design",
      description: "Figma, Adobe XD, Responsive Design",
      color: "purple"
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: "SEO Optimization",
      description: "Technical SEO, Performance, Analytics",
      color: "orange"
    }
  ];

  const stats = [
    { icon: <Award className="w-6 h-6" />, label: "Projects Completed", value: 25 },
    { icon: <Coffee className="w-6 h-6" />, label: "Cups of Coffee", value: 847 },
    { icon: <Clock className="w-6 h-6" />, label: "Hours Coding", value: 1200 },
    { icon: <Users className="w-6 h-6" />, label: "Happy Clients", value: 12 }
  ];

  const technicalSkills = [
    { name: "JavaScript/TypeScript", level: 90 },
    { name: "React/Vue.js", level: 85 },
    { name: "Node.js/Express", level: 80 },
    { name: "CSS/Tailwind", level: 95 },
    { name: "Database Design", level: 75 }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate skill bars with delay
          technicalSkills.forEach((_, index) => {
            setTimeout(() => {
              setAnimatedSkills(prev => [...prev, index]);
            }, index * 200);
          });
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400",
      green: "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400",
      purple: "bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400",
      orange: "bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400"
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section ref={sectionRef} id="about" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            About Me
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            I'm a passionate junior web developer with a keen eye for design and a love for creating 
            seamless digital experiences. With expertise in modern web technologies and a commitment 
            to continuous learning, I bring fresh perspectives to every project.
          </p>
        </div>

        {/* Animated Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg text-center transform transition-all duration-500 hover:scale-105 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="inline-flex p-3 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 mb-3">
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {isVisible ? stat.value.toLocaleString() : 0}+
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {skills.map((skill, index) => (
            <div
              key={index}
              className={`group bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-500 hover:scale-105 hover:-rotate-1 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className={`inline-flex p-3 rounded-lg ${getColorClasses(skill.color)} mb-4 group-hover:scale-110 transition-transform`}>
                {skill.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {skill.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {skill.description}
              </p>
            </div>
          ))}
        </div>

        {/* Enhanced Journey Section */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 lg:p-12 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                My Journey
              </h3>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  My passion for web development began during my computer science studies, where I 
                  discovered the perfect blend of creativity and logic that coding offers. I've since 
                  dedicated myself to mastering both frontend and backend technologies.
                </p>
                <p>
                  I believe in writing clean, maintainable code and creating user experiences that 
                  are not only beautiful but also accessible and performant. Every project is an 
                  opportunity to learn something new and push the boundaries of what's possible.
                </p>
                <p>
                  When I'm not coding, you can find me exploring new design trends, contributing to 
                  open-source projects, or learning about the latest web technologies and best practices.
                </p>
              </div>

              {/* Fun Facts */}
              <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Fun Facts</h4>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li>🎵 I code better with lo-fi music</li>
                  <li>🌱 Currently learning Three.js for 3D web experiences</li>
                  <li>📚 Read 12 tech books this year</li>
                  <li>🎮 Built my first game at age 14</li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Technical Skills
                </h4>
                <div className="space-y-4">
                  {technicalSkills.map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {skill.name}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                        <div
                          className={`bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-1000 ease-out ${
                            animatedSkills.includes(index) ? 'opacity-100' : 'opacity-0'
                          }`}
                          style={{ 
                            width: animatedSkills.includes(index) ? `${skill.level}%` : '0%',
                            transitionDelay: `${index * 200}ms`
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Recent Achievements</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">React Developer Certification</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">Google Analytics Certified</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">AWS Cloud Practitioner</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
