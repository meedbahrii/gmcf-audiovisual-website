import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useMousePosition } from './hooks/useMousePosition';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Collections from './components/Collections';
import Exhibitions from './components/Exhibitions';
import About from './components/About';
import Team from './components/Team';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';

// CustomCursor Component
const CustomCursor: React.FC = () => {
    const { x, y } = useMousePosition();
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const handleMouseEnter = (e: MouseEvent) => {
            if (e.target instanceof Element && e.target.closest('a, button, .interactive')) {
                setIsHovering(true);
            }
        };

        const handleMouseLeave = (e: MouseEvent) => {
            if (e.target instanceof Element && e.target.closest('a, button, .interactive')) {
                setIsHovering(false);
            }
        };

        document.addEventListener('mouseover', handleMouseEnter);
        document.addEventListener('mouseout', handleMouseLeave);

        return () => {
            document.removeEventListener('mouseover', handleMouseEnter);
            document.removeEventListener('mouseout', handleMouseLeave);
        };
    }, []);

    const cursorStyle: React.CSSProperties = {
        left: `${x}px`,
        top: `${y}px`,
        transform: `translate(-50%, -50%) scale(${isHovering ? 2.5 : 1})`,
    };

    return (
        <div
            style={cursorStyle}
            className="fixed w-5 h-5 bg-[#FAFAFA]/60 rounded-full pointer-events-none z-[10000] transition-transform duration-300 ease-in-out mix-blend-difference"
        />
    );
};


// SideNav Component
interface SideNavProps {
    activeSection: string;
    sections: { id: string, label: string }[];
}

const SideNav: React.FC<SideNavProps> = ({ activeSection, sections }) => {
    const scrollToSection = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="fixed right-8 md:right-12 top-1/2 -translate-y-1/2 z-50">
            <div className="flex flex-col gap-5">
                {sections.map(section => (
                    <div
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={`w-2 h-2 rounded-full bg-[#FAFAFA]/60 cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#B73239] hover:scale-150 interactive ${
                            activeSection === section.id ? '!bg-[#B73239] scale-150' : ''
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};


// App Component
const App: React.FC = () => {
    const [activeSection, setActiveSection] = useState('hero');
    const sectionRefs = {
        hero: useRef<HTMLDivElement>(null),
        services: useRef<HTMLDivElement>(null),
        formation: useRef<HTMLDivElement>(null),
        about: useRef<HTMLDivElement>(null),
        team: useRef<HTMLDivElement>(null),
        contact: useRef<HTMLDivElement>(null),
    };
    
    const sections = [
        { id: 'hero', label: 'Hero', ref: sectionRefs.hero },
        { id: 'services', label: 'Services', ref: sectionRefs.services },
        { id: 'formation', label: 'Formation', ref: sectionRefs.formation },
        { id: 'about', label: 'About', ref: sectionRefs.about },
        { id: 'team', label: 'Équipe', ref: sectionRefs.team },
    ];

    const sideNavSections = sections.map(({ id, label }) => ({ id, label }));


    const handleScroll = useCallback(() => {
        const scrollPosition = window.scrollY + window.innerHeight / 2;
        
        for (const section of sections) {
            if (section.ref.current) {
                const { offsetTop, offsetHeight } = section.ref.current;
                if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                    setActiveSection(section.id);
                    return;
                }
            }
        }
    }, [sections]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    const [isLoading, setIsLoading] = useState(true);

    if (isLoading) {
        return <LoadingScreen onComplete={() => setIsLoading(false)} />;
    }

    return (
        <div className="bg-[#1B1B1B] min-h-screen">
            <CustomCursor />
            <Navbar />
            <SideNav activeSection={activeSection} sections={sideNavSections} />
            
            <main>
                <div ref={sectionRefs.hero} id="hero"><Hero /></div>
                <div ref={sectionRefs.services} id="services"><Collections /></div>
                <div ref={sectionRefs.formation} id="formation"><Exhibitions /></div>
                <div ref={sectionRefs.about} id="about"><About /></div>
                <div ref={sectionRefs.team} id="team"><Team /></div>
                <div ref={sectionRefs.contact} id="contact"><Footer /></div>
            </main>
        </div>
    );
};

export default App;