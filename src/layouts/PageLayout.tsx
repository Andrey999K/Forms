import { useLogoutMutation } from '@/redux/auth/authApi.js';
import { ReactNode, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { ROUTES } from '../utils/routesConfig.ts';
import { ShapeWrapper } from './GlassLayout.js';
import { useLocation } from 'react-router-dom';
import { GlassWrapper } from '@/components/ui/wrapper/GlassWrapper.tsx';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store.ts';
import { FiLogOut } from 'react-icons/fi';
import { FaTimes, FaBars } from 'react-icons/fa';

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

  return (
    <>
      <ShapeWrapper>
        {user && (
          <header className="sticky top-0 z-50">
            <GlassWrapper className="relative py-5 flex m-auto items-center justify-center border-b-[1px] border-solid border-gray-200 ">
              <div className="flex justify-between items-center gap-5 px-4 w-full max-w-screen-lg">
                {/* //logo */}
                <NavLink to={ROUTES.HOME}>
                  <div className="absolute top-1.5 text-[35px] font-bold text-[#f97316] font-quicksand">
                    Forms
                  </div>
                </NavLink>

                {/*// menu */}
                <ul className="hidden md:flex items-center gap-8">
                  {pages.map((page) => (
                    <li key={page.href}>
                      <NavLink
                        to={page.href}
                        className={({ isActive }) =>
                          `hover:text-orange-500 transition-colors ${
                            isActive ||
                            (page.href === ROUTES.FORMS_NEW &&
                              location.pathname.startsWith('/forms') &&
                              location.pathname.endsWith('/edit'))
                              ? 'text-orange-500'
                              : 'text-gray-700'
                          }`
                        }
                        end
                      >
                        {page.title}
                      </NavLink>
                    </li>
                  ))}
                  <li>
                    <button
                      onClick={handleExit}
                      className="hover:text-orange-500 text-gray-700 transition-colors"
                    >
                      <FiLogOut size={20} />
                    </button>
                  </li>
                </ul>

                {/* //humburger */}
                <div className="md:hidden z-10 cursor-pointer" onClick={toggleNav}>
                  {navOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                </div>

                {/* //mobile menu */}
                {navOpen && (
                  <ul className="absolute top-0 left-0 w-full h-screen bg-white flex flex-col justify-center items-center md:hidden">
                    {pages.map((page) => (
                      <li key={page.href} className="py-6 text-2xl">
                        <NavLink
                          onClick={toggleNav}
                          to={page.href}
                          className={({ isActive }) =>
                            `hover:text-orange-500 transition-colors ${
                              isActive ||
                              (page.href === ROUTES.FORMS_NEW &&
                                location.pathname.startsWith('/forms') &&
                                location.pathname.endsWith('/edit'))
                                ? 'text-orange-500'
                                : 'text-gray-700'
                            }`
                          }
                          end
                        >
                          {page.title}
                        </NavLink>
                      </li>
                    ))}
                    <li className="py-6 text-2xl">
                      <button
                        onClick={() => {
                          toggleNav();
                          handleExit();
                        }}
                        className="hover:text-orange-500 text-gray-700 transition-colors"
                      >
                        Выйти из приложения
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </GlassWrapper>
          </header>
        )}
        <div className="mt-5 w-full max-w-screen-lg m-auto px-4">{children || <Outlet />}</div>
      </ShapeWrapper>
    </>
  );
};
