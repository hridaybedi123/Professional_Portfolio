import { Code, Palette, Search, Zap, CheckCircle } from "lucide-react";

export function Services() {
  const services = [
    {
      icon: <Palette className="w-12 h-12" />,
      title: "Web Design",
      description: "Creating beautiful, user-friendly interfaces that engage and convert visitors into customers.",
      features: [
        "Responsive Design",
        "UI/UX Optimization",
        "Brand Integration",
        "Accessibility Focus"
      ],
      color: "purple"
    },
    {
      icon: <Search className="w-12 h-12" />,
      title: "SEO Optimization",
      description: "Improving your website's visibility and ranking on search engines to drive organic traffic.",
      features: [
        "Technical SEO",
        "Performance Optimization",
        "Content Strategy",
        "Analytics Setup"
      ],
      color: "green"
    },
    {
      icon: <Code className="w-12 h-12" />,
      title: "Full-Stack Development",
      description: "Building complete web applications from frontend interfaces to backend systems and databases.",
      features: [
        "Frontend Development",
        "Backend APIs",
        "Database Design",
        "Cloud Deployment"
      ],
      color: "blue"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      purple: {
        bg: "bg-purple-100 dark:bg-purple-900",
        text: "text-purple-600 dark:text-purple-400",
        border: "border-purple-200 dark:border-purple-800",
        button: "bg-purple-600 hover:bg-purple-700"
      },
      green: {
        bg: "bg-green-100 dark:bg-green-900",
        text: "text-green-600 dark:text-green-400",
        border: "border-green-200 dark:border-green-800",
        button: "bg-green-600 hover:bg-green-700"
      },
      blue: {
        bg: "bg-blue-100 dark:bg-blue-900",
        text: "text-blue-600 dark:text-blue-400",
        border: "border-blue-200 dark:border-blue-800",
        button: "bg-blue-600 hover:bg-blue-700"
      }
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section id="services" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Services I Offer
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            I provide comprehensive web development services to help bring your digital vision to life. 
            From design to deployment, I've got you covered.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const colors = getColorClasses(service.color);
            return (
              <div
                key={index}
                className={`bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 p-8 border-2 ${colors.border}`}
              >
                {/* Service Icon */}
                <div className={`inline-flex p-4 rounded-xl ${colors.bg} ${colors.text} mb-6`}>
                  {service.icon}
                </div>

                {/* Service Content */}
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features List */}
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <CheckCircle className={`w-5 h-5 ${colors.text} flex-shrink-0`} />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  className={`w-full py-3 px-6 ${colors.button} text-white font-semibold rounded-lg transition-colors`}
                >
                  Get Started
                </button>
              </div>
            );
          })}
        </div>

        {/* Process Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              My Development Process
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              A streamlined approach to deliver high-quality results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Discovery",
                description: "Understanding your needs, goals, and target audience"
              },
              {
                step: "02",
                title: "Planning",
                description: "Creating wireframes, choosing technologies, and project timeline"
              },
              {
                step: "03",
                title: "Development",
                description: "Building your solution with clean, maintainable code"
              },
              {
                step: "04",
                title: "Launch",
                description: "Testing, optimization, and deployment to production"
              }
            ].map((process, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {process.step}
                </div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {process.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {process.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
