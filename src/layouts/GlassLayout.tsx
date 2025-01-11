import { useState, useEffect, FC, useCallback, useMemo } from 'react';

type Props = {
  children: React.ReactNode;
  settings?: Partial<Settings>;
};

type Settings = {
  blur: number;
  color: string;
  opacity: number;
};

const defaultSettings: Settings = {
  blur: 10,
  color: 'rgb(249, 115, 22)',
  opacity: 0.5,
};

type Position = { x: number; y: number };
type Circle = { id: number; visible: boolean; size: number } & Position;

export const ShapeWrapper: FC<Props> = ({ children, settings }) => {
  const [processedViewports, setProcessedViewports] = useState<Set<number>>(new Set());
  const [circles, setCircles] = useState<Circle[]>([]);
  const CONFIG: Settings = { ...defaultSettings, ...settings };

  // Рассчитываем размер круга в зависимости от размеров экрана
  const calculateCircleSize = useMemo(() => {
    const numCirclesInRow = 2.5;
    const numCirclesInColumn = 2.5;
    const sizeWidth = window.innerWidth / numCirclesInRow;
    const sizeHeight = window.innerHeight / numCirclesInColumn;
    return Math.min(sizeWidth, sizeHeight);
  }, []);

  // Генерация случайной позиции внутри экрана
  const generatePosition = useCallback(
    (scrollY: number) => {
      const maxX = window.innerWidth - calculateCircleSize;
      const viewportHeight = window.innerHeight - calculateCircleSize;
      const x = Math.max(0, Math.floor(Math.random() * maxX));
      const randomOffset = Math.random() * viewportHeight;
      const y = scrollY + randomOffset;
      return { x, y, size: calculateCircleSize };
    },
    [calculateCircleSize]
  );

  // Проверка, является ли новая позиция круга валидной
  const isPositionValid = (
    newCircle: Position,
    existingCircles: Position[],
    minDistance: number
  ) => {
    return !existingCircles.some((circle) => {
      const distance = Math.sqrt(
        Math.pow(newCircle.x - circle.x, 2) + Math.pow(newCircle.y - circle.y, 2)
      );
      console.log(distance, minDistance);

      return distance < minDistance;
    });
  };

  // Генерация валидной позиции с несколькими попытками
  const generateValidPosition = (
    scrollY: number,
    existingCircles: Position[],
    minDistance: number,
    maxAttempts: number = 10
  ) => {
    let newCircle;
    let attempts = 0;
    do {
      newCircle = generatePosition(scrollY);
      attempts++;
      if (attempts >= maxAttempts) return newCircle;
    } while (!isPositionValid(newCircle, existingCircles, minDistance));

    return newCircle;
  };

  // Обработка события прокрутки для добавления новых кругов
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    const currentViewportIndex = Math.floor(scrollY / viewportHeight);

    if (!processedViewports.has(currentViewportIndex)) {
      const newCircles: Circle[] = [];
      for (let i = 0; i < 2; i++) {
        const newCircle = generateValidPosition(
          currentViewportIndex * viewportHeight,
          circles,
          calculateCircleSize
        );
        newCircles.push({ ...newCircle, id: Date.now() + Math.random(), visible: false });
      }

      setCircles((prev) => [...prev, ...newCircles]);
      setProcessedViewports((prev) => new Set(prev).add(currentViewportIndex));

      setTimeout(() => {
        setCircles((prev) =>
          prev.map((circle) =>
            newCircles.some((newCircle) => newCircle.x === circle.x && newCircle.y === circle.y)
              ? { ...circle, visible: true }
              : circle
          )
        );
      }, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [circles, processedViewports, calculateCircleSize]);

  // Обработка события изменения размера окна для переноса кругов
  const handleResize = useCallback(() => {
    setCircles((prev) => {
      const viewportHeight = window.innerHeight;
      return prev.map(({ y, id }) => {
        const position = generatePosition(Math.floor(y / viewportHeight) * viewportHeight);
        return { ...position, id, visible: true };
      });
    });
  }, [generatePosition]);

  // Инициализация кругов при первом рендере и добавление обработчиков событий
  useEffect(() => {
    if (!processedViewports.has(0)) {
      const initialCircles = [];
      for (let i = 0; i < 2; i++) {
        const newCircle = generateValidPosition(0, initialCircles, calculateCircleSize);
        initialCircles.push(newCircle);
      }

      setCircles(initialCircles.map((pos, index) => ({ ...pos, id: index, visible: false })));
      setProcessedViewports((prev) => new Set(prev).add(0));

      setTimeout(() => {
        setCircles((prev) => prev.map((circle) => ({ ...circle, visible: true })));
      }, 100);
    }

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calculateCircleSize, processedViewports, handleScroll, handleResize]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {circles.map((circle) => (
        <div
          key={circle.id}
          className={`absolute rounded-full z-[99] transition-all duration-1000 ease-in-out ${circle.visible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
          style={{
            width: `${circle.size}px`,
            height: `${circle.size}px`,
            left: `${circle.x}px`,
            top: `${circle.y}px`,
            backgroundColor: CONFIG.color,
            opacity: CONFIG.opacity,
            filter: `blur(${CONFIG.blur}rem)`,
          }}
        />
      ))}
      {children}
    </div>
  );
};
