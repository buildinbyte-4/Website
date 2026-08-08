'use client';

import { useState, useEffect, useRef } from 'react';
import { useStats } from '@/hooks/useStats';

function StatCounter({ targetValue, duration = 800, hasIntersected, suffix = '' }) {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    if (!hasIntersected) return;
    
    let start = 0;
    const end = parseInt(targetValue, 10) || 0;
    if (start === end) {
      setCurrentValue(end);
      return;
    }

    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Linear count up: progress * end
      const current = Math.floor(progress * end);
      setCurrentValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCurrentValue(end);
      }
    };

    requestAnimationFrame(animate);
  }, [hasIntersected, targetValue, duration]);

  return <>{currentValue}{suffix}</>;
}

export default function MetricsBanner() {
  const { stats, loading, error } = useStats();
  const [hasIntersected, setHasIntersected] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setHasIntersected(true);
        observer.disconnect();
      }
    }, { threshold: 0.1 });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const metrics = [
    {
      label: "Projects",
      value: `${stats?.projects_completed ?? 0}+`,
      sub: "Delivered Across Core Engagements",
    },
    {
      label: "Clients",
      value: `${stats?.clients_served ?? 0}+`,
      sub: "From Startups to Enterprises",
    },
    {
      label: "Industries",
      value: `${stats?.industries_served ?? 0}+`,
      sub: "Across Business and Technology Operations",
    },
    {
      label: "Success Rate",
      value: `${stats?.success_rate ?? 0}%`,
      sub: "Built for Reliability and Growth",
    },
  ];

  const parseMetric = (val) => {
    const match = String(val).match(/^(\d+)(.*)$/);
    return {
      num: match ? parseInt(match[1], 10) : 0,
      suffix: match ? match[2] : '',
    };
  };

  return (
    <section ref={sectionRef} className="py-12 bg-brutal-bg border-b-4 border-brutal-black">
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {metrics.map((metric, idx) => {
            const { num, suffix } = parseMetric(metric.value);
            return (
              <div
                key={idx}
                className="editorial-card p-6 bg-white flex flex-col justify-between"
              >
                <div>
                  <span className="font-display text-[10px] font-black uppercase tracking-widest text-white bg-brutal-black px-2 py-1 mb-4 inline-block shadow-brutal-sm">
                    {metric.label}
                  </span>

                  <span className="font-display font-black text-5xl sm:text-6xl text-brutal-black block mb-2 mt-2 leading-none">
                    {loading ? "..." : (
                      <StatCounter targetValue={num} suffix={suffix} hasIntersected={hasIntersected} />
                    )}
                  </span>
                </div>

                {/* Draw in underline from left-to-right */}
                <div 
                  className="h-1 bg-brutal-black dark:bg-white mt-4 origin-left"
                  style={{
                    transform: hasIntersected ? 'scaleX(1)' : 'scaleX(0)',
                    transition: 'transform 800ms linear',
                  }}
                />

                <span className="text-xs text-brutal-black font-bold uppercase mt-4 block pt-2">
                  {metric.sub}
                </span>
              </div>
            );
          })}
        </div>

        {error && (
          <p className="mt-4 text-center text-sm text-red-600">
            Failed to load company statistics.
          </p>
        )}
      </div>
    </section>
  );
}