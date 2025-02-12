import { ThemeToggle } from '@/components/ui/ThemeToggle/index.tsx';
import { GlassWrapper } from '@/components/ui/wrapper/GlassWrapper.tsx';
import { useLogoutMutation } from '@/redux/auth/authApi.js';
import { RootState } from '@/redux/store.ts';
import { ReactNode, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { ShapeWrapper } from './GlassLayout.js';
import { ROUTES } from '@/routes/routesPaths.js';

const pages = [
  {
    title: 'Главная',
    href: ROUTES.HOME,
  },
  {
    title: 'Новая форма',
    href: ROUTES.FORMS_NEW,
  },
  {
    title: 'Профиль',
    href: ROUTES.ME,
  },
];

export const PageLayout = ({ children }: { children?: ReactNode }) => {
  const [navOpen, setNavOpen] = useState(false);

  const [logout] = useLogoutMutation();
  const location = useLocation();
  const user = useSelector((state: RootState) => state.user.user);

  const handleExit = async () => {
    try {
      await logout().unwrap();
    } catch (error) {
      console.log('####: logout error', error);
    }
  };

  const toggleNav = () => setNavOpen((prev) => !prev);

  const navLinkClass = (href: string, isActive: boolean) => {
    const { pathname } = location;
    return `hover:text-linkHover transition-colors ${
      isActive ||
      (href === ROUTES.FORMS_NEW && pathname.startsWith('/forms') && pathname.endsWith('/edit'))
        ? 'text-primary'
        : 'text-textPrimary'
    }`;
  };

  return (
    <ShapeWrapper>
      <div className="min-h-screen flex flex-col">
        {user && (
          <header className="sticky top-0 z-50">
            <GlassWrapper className="relative py-5 flex m-auto items-center justify-center border-l-0 border-r-0 border-t-0 rounded-none">
              <div className="flex justify-between items-center gap-5 px-4 w-full max-w-screen-lg">
                {/* //logo */}
                <NavLink to={ROUTES.HOME}>
                  <div className="absolute top-1.5 text-[35px] font-bold text-primary dark:text-dark-primary font-quicksand">
                    Forms
                  </div>
                </NavLink>

                {/*// dekstop menu */}
                <ul className="hidden md:flex items-center gap-8">
                  {pages.map((page) => (
                    <li key={page.href}>
                      <NavLink
                        to={page.href}
                        className={({ isActive }) => navLinkClass(page.href, isActive)}
                        end
                      >
                        {page.title}
                      </NavLink>
                    </li>
                  ))}

                  <li>
                    <div className="hidden md:block">
                      <ThemeToggle />
                    </div>
                  </li>
                  <li>
                    <div
                      onClick={handleExit}
                      className="text-textPrimary hover:text-linkHover flex items-center transition-colors cursor-pointer"
                    >
                      <FiLogOut size={20} />
                    </div>
                  </li>
                </ul>

                {/* //humburger */}
                <div
                  className="md:hidden z-10 text-textPrimary hover:text-linkHover cursor-pointer"
                  onClick={toggleNav}
                >
                  {navOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                </div>

                {/* //mobile menu */}
                {navOpen && (
                  <ul className="absolute top-0 left-0 w-full h-screen bg-bgBase flex flex-col justify-center items-center md:hidden">
                    {pages.map((page) => (
                      <li key={page.href} className="py-6 text-2xl">
                        <NavLink
                          onClick={toggleNav}
                          to={page.href}
                          className={({ isActive }) => navLinkClass(page.href, isActive)}
                          end
                        >
                          {page.title}
                        </NavLink>
                      </li>
                    ))}
                    <li className="py-6 text-2xl">
                      <div>
                        <ThemeToggle />
                      </div>
                    </li>
                    <li className="py-6 text-2xl">
                      <button
                        onClick={() => {
                          toggleNav();
                          handleExit();
                        }}
                        className="text-textPrimary hover:text-linkHover transition-colors"
                      >
                        Выйти
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </GlassWrapper>
          </header>
        )}
        <div className="mt-4 mb-10 flex-grow w-full max-w-screen-lg m-auto px-4">
          {children || <Outlet />}
        </div>
        <footer>
          <GlassWrapper className="py-4 z-50 border-l-0 border-r-0 border-b-0 rounded-none">
            <div className="justify-center flex text-textPrimary items-center px-2 text-xs lg:text-sm lg:px-0">
              © {new Date().getFullYear()} Все права защищены.
            </div>
          </GlassWrapper>
        </footer>
      </div>
    </ShapeWrapper>
  );
};
