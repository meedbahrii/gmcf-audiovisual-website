import React from 'react';
import { NAV_LINKS } from '../constants';
import Logo from './Logo';

const Navbar: React.FC = () => {
    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <nav className="fixed top-0 left-0 right-0 p-5 md:px-12 md:py-5 flex justify-between items-center z-[100] bg-[#1B1B1B]/80 backdrop-blur-md">
            <Logo size="md" />
            <ul className="hidden md:flex gap-10 list-none">
                {NAV_LINKS.map(link => (
                    <li key={link.label}>
                        <a 
                            href={link.href}
                            onClick={(e) => handleLinkClick(e, link.href)}
                            className="text-[#FAFAFA] text-sm tracking-wider uppercase transition-colors duration-300 hover:text-[#B73239]"
                        >
                            {link.label}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Navbar;