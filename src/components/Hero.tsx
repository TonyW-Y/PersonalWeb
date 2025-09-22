import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export const Hero = () => {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="animate-float absolute top-20 left-10 w-32 h-32 rounded-full bg-primary/10 blur-xl"></div>
        <div className="animate-float absolute top-40 right-20 w-24 h-24 rounded-full bg-accent/10 blur-lg" style={{animationDelay: '2s'}}></div>
        <div className="animate-float absolute bottom-32 left-1/4 w-40 h-40 rounded-full bg-primary/5 blur-2xl" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Title with Animation */}
          <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-text-reveal">
            <span className="text-gradient">Tony Wang</span>
          </h1>
          
          {/* Subtitle */}
          <div className="h-16 mb-8 flex items-center justify-center">
            <p className="text-2xl md:text-3xl text-muted-foreground typing-effect">
              Software Engineering Student · Full-Stack Developer
            </p>
          </div>
          
          {/* Description */}
          <p 
            className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed animate-slide-in-left" 
            style={{animationDelay: '1s'}}
          >
            I build interactive, scalable applications that connect clean design with performance. 
            From AI-powered feedback tools to map-based study apps, my projects merge creativity, 
            problem-solving, and real-world impact.
          </p>
          
          {/* CTA Buttons */}
          <div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-slide-in-right" 
            style={{animationDelay: '1.5s'}}
          >
            <Button 
              size="lg" 
              className="glow-effect hover-lift px-8 py-4 text-lg font-semibold"
              onClick={scrollToAbout}
            >
              View My Work
            </Button>
            <a 
              href="/TonyWangResume.pdf" // 🔗 replace with actual resume file path
              download 
            >
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 py-4 text-lg font-semibold border-primary/30 text-primary hover:bg-primary/10"
              >
                Download Resume
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button 
          onClick={scrollToAbout}
          className="p-2 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 hover:bg-primary/30 transition-colors"
        >
          <ChevronDown className="w-6 h-6 text-primary" />
        </button>
      </div>
    </section>
  );
};
