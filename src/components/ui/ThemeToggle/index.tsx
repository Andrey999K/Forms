import { RootState } from '@/redux/store';
import { toggleTheme } from '@/redux/theme';
import { HiSun, HiMoon } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';

export const ThemeToggle = () => {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const dispatch = useDispatch();

  return (
    <div>
      {theme === 'dark' ? (
        <div className="flex items-center cursor-pointer" onClick={() => dispatch(toggleTheme())}>
          <HiSun className="text-2xl mr-2" /> Светлая тема
        </div>
      ) : (
        <div className="flex items-center cursor-pointer" onClick={() => dispatch(toggleTheme())}>
          <HiMoon className="text-2xl mr-2" /> Темная тема
        </div>
      )}
    </div>
  );
};
