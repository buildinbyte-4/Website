'use client';

import { useState, useEffect, useRef } from 'react';
import { useStats } from '@/hooks/useStats';

function StatCounter({ targetValue, duration = 1000, hasIntersected, suffix = '' }) {
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
  const { stats } = useStats();
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
      label: "Solutions Delivered",
      value: `${stats?.projects_completed ?? 150}+`,
      sub: "End-to-End Software & Hardware",
    },
    {
      label: "Enterprise Clients",
      value: `${stats?.clients_served ?? 45}+`,
      sub: "Startups & Industrial Partners",
    },
    {
      label: "Industries Served",
      value: `${stats?.industries_served ?? 12}+`,
      sub: "Healthcare, Manufacturing & IoT",
    },
    {
      label: "Uptime & CSAT",
      value: `${stats?.success_rate ?? 99}%`,
      sub: "Reliability & High CSAT",
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
    <section ref={sectionRef} className="py-16 bg-[#0b1326] border-y border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, idx) => {
            const { num, suffix } = parseMetric(metric.value);
            return (
              <div
                key={idx}
                className="glass-card p-6 rounded-2xl border border-white/10 hover:border-[#06b6d4]/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-mono text-[#06b6d4] uppercase tracking-wider mb-2 flex items-center justify-between">
                    <span>// STAT_{idx + 1}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#06b6d4]"></span>
                  </div>
                  <div className="font-display font-black text-4xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-[#4cd7f6] via-[#06b6d4] to-[#c4abff] tracking-tight">
                    <StatCounter
                      targetValue={num}
                      suffix={suffix}
                      hasIntersected={hasIntersected}
                    />
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/5">
                  <h4 className="font-display font-semibold text-sm text-[#dae2fd]">
                    {metric.label}
                  </h4>
                  <p className="text-xs text-[#869397] font-mono mt-1">
                    {metric.sub}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}