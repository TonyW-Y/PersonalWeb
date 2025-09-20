import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code2, Palette, Rocket, Zap } from "lucide-react";
import profileImage from "@/assets/profile-image.jpg";
import { PrismBackground } from "./PrismBackground";
import "./About.css"; // import the animations

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

  const getRandomDelay = (index: number) => {
    const baseDelay = index * 0.08;
    const randomOffset = (Math.random() * 0.1) - 0.05;
    return (baseDelay + randomOffset).toFixed(2);
  };

  const getSkillIcon = (iconName: string) => {
    const baseUrl = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";
    const icons: Record<string, string> = {
      html5: `${baseUrl}/html5/html5-original.svg`,
      css3: `${baseUrl}/css3/css3-original.svg`,
      javascript: `${baseUrl}/javascript/javascript-original.svg`,
      typescript: `${baseUrl}/typescript/typescript-original.svg`,
      java: `${baseUrl}/java/java-original.svg`,
      python: `${baseUrl}/python/python-original.svg`,
      c: `${baseUrl}/c/c-original.svg`,
      nodejs: `${baseUrl}/nodejs/nodejs-original.svg`,
      react: `${baseUrl}/react/react-original.svg`,
      fastapi: `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg`,
      flask: `${baseUrl}/flask/flask-original.svg`,
      mongodb: `${baseUrl}/mongodb/mongodb-original.svg`,
      git: `${baseUrl}/git/git-original.svg`,
      github: `${baseUrl}/github/github-original.svg`,
      vscode: `${baseUrl}/vscode/vscode-original.svg`,
      intellij: `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/intellij/intellij-original.svg`
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
              Full-stack software engineering student with hands-on experience building interactive applications, APIs, and AI-powered tools.
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
                  Building and Learning Through Projects
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  I'm a Software Engineering student at Western University passionate about
                  creating scalable applications that blend clean code, performance, and 
                  great user experiences. I’ve built projects ranging from <b>StudyFinder</b>, 
                  a React and Supabase web app for rating study spots, to <b>VerbAI</b>, an 
                  AI-powered speech feedback platform using AssemblyAI and Firebase.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Alongside personal projects like a custom chess engine in Python and a 
                  dynamic movie platform, I’ve also taught coding workshops for 30+ students 
                  at Burlington Public Library, fostering curiosity in programming. 
                  My goal is to continue building innovative tools while expanding my 
                  expertise in full-stack development, AI, and software design.
                </p>
              </div>

              {/* Skills Grid */}
              <div className="relative">
                <h4 className="text-xl font-semibold mb-6 text-foreground">Technical Skills</h4>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 relative z-10">
                  {skills.map((skill, index) => {
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
                          ['--rotateX' as any]: '0deg',
                          ['--rotateY' as any]: '0deg',
                          ['--glow-opacity' as any]: '0',
                          ['--glow-scale' as any]: '1',
                          ['--glow-translate' as any]: '0',
                        }}
                      >
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        <div className="w-12 h-12 mb-3 flex items-center justify-center transform transition-transform duration-500 group-hover:scale-110">
                          <img 
                            src={getSkillIcon(skill.icon)}
                            alt={skill.name}
                            className="w-full h-full object-contain drop-shadow-lg"
                          />
                        </div>
                        
                        <span className="text-sm font-medium text-center text-foreground/90 group-hover:text-primary transition-colors duration-300 font-mono">
                          {skill.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
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
