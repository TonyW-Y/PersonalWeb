import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code2, Palette, Rocket, Zap } from "lucide-react";
import profileImage from "@/assets/profile-image.jpg";

export const About = () => {
  const skills = [
    { name: "React", level: 90 },
    { name: "TypeScript", level: 85 },
    { name: "Node.js", level: 80 },
    { name: "Python", level: 75 },
    { name: "PostgreSQL", level: 70 },
    { name: "Docker", level: 65 },
  ];

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
            <div className="relative animate-scale-in">
              <div className="glow-effect rounded-2xl overflow-hidden">
                <img 
                  src={profileImage} 
                  alt="Alex Johnson - Full Stack Developer" 
                  className="w-full h-96 object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent rounded-2xl"></div>
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

              {/* Skills Progress Bars */}
              <div>
                <h4 className="text-xl font-semibold mb-6 text-foreground">Technical Skills</h4>
                <div className="space-y-4">
                  {skills.map((skill, index) => (
                    <div key={skill.name} className="animate-slide-in-left" style={{animationDelay: `${index * 0.1}s`}}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-foreground">{skill.name}</span>
                        <span className="text-sm text-muted-foreground">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000 ease-out"
                          style={{width: `${skill.level}%`}}
                        ></div>
                      </div>
                    </div>
                  ))}
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