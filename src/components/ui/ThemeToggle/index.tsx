import { RootState } from '@/redux/store';
import { toggleTheme } from '@/redux/theme';
import { HiSun, HiMoon } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';

export const ThemeToggle = () => {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const dispatch = useDispatch();

  return (
    //стиль select-none - отключает выделение текста (при нескольких быстрых кликах)
    <div className="min-w-36 select-none">
      {theme === 'dark' ? (
        <div
          className="flex items-center justify-center text-textPrimary hover:text-linkHover transition-colors cursor-pointer"
          onClick={() => dispatch(toggleTheme())}
        >
          <HiSun className="text-2xl mr-2 flex-shrink-0" /> Светлая тема
        </div>
      ) : (
        <div
          className="flex items-center justify-center text-textPrimary hover:text-linkHover transition-colors cursor-pointer"
          onClick={() => dispatch(toggleTheme())}
        >
          <HiMoon className="text-2xl mr-2 flex-shrink-0" /> Темная тема
        </div>
      )}
    </div>
  );
};
