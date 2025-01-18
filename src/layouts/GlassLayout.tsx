import { useState, useEffect, useCallback, ReactNode, useRef } from 'react';
import { getUUID } from '@/utils/getUUID';

type Props = {
  children: ReactNode;
  settings?: Partial<Settings>;
};

type Settings = {
  color: string;
  minSize: number;
  numberCirclesInDirections: number;
  spacing: number;
  maxCircles: number;
};

const defaultSettings: Settings = {
  color: 'rgb(229, 229, 229, 0.5)',
  minSize: 5,
  numberCirclesInDirections: 5,
  spacing: 1,
  maxCircles: 1000,
};

type Circle = {
  id: string;
  x: number;
  y: number;
  size: number;
};

type PageSize = {
  width: number;
  height: number;
};

export const ShapeWrapper = ({ children, settings }: Props) => {
  const [circles, setCircles] = useState<Circle[]>([]);
  const pageSize = useRef<PageSize>({
    width: typeof window !== 'undefined' ? window.innerWidth : 1000,
    height: typeof window !== 'undefined' ? window.innerHeight : 1000,
  });
  const currentInterval = useRef<NodeJS.Timeout | null>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const CONFIG = { ...defaultSettings, ...settings };

  const generateRandomSize = useCallback(() => {
    const maxSize = Math.min(
      window.innerWidth / CONFIG.numberCirclesInDirections,
      window.innerHeight / CONFIG.numberCirclesInDirections
    );
    return Math.floor(Math.random() * (maxSize - CONFIG.minSize) + CONFIG.minSize);
  }, [CONFIG.numberCirclesInDirections, CONFIG.minSize]);

  const isCircleOverlapping = useCallback(
    (newCircle: Circle, existingCircles: Circle[]) => {
      return existingCircles.some((circle) => {
        const center1 = {
          x: newCircle.x + newCircle.size / 2,
          y: newCircle.y + newCircle.size / 2,
        };
        const center2 = {
          x: circle.x + circle.size / 2,
          y: circle.y + circle.size / 2,
        };

        const distance = Math.sqrt(
          Math.pow(center1.x - center2.x, 2) + Math.pow(center1.y - center2.y, 2)
        );

        const minDistance = (newCircle.size + circle.size) / 2 + CONFIG.spacing;

        return distance < minDistance;
      });
    },
    [CONFIG.spacing]
  );

  const isCircleInBounds = useCallback(
    (circle: Circle) => {
      return (
        circle.x + circle.size + CONFIG.spacing <= pageSize.current.width &&
        circle.y + circle.size + CONFIG.spacing <= pageSize.current.height &&
        circle.x >= CONFIG.spacing &&
        circle.y >= CONFIG.spacing
      );
    },
    [CONFIG.spacing]
  );

  const generateNewCircle = useCallback(
    (startX: number = 0, startY: number = 0) => {
      let currentSize = generateRandomSize();
      let sizeReductionAttempts = 0;
      const maxSizeReductionAttempts = 3;
      const maxAttemptsPerSize = 10;
      let newCircle = { x: 0, y: 0, size: 0, id: getUUID() };

      while (sizeReductionAttempts < maxSizeReductionAttempts) {
        let attempts = 0;

        while (attempts < maxAttemptsPerSize) {
          const x = Math.floor(
            Math.random() * (pageSize.current.width - currentSize - CONFIG.spacing * 2) +
              startX +
              CONFIG.spacing
          );
          const y = Math.floor(
            Math.random() * (pageSize.current.height - currentSize - CONFIG.spacing * 2) +
              startY +
              CONFIG.spacing
          );

          newCircle = { ...newCircle, x, y, size: currentSize };

          if (!isCircleOverlapping(newCircle, circles) && isCircleInBounds(newCircle)) {
            return { ...newCircle, id: getUUID() };
          }

          attempts++;
        }

        currentSize = Math.max(currentSize / 3, CONFIG.minSize);
        sizeReductionAttempts++;

        if (currentSize <= CONFIG.minSize) {
          break;
        }
      }

      return null;
    },
    [
      circles,
      generateRandomSize,
      isCircleOverlapping,
      isCircleInBounds,
      CONFIG.spacing,
      CONFIG.minSize,
    ]
  );

  const addCircle = useCallback(
    (startX: number = 0, startY: number = 0) => {
      const newCircle = generateNewCircle(startX, startY);
      if (newCircle) {
        setCircles((prev) => [...prev, newCircle]);
        return true;
      }
      return false;
    },
    [generateNewCircle]
  );

  const startGeneratingCircles = useCallback(
    (startX: number = 0, startY: number = 0) => {
      if (currentInterval.current) {
        clearInterval(currentInterval.current);
      }

      const interval = setInterval(() => {
        const wasAdded = addCircle(startX, startY);
        if (!wasAdded) {
          clearInterval(interval);
        }
      }, 0);

      currentInterval.current = interval;
      return interval;
    },
    [addCircle]
  );

  useEffect(() => {
    const interval = startGeneratingCircles();
    return () => clearInterval(interval);
  }, [startGeneratingCircles]);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const documentHeight = document.documentElement.scrollHeight;

      if (documentHeight > pageSize.current.height) {
        const startY = pageSize.current.height;
        startGeneratingCircles(0, startY);
      }

      pageSize.current.height = documentHeight;
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
    };
  }, [startGeneratingCircles]);

  useEffect(() => {
    const handleResize = () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }

      debounceTimeout.current = setTimeout(() => {
        const documentWidth = window.innerWidth;

        if (documentWidth > pageSize.current.width) {
          const startX = pageSize.current.width;
          startGeneratingCircles(startX, 0);
        }

        pageSize.current.width = documentWidth;
      }, 200);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [startGeneratingCircles]);

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 overflow-hidden">
        {circles.map((circle) => (
          <div
            key={circle.id}
            className="absolute rounded-full -z-[99] animate-scaleUp"
            style={{
              width: `${circle.size}px`,
              height: `${circle.size}px`,
              left: `${circle.x}px`,
              top: `${circle.y}px`,
              border: `3px solid ${CONFIG.color}`,
            }}
          />
        ))}
      </div>
      {children}
    </div>
  );
};

export default ShapeWrapper;
