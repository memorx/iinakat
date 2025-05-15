import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/images/logo/logo.png';

const Navbar = () => {
    const location = useLocation(); // Detecta la URL actual

    // Función para determinar si estamos en la sección actual
    const getLinkClass = (path) => {
        return location.pathname === path 
            ? 'text-white bg-button-dark-green px-4 py-2 rounded-full cursor-default'
            : 'px-4 py-2 rounded-full bg-transparent text-text-black hover:bg-button-dark-green hover:text-white transition-colors';
    };

    return (
        <nav className="fixed top-0 left-0 w-full bg-custom-beige py-10 md:py-12 z-50">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link to="/">
                    <img src={logo} alt="INAKAT" className="w-32" />
                </Link>

                {/* Menú */}
                <ul className="flex space-x-4 md:space-x-6 items-center">
                    <li>
                        <Link to="/" className={getLinkClass('/')}>
                            INICIO
                        </Link>
                    </li>
                    <li>
                        <Link to="/about" className={getLinkClass('/about')}>
                            SOBRE NOSOTROS
                        </Link>
                    </li>
                    <li>
                        <Link to="/companies" className={getLinkClass('/companies')}>
                            EMPRESAS
                        </Link>
                    </li>
                    <li>
                        <Link to="/talents" className={getLinkClass('/talents')}>
                            TALENTOS
                        </Link>
                    </li>
                    <li>
                        <Link to="/contact" className={getLinkClass('/contact')}>
                            CONTACTO
                        </Link>
                    </li>
                    {/* Botón de Log-in */}
                    <li>
                        <Link to="/login" className="bg-button-orange text-white px-4 py-2 rounded-full">
                            LOG-IN
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;