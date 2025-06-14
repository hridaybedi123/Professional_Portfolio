import { useState, useRef, useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Send, CheckCircle, MessageSquare, User, FileText } from "lucide-react";

export function Contact() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    projectType: "",
    budget: "",
    timeline: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const submitContact = useMutation(api.contacts.submitContact);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const nextStep = () => {
    if (currentStep === 1) {
      if (!formData.name || !formData.email) {
        toast.error("Please fill in your name and email");
        return;
      }
      if (!/\S+@\S+\.\S+/.test(formData.email)) {
        toast.error("Please enter a valid email address");
        return;
      }
    }
    if (currentStep === 2) {
      if (!formData.projectType || !formData.subject) {
        toast.error("Please select a project type and enter a subject");
        return;
      }
    }
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.message) {
      toast.error("Please tell me about your project");
      return;
    }

    setIsSubmitting(true);

    try {
      const submissionData = {
        name: formData.name,
        email: formData.email,
        subject: `${formData.projectType}: ${formData.subject}`,
        message: `Project Type: ${formData.projectType}\nBudget: ${formData.budget}\nTimeline: ${formData.timeline}\n\nMessage:\n${formData.message}`
      };
      
      await submitContact(submissionData);
      setIsSubmitted(true);
      toast.success("Message sent successfully! I'll get back to you within 24 hours.");
      setFormData({ 
        name: "", 
        email: "", 
        subject: "", 
        message: "",
        projectType: "",
        budget: "",
        timeline: ""
      });
      setCurrentStep(1);
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
      console.error("Contact form error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      value: "alex@example.com",
      link: "mailto:alex@example.com",
      description: "Best way to reach me"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      value: "+1 (555) 123-4567",
      link: "tel:+15551234567",
      description: "Available 9 AM - 6 PM PST"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Location",
      value: "San Francisco, CA",
      link: null,
      description: "Open to remote work"
    }
  ];

  const steps = [
    { number: 1, title: "Personal Info", icon: <User className="w-5 h-5" /> },
    { number: 2, title: "Project Details", icon: <FileText className="w-5 h-5" /> },
    { number: 3, title: "Your Message", icon: <MessageSquare className="w-5 h-5" /> }
  ];

  return (
    <section ref={sectionRef} id="contact" className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center mb-16 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Let's Work Together
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Ready to bring your ideas to life? I'd love to hear about your project. 
            Let's create something amazing together!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Enhanced Contact Information */}
          <div className={`space-y-8 transform transition-all duration-1000 delay-200 ${
            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
          }`}>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Get In Touch
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                I'm always excited about new opportunities and interesting projects. 
                Whether you have a question, want to discuss a potential collaboration, 
                or just want to say hello, don't hesitate to reach out!
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div 
                  key={index} 
                  className="group flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-300"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {info.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {info.title}
                    </h4>
                    {info.link ? (
                      <a
                        href={info.link}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors font-medium"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <span className="text-gray-900 dark:text-white font-medium">
                        {info.value}
                      </span>
                    )}
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {info.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Enhanced Response Time */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800">
              <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Quick Response Guarantee
              </h4>
              <p className="text-blue-700 dark:text-blue-300 text-sm leading-relaxed">
                I typically respond to messages within 24 hours during business days. 
                For urgent projects, I'm available for same-day consultation calls.
              </p>
            </div>

            {/* Availability Status */}
            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl border border-green-100 dark:border-green-800">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <h4 className="font-semibold text-green-900 dark:text-green-100">
                  Currently Available
                </h4>
              </div>
              <p className="text-green-700 dark:text-green-300 text-sm">
                Accepting new projects for Q2 2024. Book your consultation today!
              </p>
            </div>
          </div>

          {/* Enhanced Multi-Step Contact Form */}
          <div className={`transform transition-all duration-1000 delay-400 ${
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
          }`}>
            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    Thank you for reaching out! I've received your message and will get back to you within 24 hours. 
                    I'm excited to learn more about your project!
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  {/* Progress Steps */}
                  <div className="flex items-center justify-between mb-8">
                    {steps.map((step, index) => (
                      <div key={step.number} className="flex items-center">
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                          currentStep >= step.number
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                        }`}>
                          {currentStep > step.number ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : (
                            step.icon
                          )}
                        </div>
                        {index < steps.length - 1 && (
                          <div className={`w-16 h-1 mx-2 transition-all duration-300 ${
                            currentStep > step.number
                              ? 'bg-gradient-to-r from-blue-600 to-purple-600'
                              : 'bg-gray-200 dark:bg-gray-700'
                          }`}></div>
                        )}
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Step 1: Personal Information */}
                    {currentStep === 1 && (
                      <div className="space-y-6 animate-fadeIn">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                          Let's start with your details
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Full Name *
                            </label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300"
                              placeholder="John Doe"
                            />
                          </div>
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Email Address *
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300"
                              placeholder="john@example.com"
                            />
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={nextStep}
                          className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
                        >
                          Continue
                        </button>
                      </div>
                    )}

                    {/* Step 2: Project Details */}
                    {currentStep === 2 && (
                      <div className="space-y-6 animate-fadeIn">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                          Tell me about your project
                        </h3>
                        <div>
                          <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Project Type *
                          </label>
                          <select
                            id="projectType"
                            name="projectType"
                            value={formData.projectType}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300"
                          >
                            <option value="">Select a project type</option>
                            <option value="Website Design">Website Design</option>
                            <option value="Web Development">Web Development</option>
                            <option value="E-commerce">E-commerce</option>
                            <option value="SEO Optimization">SEO Optimization</option>
                            <option value="Consultation">Consultation</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Project Title *
                          </label>
                          <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300"
                            placeholder="e.g., Modern Portfolio Website"
                          />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div>
                            <label htmlFor="budget" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Budget Range
                            </label>
                            <select
                              id="budget"
                              name="budget"
                              value={formData.budget}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300"
                            >
                              <option value="">Select budget range</option>
                              <option value="Under $1,000">Under $1,000</option>
                              <option value="$1,000 - $5,000">$1,000 - $5,000</option>
                              <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                              <option value="$10,000+">$10,000+</option>
                            </select>
                          </div>
                          <div>
                            <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Timeline
                            </label>
                            <select
                              id="timeline"
                              name="timeline"
                              value={formData.timeline}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300"
                            >
                              <option value="">Select timeline</option>
                              <option value="ASAP">ASAP</option>
                              <option value="1-2 weeks">1-2 weeks</option>
                              <option value="1 month">1 month</option>
                              <option value="2-3 months">2-3 months</option>
                              <option value="Flexible">Flexible</option>
                            </select>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <button
                            type="button"
                            onClick={prevStep}
                            className="flex-1 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 font-semibold rounded-lg transition-all duration-300"
                          >
                            Back
                          </button>
                          <button
                            type="button"
                            onClick={nextStep}
                            className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
                          >
                            Continue
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Step 3: Message */}
                    {currentStep === 3 && (
                      <div className="space-y-6 animate-fadeIn">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                          Share your vision
                        </h3>
                        <div>
                          <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Project Description *
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={6}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300 resize-none"
                            placeholder="Tell me about your project goals, target audience, specific features you need, and any design preferences..."
                          />
                        </div>
                        <div className="flex gap-4">
                          <button
                            type="button"
                            onClick={prevStep}
                            className="flex-1 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 font-semibold rounded-lg transition-all duration-300"
                          >
                            Back
                          </button>
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-blue-400 disabled:to-purple-400 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105 disabled:scale-100"
                          >
                            {isSubmitting ? (
                              <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Sending...
                              </>
                            ) : (
                              <>
                                <Send className="w-5 h-5" />
                                Send Message
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
