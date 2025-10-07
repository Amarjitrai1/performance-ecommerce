import { useState, useEffect, useRef } from 'react';

interface PerformanceMetrics {
  renderTime: number;
  renderCount: number;
  memoryUsage?: number;
  lastUpdate: number;
}

export const usePerformanceMonitor = (trackingKey?: string) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    renderTime: 0,
    renderCount: 0,
    lastUpdate: Date.now()
  });

  const renderStartTime = useRef(0);
  const renderCount = useRef(0);
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Only track meaningful renders (skip the constant re-renders)
    if (isFirstRender.current) {
      renderStartTime.current = performance.now();
      isFirstRender.current = false;
    }

    renderCount.current += 1;

    // Throttle updates to every 100 renders to avoid constant changes
    if (renderCount.current % 100 === 0 || renderCount.current === 1) {
      const updateMetrics = () => {
        const renderTime = performance.now() - renderStartTime.current;
        const memoryUsage = (performance as any).memory?.usedJSHeapSize;

        setMetrics({
          renderTime: Math.round(renderTime * 100) / 100,
          renderCount: renderCount.current,
          memoryUsage,
          lastUpdate: Date.now()
        });
      };

      requestAnimationFrame(updateMetrics);
    }
  });

  return metrics;
};