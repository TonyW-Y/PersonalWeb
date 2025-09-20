import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code2, Palette, Rocket, Zap } from "lucide-react";
import profileImage from "@/assets/profile-image.jpg";
import { PrismBackground } from "./PrismBackground";

export const About = () => {
  const skills = [
    { name: "HTML", icon: "html5" },
    { name: "CSS", icon: "css3" },
    { name: "JavaScript", icon: "javascript" },
    { name: "TypeScript", icon: "typescript" },
    { name: "Java", icon: "java" },
    { name: "Python", icon: "python" },
    { name: "C", icon: "c" },
    { name: "Node.js", icon: "nodejs" },
    { name: "React", icon: "react" },
    { name: "FastAPI", icon: "fastapi" },
    { name: "Flask", icon: "flask" },
    { name: "MongoDB", icon: "mongodb" },
    { name: "Git", icon: "git" },
    { name: "VS Code", icon: "vscode" },
    { name: "IntelliJ", icon: "intellij" },
    { name: "GitHub", icon: "github" }
  ];

  // Function to generate a random delay for animations
  const getRandomDelay = (index: number) => {
    const baseDelay = index * 0.08;
    const randomOffset = (Math.random() * 0.1) - 0.05; // -0.05 to 0.05
    return (baseDelay + randomOffset).toFixed(2);
  };
  
  // Function to generate a random rotation for the 3D effect
  const getRandomRotation = () => {
    return (Math.random() * 10) - 5; // -5 to 5 degrees
  };

  const getSkillIcon = (iconName: string) => {
    const baseUrl = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";
    const icons: Record<string, string> = {
      // Languages
      html5: `${baseUrl}/html5/html5-original.svg`,
      css3: `${baseUrl}/css3/css3-original.svg`,
      javascript: `${baseUrl}/javascript/javascript-original.svg`,
      typescript: `${baseUrl}/typescript/typescript-original.svg`,
      java: `${baseUrl}/java/java-original.svg`,
      python: `${baseUrl}/python/python-original.svg`,
      c: `${baseUrl}/c/c-original.svg`,
      
      // Frameworks & Libraries
      nodejs: `${baseUrl}/nodejs/nodejs-original.svg`,
      react: `${baseUrl}/react/react-original.svg`,
      fastapi: `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg`,
      flask: `${baseUrl}/flask/flask-original.svg`,
      
      // Databases
      mongodb: `${baseUrl}/mongodb/mongodb-original.svg`,
      
      // Tools
      git: `${baseUrl}/git/git-original.svg`,
      github: `${baseUrl}/github/github-original.svg`,
      vscode: `${baseUrl}/vscode/vscode-original.svg`,
      intellij: `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/intellij/intellij-original.svg`,
      postman: `https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg`,
      
      // Cloud
      server: `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg`
    };
    return icons[iconName] || `${baseUrl}/${iconName}/${iconName}-original.svg`;
  };

  const features = [
    {
      icon: Code2,
      title: "Clean Code",
      description: "Writing maintainable, scalable code that stands the test of time"
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Creating beautiful, intuitive interfaces that users love"
    },
    {
      icon: Rocket,
      title: "Performance",
      description: "Optimizing applications for speed and efficiency"
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Always exploring new technologies and creative solutions"
    }
  ];

  return (
    <section id="about" className="py-32 relative">
      <PrismBackground />
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-6 text-gradient animate-text-reveal">
              About Me
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-in-left">
              Passionate developer with 5+ years of experience building digital solutions
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            {/* Profile Image */}
            <div className="relative group animate-scale-in h-[32rem]">
              <div className="relative z-10 overflow-hidden rounded-2xl shadow-2xl transition-all duration-500 ease-in-out transform group-hover:scale-105 group-hover:shadow-primary/20 group-hover:shadow-2xl h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 rounded-2xl"></div>
                <div className="absolute inset-0.5 bg-background/5 backdrop-blur-sm rounded-xl"></div>
                <img 
                  src={profileImage} 
                  alt="Tony Wang - Full Stack Developer" 
                  className="relative z-10 w-full h-full object-cover object-top rounded-2xl transition-all duration-500 ease-in-out transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent rounded-2xl"></div>
              </div>
              <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 ease-in-out"></div>
            </div>

            {/* Bio Content */}
            <div className="space-y-8 animate-slide-in-right">
              <div>
                <h3 className="text-3xl font-bold mb-4 text-gradient">
                  Crafting Digital Experiences
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  I'm a full-stack developer who thrives on turning complex problems into 
                  elegant solutions. With expertise spanning modern web technologies, 
                  I specialize in building scalable applications that deliver exceptional user experiences.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  When I'm not coding, you'll find me exploring new technologies, 
                  contributing to open source projects, or sharing knowledge with the developer community.
                </p>
              </div>

              {/* Skills Grid with Crazy Effects */}
              <div className="relative">
                <h4 className="text-xl font-semibold mb-6 text-foreground">Technical Skills</h4>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 relative z-10">
                  {skills.map((skill, index) => {
                    const rotation = getRandomRotation();
                    const delay = getRandomDelay(index);
                    
                    return (
                      <div 
                        key={skill.name}
                        className="group relative flex flex-col items-center p-4 rounded-xl bg-background/50 border border-border/30 
                          hover:bg-gradient-to-br from-primary/5 to-accent/5 
                          transition-all duration-500 ease-out hover:duration-300
                          hover:shadow-[0_10px_30px_-5px_rgba(99,102,241,0.15)]"
                        style={{
                          animation: `float 6s ease-in-out ${delay}s infinite, fadeInUp 0.6s ease-out ${delay}s forwards`,
                          opacity: 0,
                          transform: 'translateY(20px)',
                          transformStyle: 'preserve-3d',
                          perspective: '1000px',
                          '--rotateX': '0deg',
                          '--rotateY': '0deg',
                          '--glow-opacity': '0',
                          '--glow-scale': '1',
                          '--glow-translate': '0',
                        } as React.CSSProperties}
                        onMouseMove={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          const x = e.clientX - rect.left;
                          const y = e.clientY - rect.top;
                          const centerX = rect.width / 2;
                          const centerY = rect.height / 2;
                          const rotateY = ((x - centerX) / 20).toFixed(2);
                          const rotateX = ((centerY - y) / 20).toFixed(2);
                          
                          e.currentTarget.style.setProperty('--rotateX', `${rotateX}deg`);
                          e.currentTarget.style.setProperty('--rotateY', `${rotateY}deg`);
                          e.currentTarget.style.setProperty('--glow-opacity', '0.3');
                          e.currentTarget.style.setProperty('--glow-scale', '1.05');
                          e.currentTarget.style.setProperty('--glow-translate', '-2px');
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.setProperty('--rotateX', '0deg');
                          e.currentTarget.style.setProperty('--rotateY', '0deg');
                          e.currentTarget.style.setProperty('--glow-opacity', '0');
                          e.currentTarget.style.setProperty('--glow-scale', '1');
                          e.currentTarget.style.setProperty('--glow-translate', '0');
                        }}
                      >
                        {/* Glow effect */}
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                             style={{
                               opacity: 'var(--glow-opacity, 0)',
                               transform: 'scale(var(--glow-scale, 1))',
                               filter: 'blur(12px)',
                               zIndex: -1,
                             }}
                        />
                        
                        {/* Main content */}
                        <div className="w-12 h-12 mb-3 flex items-center justify-center transform transition-transform duration-500 group-hover:scale-110">
                          <img 
                            src={skill.icon === 'github' ? 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' : 
                                 skill.icon === 'flask' ? 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg' : 
                                 getSkillIcon(skill.icon)}
                            alt={skill.name}
                            className="w-full h-full object-contain drop-shadow-lg"
                            style={{
                              filter: skill.icon === 'github' || skill.icon === 'flask'
                                ? 'drop-shadow(0 4px 6px rgba(99, 102, 241, 0.3)) invert(1)' 
                                : 'drop-shadow(0 4px 6px rgba(99, 102, 241, 0.3))',
                              transform: 'translateZ(20px)',
                              transition: 'all 0.3s ease-out'
                            }}
                          />
                        </div>
                        
                        <span className="text-sm font-medium text-center text-foreground/90 group-hover:text-primary transition-colors duration-300 font-mono">
                          {skill.name}
                        </span>
                        
                        {/* Animated border */}
                        <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-primary/20 transition-all duration-500 pointer-events-none"
                             style={{
                               background: 'linear-gradient(45deg, transparent 45%, rgba(99, 102, 241, 0.1) 48%, rgba(99, 102, 241, 0.1) 52%, transparent 55%)',
                               backgroundSize: '250% 250%',
                               backgroundPosition: '0% 0%',
                               animation: 'borderShine 3s infinite linear',
                             }}
                        />
                      </div>
                    );
                  })}
                </div>
                
                {/* Background particles */}
                <div className="absolute inset-0 -z-10 overflow-hidden opacity-20">
                  {[...Array(20)].map((_, i) => (
                    <div 
                      key={i}
                      className="absolute rounded-full bg-primary"
                      style={{
                        width: `${Math.random() * 6 + 2}px`,
                        height: `${Math.random() * 6 + 2}px`,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animation: `float ${Math.random() * 10 + 10}s linear ${Math.random() * 10}s infinite`,
                        opacity: Math.random() * 0.5 + 0.1,
                      }}
                    />
                  ))}
                </div>
                
                {/* CSS Animations */}
                <style jsx global>{`
                  @keyframes fadeInUp {
                    to {
                      opacity: 1;
                      transform: translateY(0);
                    }
                  }
                  
                  @keyframes float {
                    0%, 100% {
                      transform: translateY(0) rotateX(var(--rotateX, 0)) rotateY(var(--rotateY, 0));
                    }
                    50% {
                      transform: translateY(-10px) rotateX(calc(var(--rotateX, 0) * 0.8)) rotateY(calc(var(--rotateY, 0) * 0.8));
                    }
                  }
                  
                  @keyframes borderShine {
                    0% {
                      background-position: 0% 0%;
                    }
                    100% {
                      background-position: 200% 200%;
                    }
                  }
                  
                  /* Add 3D effect on hover */
                  .group:hover {
                    transform: 
                      translateY(calc(-1 * var(--glow-translate, 0px)))
                      rotateX(var(--rotateX, 0))
                      rotateY(var(--rotateY, 0))
                      translateZ(10px);
                    box-shadow: 0 20px 40px -10px rgba(99, 102, 241, 0.2);
                  }
                `}</style>
                <style dangerouslySetInnerHTML={{
                  __html: `
                    @keyframes fadeInUp {
                      to {
                        opacity: 1;
                        transform: translateY(0);
                      }
                    }
                  `
                }} />
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card 
                  key={feature.title}
                  className="glass-card p-6 hover-lift animate-scale-in"
                  style={{animationDelay: `${index * 0.2}s`}}
                >
                  <div className="glow-effect w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};