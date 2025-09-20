import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";

export const Projects = () => {
  const projects = [
    {
      title: "AIFlix Movie Website",
      description: "A feature-rich movie platform that integrates with the TMDb API to display a vast collection of films. Built with a Node.js and MongoDB backend for secure user authentication and data management. Features include advanced search, filtering options, and AI-powered movie recommendations to enhance user experience.",
      technologies: ["HTML", "CSS", "JavaScript", "Node.js", "React", "MongoDB", "Render"],
      liveUrl: "https://aiflix1.onrender.com/",
      githubUrl: "https://github.com/TonyW-Y/AIFlix",
      featured: true
    },
    {
      title: "Task Management App",
      description: "A collaborative project management tool with real-time updates, drag-and-drop functionality, and team collaboration features.",
      technologies: ["Next.js", "TypeScript", "Prisma", "WebSocket"],
      liveUrl: "https://example-tasks.com",
      githubUrl: "https://github.com/alexjohnson/task-manager",
      featured: true
    },
    {
      title: "AI Content Generator",
      description: "An intelligent content creation platform that uses machine learning to generate high-quality articles and social media posts.",
      technologies: ["Python", "FastAPI", "OpenAI", "React", "Redis"],
      liveUrl: "https://example-ai-content.com",
      githubUrl: "https://github.com/alexjohnson/ai-content-generator",
      featured: false
    },
    {
      title: "Weather Dashboard",
      description: "A beautiful weather application with location-based forecasts, interactive maps, and personalized weather alerts.",
      technologies: ["Vue.js", "Express.js", "MongoDB", "Weather API"],
      liveUrl: "https://example-weather.com",
      githubUrl: "https://github.com/alexjohnson/weather-dashboard",
      featured: false
    },
    {
      title: "Blockchain Wallet",
      description: "A secure cryptocurrency wallet with multi-currency support, transaction history, and portfolio tracking features.",
      technologies: ["React Native", "Web3.js", "Solidity", "Node.js"],
      liveUrl: "https://example-wallet.com",
      githubUrl: "https://github.com/alexjohnson/crypto-wallet",
      featured: false
    },
    {
      title: "Social Media Analytics",
      description: "A comprehensive analytics platform for social media managers with real-time insights, reporting, and competitor analysis.",
      technologies: ["Angular", "NestJS", "PostgreSQL", "Chart.js"],
      liveUrl: "https://example-analytics.com",
      githubUrl: "https://github.com/alexjohnson/social-analytics",
      featured: false
    }
  ];

  const scrollToContact = () => {
    // This would scroll to a contact section if it existed
    console.log('Scroll to contact section');
  };

  return (
    <section id="projects" className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-6 text-gradient animate-text-reveal">
              Featured Projects
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-in-left">
              A showcase of my recent work and the technologies I'm passionate about
            </p>
          </div>

          {/* Featured Projects */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold mb-8 text-foreground">Highlighted Work</h3>
            <div className="grid lg:grid-cols-2 gap-8">
              {projects.filter(project => project.featured).map((project, index) => (
                <Card 
                  key={project.title}
                  className="glass-card p-8 hover-lift animate-scale-in group"
                  style={{animationDelay: `${index * 0.2}s`}}
                >
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-2xl font-bold mb-3 text-foreground group-hover:text-gradient transition-colors">
                        {project.title}
                      </h4>
                      <p className="text-muted-foreground leading-relaxed text-base">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map(tech => (
                        <Badge 
                          key={tech} 
                          variant="secondary"
                          className="bg-primary/20 text-primary border-primary/30"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-4 pt-4">
                      <Button 
                        className="glow-effect hover-lift flex items-center gap-2"
                        onClick={() => window.open(project.liveUrl, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </Button>
                      <Button 
                        variant="outline"
                        className="border-primary/30 text-primary hover:bg-primary/10 flex items-center gap-2"
                        onClick={() => window.open(project.githubUrl, '_blank')}
                      >
                        <Github className="w-4 h-4" />
                        Code
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* All Projects Grid */}
          <div>
            <h3 className="text-2xl font-semibold mb-8 text-foreground">More Projects</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.filter(project => !project.featured).map((project, index) => (
                <Card 
                  key={project.title}
                  className="glass-card p-6 hover-lift animate-scale-in group"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-foreground group-hover:text-gradient transition-colors">
                      {project.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 3).map(tech => (
                        <Badge 
                          key={tech} 
                          variant="secondary"
                          className="text-xs bg-primary/20 text-primary border-primary/30"
                        >
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge variant="secondary" className="text-xs bg-muted text-muted-foreground">
                          +{project.technologies.length - 3}
                        </Badge>
                      )}
                    </div>

                    <div className="flex gap-3 pt-2">
                      <Button 
                        size="sm"
                        className="flex-1 text-xs"
                        onClick={() => window.open(project.liveUrl, '_blank')}
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Demo
                      </Button>
                      <Button 
                        size="sm"
                        variant="outline"
                        className="flex-1 text-xs border-primary/30 text-primary hover:bg-primary/10"
                        onClick={() => window.open(project.githubUrl, '_blank')}
                      >
                        <Github className="w-3 h-3 mr-1" />
                        Code
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-20 animate-slide-in-left">
            <div className="glass-card p-12 max-w-2xl mx-auto">
              <h3 className="text-3xl font-bold mb-4 text-gradient">
                Let's Build Something Amazing Together
              </h3>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Have an exciting project in mind? I'd love to hear about it and explore how we can bring your vision to life.
              </p>
              <Button 
                size="lg"
                className="glow-effect hover-lift px-8 py-4 text-lg font-semibold"
                onClick={scrollToContact}
              >
                Get In Touch
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};