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
    <section ref={sectionRef} className="border-b border-slate-200 bg-white py-12 dark:border-white/10 dark:bg-transparent">
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {metrics.map((metric, idx) => {
            const { num, suffix } = parseMetric(metric.value);
            return (
              <div
                key={idx}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50/70 p-6 dark:border-white/10 dark:bg-white/[0.03]"
              >
                <div>
                  <span className="mb-4 inline-block text-sm font-medium text-slate-500 dark:text-zinc-400">
                    {metric.label}
                  </span>

                  <span className="mb-2 mt-2 block font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                    {loading ? "..." : (
                      <StatCounter targetValue={num} suffix={suffix} hasIntersected={hasIntersected} />
                    )}
                  </span>
                </div>

                <span className="mt-4 block border-t border-slate-200 pt-4 text-sm leading-6 text-slate-600 dark:border-white/10 dark:text-zinc-400">
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
