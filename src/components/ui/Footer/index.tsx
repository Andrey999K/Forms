import { GlassWrapper } from '@/components/ui/wrapper/GlassWrapper';
import { BsGithub } from 'react-icons/bs';

export const Footer = () => {
  const developers = [
    { name: 'Андрей', github: 'https://github.com/Andrey999K' },
    { name: 'Нияз', github: 'https://github.com/Bellusfennec' },
    { name: 'Алексей', github: 'https://github.com/AlexeyKharitonov' },
    { name: 'Даниил', github: 'https://github.com/D1KANI' },
  ];

  return (
    <footer>
      <GlassWrapper className="py-4 z-50 border-l-0 border-r-0 border-b-0 rounded-none">
        <div className="flex justify-center items-center gap-6 text-textPrimary dark:text-white px-2 text-xs lg:text-sm lg:px-0 flex-wrap">
          <span>© {new Date().getFullYear()} Все права защищены.</span>
          <div className="flex items-center gap-5">
            {developers.map((dev) => (
              <a
                key={dev.github}
                href={dev.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-linkHover transition duration-300"
              >
                <span className="hidden sm:inline">{dev.name}</span>
                <BsGithub
                  size={24}
                  className="sm:w-[20px] sm:h-[20px] opacity-90 hover:brightness-75"
                />
              </a>
            ))}
          </div>
        </div>
      </GlassWrapper>
    </footer>
  );
};
