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
      label: "Solutions delivered",
      value: `${stats?.projects_completed ?? 150}+`,
      sub: "End-to-end software & hardware",
    },
    {
      label: "Enterprise clients",
      value: `${stats?.clients_served ?? 45}+`,
      sub: "Startups & industrial partners",
    },
    {
      label: "Industries served",
      value: `${stats?.industries_served ?? 12}+`,
      sub: "Healthcare, manufacturing & IoT",
    },
    {
      label: "Uptime & CSAT",
      value: `${stats?.success_rate ?? 99}%`,
      sub: "Reliability & high CSAT",
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
    <section ref={sectionRef} className="py-16 bg-canvas border-y border-line">
      <div className="page-wrap">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-line">
          {metrics.map((metric, idx) => {
            const { num, suffix } = parseMetric(metric.value);
            return (
              <div
                key={idx}
                className="bg-canvas px-0 sm:px-8 py-8 first:pl-0 last:pr-0"
              >
                <div className="font-display font-semibold text-4xl sm:text-5xl text-ink tracking-tight">
                  <StatCounter
                    targetValue={num}
                    suffix={suffix}
                    hasIntersected={hasIntersected}
                  />
                </div>
                <h4 className="font-display font-medium text-sm text-ink mt-4">
                  {metric.label}
                </h4>
                <p className="text-sm text-muted mt-1">
                  {metric.sub}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
