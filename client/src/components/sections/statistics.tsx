import { useEffect, useRef, useState } from "react";
import { stats } from "@/lib/data";

export function StatisticsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const AnimatedCounter = ({ targetValue, suffix }: { targetValue: string; suffix: string }) => {
    const [count, setCount] = useState(0);
    const numericValue = parseInt(targetValue.replace(/\D/g, ''));

    useEffect(() => {
      if (!isVisible) return;
      
      let start = 0;
      const increment = numericValue / 50;
      const timer = setInterval(() => {
        start += increment;
        if (start >= numericValue) {
          setCount(numericValue);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 40);

      return () => clearInterval(timer);
    }, [isVisible, numericValue]);

    const formatValue = () => {
      if (targetValue.includes('$')) {
        return `$${count}`;
      }
      return count.toString();
    };

    return (
      <div className="text-4xl font-bold text-primary mb-2 animate-counter">
        {formatValue()}{suffix}
      </div>
    );
  };

  return (
    <section ref={sectionRef} className="py-16 bg-background" id="statistics">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4" data-testid="text-stats-title">
            Stats Don't Lie!
          </h2>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center" data-testid={`stat-item-${index}`}>
              <AnimatedCounter targetValue={stat.value} suffix={stat.suffix} />
              <div className="text-muted-foreground" data-testid={`stat-label-${index}`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
