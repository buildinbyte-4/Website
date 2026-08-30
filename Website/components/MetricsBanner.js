'use client';

import { useState, useEffect, useRef } from 'react';
import { METRICS } from '@/lib/data';

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

  const parseMetric = (val) => {
    const match = String(val).match(/^(\d+)(.*)$/);
    return {
      num: match ? parseInt(match[1], 10) : 0,
      suffix: match ? match[2] : '',
    };
  };

  return (
    <section ref={sectionRef} className="py-12 bg-surface dark:bg-surface border border-outline/20">
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {METRICS.map((metric, idx) => {
            const { num, suffix } = parseMetric(metric.value);
            return (
              <div
                key={idx}
                className="glass-panel rounded-xl p-6 flex flex-col justify-between group hover:border-primary/50 transition-colors duration-300"
              >
                <div>
                  <span className="font-label-caps text-label-caps text-on-surface-variant uppercase bg-primary/10 px-2 py-1 mb-4 inline-block rounded border border-primary/20">
                    {metric.label}
                  </span>

                  <span className="font-display font-black text-5xl sm:text-6xl text-on-surface block mb-2 mt-2 leading-none">
                    <StatCounter targetValue={num} suffix={suffix} hasIntersected={hasIntersected} />
                  </span>
                </div>

                {/* Draw in underline from left-to-right */}
                <div
                  className="h-1 bg-primary/20 dark:bg-primary/20 mt-4 origin-left"
                  style={{
                    transform: hasIntersected ? 'scaleX(1)' : 'scaleX(0)',
                    transition: 'transform 800ms linear',
                  }}
                />

                <span className="text-xs text-on-surface-variant font-bold uppercase mt-4 block pt-2">
                  {metric.sub}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}