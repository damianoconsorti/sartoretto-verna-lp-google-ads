import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

interface DotCardProps {
  target?: number;
  duration?: number;
  unit?: string;
  label?: string;
  description?: string;
  delayMs?: number;
}

export default function DotCard({
  target = 0,
  duration = 1800,
  unit = '',
  label = '',
  description = '',
  delayMs = 0,
}: DotCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let timerId: ReturnType<typeof setInterval> | null = null;

    const timeout = setTimeout(() => {
      let start = 0;
      const end = target;
      if (end <= 0) {
        setCount(end);
        return;
      }
      const increment = Math.ceil(end / (duration / 50));
      timerId = setInterval(() => {
        start += increment;
        if (start >= end) {
          start = end;
          clearInterval(timerId!);
          timerId = null;
        }
        setCount(start);
      }, 50);
    }, delayMs);

    return () => {
      clearTimeout(timeout);
      if (timerId) clearInterval(timerId);
    };
  }, [isInView, target, duration, delayMs]);

  const display = count < 1000 ? count : `${Math.floor(count / 1000)}k`;

  return (
    <div ref={ref} className="sv-outer">
      <div className="sv-dot" />
      <div className="sv-card">
        <div className="sv-ray" />
        <div className="sv-value">
          {display}
          {unit && <span className="sv-unit">{unit}</span>}
        </div>
        <div className="sv-label">{label}</div>
        {description && <div className="sv-desc">{description}</div>}
        <div className="sv-line sv-topl" />
        <div className="sv-line sv-leftl" />
        <div className="sv-line sv-bottoml" />
        <div className="sv-line sv-rightl" />
      </div>
    </div>
  );
}
