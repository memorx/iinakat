'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { LogOut, User, ChevronDown } from 'lucide-react';
import logo from '@/assets/images/logo/logo.png';

interface UserData {
  userId: number;
  email: string;
  role: string;
  nombre?: string;
}

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Verificar si hay token en cookies
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('auth-token='))
      ?.split('=')[1];

    if (token) {
      try {
        // Decodificar JWT (sin verificar, solo para UI)
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(window.atob(base64));
        setUser(payload);
      } catch (error) {
        console.error('Error parsing token:', error);
      }
    }
  }, [pathname]);

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    // Borrar cookie
    document.cookie =
      'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC';
    setUser(null);
    setDropdownOpen(false);
    router.push('/');
    router.refresh();
  };

  const getDashboardLink = () => {
    if (!user) return '/';

    switch (user.role) {
      case 'admin':
        return '/admin/requests';
      case 'company':
        return '/company/dashboard';
      case 'user':
        return '/my-applications';
      default:
        return '/';
    }
  };

  const getDashboardLabel = () => {
    if (!user) return 'Dashboard';

    switch (user.role) {
      case 'admin':
        return 'Panel Admin';
      case 'company':
        return 'Dashboard Empresa';
      case 'user':
        return 'Mis Aplicaciones';
      default:
        return 'Dashboard';
    }
  };

  const getInitials = () => {
    if (!user) return 'U';

    if (user.nombre) {
      const names = user.nombre.split(' ');
      if (names.length >= 2) {
        return (names[0][0] + names[1][0]).toUpperCase();
      }
      return user.nombre.substring(0, 2).toUpperCase();
    }

    return user.email.substring(0, 2).toUpperCase();
  };

  const getLinkClass = (path: string) => {
    return pathname === path
      ? 'text-white bg-button-dark-green px-4 py-2 rounded-full cursor-default'
      : 'px-4 py-2 rounded-full bg-transparent text-text-black hover:bg-button-dark-green hover:text-white transition-colors';
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-custom-beige py-10 md:py-12 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <Image src={logo} alt="INAKAT" className="w-32" priority />
        </Link>

        {/* Menu */}
        <ul className="flex space-x-4 md:space-x-6 items-center">
          <li>
            <Link href="/" className={getLinkClass('/')}>
              INICIO
            </Link>
          </li>
          <li>
            <Link href="/about" className={getLinkClass('/about')}>
              SOBRE NOSOTROS
            </Link>
          </li>
          <li>
            <Link href="/companies" className={getLinkClass('/companies')}>
              EMPRESAS
            </Link>
          </li>
          <li>
            <Link href="/talents" className={getLinkClass('/talents')}>
              TALENTOS
            </Link>
          </li>
          <li>
            <Link href="/contact" className={getLinkClass('/contact')}>
              CONTACTO
            </Link>
          </li>

          {/* User Menu o Login Button */}
          <li>
            {user ? (
              // User Dropdown
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 bg-button-orange text-white px-4 py-2 rounded-full hover:bg-opacity-90 transition-colors"
                >
                  <div className="w-8 h-8 bg-white text-button-orange rounded-full flex items-center justify-center font-bold text-sm">
                    {getInitials()}
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      dropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 border border-gray-200">
                    {/* User Info */}
                    <div className="px-4 py-2 border-b border-gray-200">
                      <p className="text-sm font-semibold text-gray-900">
                        {user.nombre || user.email}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user.email}
                      </p>
                      <p className="text-xs text-button-orange font-medium mt-1">
                        {user.role === 'admin'
                          ? 'Administrador'
                          : user.role === 'company'
                          ? 'Empresa'
                          : 'Usuario'}
                      </p>
                    </div>

                    {/* Dashboard Link */}
                    <Link
                      href={getDashboardLink()}
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <User className="w-4 h-4" />
                      {getDashboardLabel()}
                    </Link>

                    {/* Logout */}
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // Login Button
              <Link
                href="/login"
                className="bg-button-orange text-white px-4 py-2 rounded-full hover:bg-opacity-90 transition-colors"
              >
                Iniciar Sesión
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
