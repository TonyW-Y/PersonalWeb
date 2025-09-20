import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";
import { HackingAnimation } from "./HackingAnimation";
import { HackingSuccessAnimation } from "./HackingSuccessAnimation";

export const Projects = () => {
  const [showHackingAnimation, setShowHackingAnimation] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [currentProject, setCurrentProject] = useState<{title: string; githubUrl: string} | null>(null);

  const handleCodeClick = (project: { title: string; githubUrl: string }) => {
    if (project.title === 'Chess Engine') {
      setCurrentProject(project);
      setShowSuccessAnimation(true);
    } else {
      setCurrentProject(project);
      setShowHackingAnimation(true);
    }
  };

  const handleHackingComplete = () => {
    setShowHackingAnimation(false);
    setCurrentProject(null);
  };

  const handleSuccessComplete = () => {
    setShowSuccessAnimation(false);
    setCurrentProject(null);
  };
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
      title: "StudyFinder",
      description: "A full-stack web app to discover and review study-friendly locations such as cafes, libraries, and coworking spaces. Integrated Mapbox and OpenStreetMap for location discovery, with Supabase providing authentication and real-time database storage for user reviews.",
      technologies: ["TypeScript", "React", "Tailwind CSS", "Supabase", "Mapbox"],
      liveUrl: "https://github.com/coffeefuelbump/studyfinder", // 🔗 replace with deployed URL if available
      githubUrl: "https://github.com/coffeefuelbump/studyfinder",
      featured: true
    },
    {
      title: "VerbAI – AI Speech Feedback Tool",
      description: "A real-time speech analysis platform that helps users practice and improve presentations. Uses AssemblyAI to analyze audio, track filler words, and detect pacing issues. Built with Firebase for authentication and storage, plus interactive frontend visualizations in React.",
      technologies: ["React", "Node.js", "Firebase", "AssemblyAI"],
      liveUrl: "https://verbai-f0cba.web.app/", // 🔗 replace with deployed link if any
      githubUrl: "https://github.com/coffeefuelbump/verbai",
      featured: false
    },
    {
      title: "Chess Engine",
      description: "A fully functional chess engine built with Python using OOP and algorithmic principles. Implements move generation, legality checking, check detection, undo/redo functionality, and turn management. Includes unit tests with Pytest for core modules to ensure correctness.",
      technologies: ["Python", "NumPy", "Pytest"],
      liveUrl: "https://github.com/coffeefuelbump/chess-engine", // 🔗 replace with demo if you deploy visualization
      githubUrl: "https://github.com/coffeefuelbump/chess-engine",
      featured: false
    }
  ];

  const scrollToContact = () => {
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
              A showcase of my work and the technologies I'm passionate about
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
                        id={`code-btn-${project.title.replace(/\s+/g, '-').toLowerCase()}`}
                        variant="outline"
                        className="border-primary/30 text-primary hover:bg-primary/10 flex items-center gap-2 transition-all duration-300"
                        onClick={() => handleCodeClick(project)}
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
                        id={`code-btn-${project.title.replace(/\s+/g, '-').toLowerCase()}`}
                        size="sm"
                        variant="outline"
                        className="flex-1 text-xs border-primary/30 text-primary hover:bg-primary/10 transition-all duration-300"
                        onClick={() => handleCodeClick(project)}
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
      {showHackingAnimation && currentProject && (
        <HackingAnimation 
          isVisible={showHackingAnimation}
          onComplete={handleHackingComplete}
        />
      )}
      {showSuccessAnimation && currentProject && (
        <HackingSuccessAnimation 
          isVisible={showSuccessAnimation}
          onComplete={handleSuccessComplete}
          projectUrl={currentProject.githubUrl}
        />
      )}
    </section>
  );
};
