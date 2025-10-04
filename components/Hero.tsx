import React, { useState, useEffect } from 'react';
import { useMousePosition } from '../hooks/useMousePosition';
import Logo from './Logo';

// Particles Component
const Particles: React.FC = React.memo(() => {
    const [particles, setParticles] = useState<React.CSSProperties[]>([]);

    useEffect(() => {
        const newParticles = Array.from({ length: 30 }).map(() => ({
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${5 + Math.random() * 10}s`,
        }));
        setParticles(newParticles);
    }, []);

    return (
        <div className="absolute inset-0 z-10 pointer-events-none">
            {particles.map((style, i) => (
                <div
                    key={i}
                    style={style}
                    className="absolute w-0.5 h-0.5 bg-[#B73239]/20 rounded-full animate-[particleFloat_10s_infinite_linear]"
                />
            ))}
        </div>
    );
});

// Hero Component
const Hero: React.FC = () => {
    const { x, y } = useMousePosition();
    const [lightingStyle, setLightingStyle] = useState({});

    useEffect(() => {
        setLightingStyle({
            '--mouse-x': `${(x / window.innerWidth) * 100}%`,
            '--mouse-y': `${(y / window.innerHeight) * 100}%`,
        });
    }, [x, y]);
    
    const scrollToServices = () => {
        document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="h-screen flex items-center justify-center relative overflow-hidden bg-[#1B1B1B]">
            {/* Background Effects */}
            <div
                style={lightingStyle as React.CSSProperties}
                className="absolute inset-0 bg-[radial-gradient(600px_circle_at_var(--mouse-x)_var(--mouse-y),rgba(183,50,57,0.1)_0%,transparent_40%)] z-10"
            />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(15,28,77,0.05)_0%,rgba(27,27,27,0.95)_70%)] z-0" />
            <Particles />
            
            <div className="container mx-auto px-5 md:px-12 flex items-center relative z-20">
                {/* Left Content Section */}
                <div className="flex-1 max-w-2xl">
                    <div className="mb-8">
                        <Logo size="lg" />
                    </div>
                    
                    <p className="text-sm text-[#F5F5F5] tracking-[3px] uppercase mb-5 animate-[slideUp_1s_ease_0.5s_forwards] opacity-0">
                        Notre Vision
                    </p>
                    
                    <h1 className="text-6xl md:text-8xl font-bold leading-none mb-7 text-[#FAFAFA] animate-[slideUp_1s_ease_0.7s_forwards] opacity-0">
                        AUDIOVISUEL
                    </h1>
                    
                    <p className="text-lg text-[#F5F5F5] leading-relaxed mb-10 max-w-lg animate-[slideUp_1s_ease_0.9s_forwards] opacity-0">
                        Notre passion est un audiovisuel moderne et innovant, la clé d'une communication réussie avec nos clients et partenaires.
                    </p>
                    
                    <div className="flex items-center gap-4 animate-[slideUp_1s_ease_1.1s_forwards] opacity-0">
                        <button 
                            onClick={scrollToServices}
                            className="w-12 h-12 border border-[#FAFAFA] rounded-full flex items-center justify-center hover:bg-[#B73239] hover:border-[#B73239] transition-all duration-300 group">
                            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                        <span className="text-[#FAFAFA] text-sm tracking-wider uppercase">Découvrir Plus</span>
                    </div>
                </div>

                {/* Classical Bust Image */}
                <div className="flex-1 flex justify-center items-center relative">
                    <div className="relative w-full max-w-lg h-96">
                        {/* Classical Bust Image with Fire Effect */}
                        <div className="w-full h-full relative overflow-hidden rounded-lg">
                            {/* Classical Bust Image */}
                            <img
                                src="/images/classical-bust.png"
                                alt="Classical Bust with Fire"
                                className="w-full h-full object-cover"
                            />
                            
                            {/* Fire Effect Overlay */}
                            <div className="absolute inset-0 pointer-events-none">
                                {/* Red/Orange Fire Flames */}
                                <div className="absolute top-0 right-0 w-32 h-40 bg-gradient-to-l from-red-500/80 via-orange-500/60 to-transparent rounded-full blur-sm animate-[pulse_2s_infinite_ease-in-out]"></div>
                                <div className="absolute top-8 right-4 w-24 h-32 bg-gradient-to-l from-red-400/70 via-orange-400/50 to-transparent rounded-full blur-sm animate-[pulse_3s_infinite_ease-in-out]"></div>
                                <div className="absolute top-12 right-8 w-20 h-28 bg-gradient-to-l from-orange-500/60 via-red-500/40 to-transparent rounded-full blur-sm animate-[pulse_2.5s_infinite_ease-in-out]"></div>
                                <div className="absolute top-16 right-12 w-16 h-24 bg-gradient-to-l from-red-400/50 via-orange-400/30 to-transparent rounded-full blur-sm animate-[pulse_1.5s_infinite_ease-in-out]"></div>
                                
                                {/* Fire Particles */}
                                <div className="absolute top-4 right-8 w-2 h-2 bg-red-500 rounded-full animate-[float_1s_infinite_ease-in-out]"></div>
                                <div className="absolute top-12 right-4 w-1 h-1 bg-orange-500 rounded-full animate-[float_1.2s_infinite_ease-in-out]"></div>
                                <div className="absolute top-16 right-6 w-1 h-1 bg-red-500 rounded-full animate-[float_0.8s_infinite_ease-in-out]"></div>
                                <div className="absolute top-20 right-10 w-1 h-1 bg-orange-400 rounded-full animate-[float_1.5s_infinite_ease-in-out]"></div>
                            </div>
                            
                            {/* Fire Glow Effect */}
                            <div className="absolute inset-0 bg-gradient-to-l from-red-500/20 via-orange-500/10 to-transparent rounded-lg"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Pagination */}
            <div className="absolute bottom-8 left-8 flex items-center gap-4 text-[#FAFAFA] z-30">
                <span className="text-sm font-light">01</span>
                <div className="w-16 h-px bg-[#FAFAFA]"></div>
                <span className="text-sm font-light opacity-50">03</span>
            </div>

            {/* Bottom Right Circle */}
            <div className="absolute bottom-8 right-8 w-16 h-16 bg-[#B73239] rounded-full opacity-60 z-30"></div>
        </section>
    );
};

export default Hero;