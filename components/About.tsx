import React, { useState, useEffect, useRef } from 'react';
import { ABOUT_STATS } from '../constants';
import { useOnScreen } from '../hooks/useOnScreen';

const StatItem: React.FC<{ value: number; label: string; suffix: string; }> = ({ value, label, suffix }) => {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const isVisible = useOnScreen(ref);

    useEffect(() => {
        if (isVisible) {
            const duration = 2000;
            const stepTime = 30;
            const totalSteps = duration / stepTime;
            const increment = value / totalSteps;
            let currentCount = 0;

            const timer = setInterval(() => {
                currentCount += increment;
                if (currentCount >= value) {
                    setCount(value);
                    clearInterval(timer);
                } else {
                    setCount(Math.ceil(currentCount));
                }
            }, stepTime);

            return () => clearInterval(timer);
        }
    }, [isVisible, value]);
    
    const formatCount = (num: number) => {
        return `${num}${suffix}`;
    };

    return (
        <div ref={ref} className="text-center p-5 bg-[#0F1C4D]/30 backdrop-blur-md rounded-xl">
            <div className="text-4xl font-light text-[#FAFAFA] mb-2">{formatCount(count)}</div>
            <div className="text-xs text-[#F5F5F5] tracking-widest uppercase">{label}</div>
        </div>
    );
};


const About: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const isVisible = useOnScreen(ref, '-200px');

    return (
        <section className="min-h-screen py-24 px-5 md:px-12 bg-gradient-to-bl from-[#1B1B1B] to-[#0F1C4D]/10 flex items-center">
            <div 
                ref={ref} 
                className={`max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
                <div className="about-text">
                    <h2 className="text-4xl md:text-5xl font-light bg-gradient-to-r from-[#FAFAFA] to-[#F5F5F5] bg-clip-text text-transparent mb-7">
                        Notre Vision
                    </h2>
                    <p className="text-[#F5F5F5] leading-loose text-base mb-5">
                        Nous ne nous contentons pas de suivre le marché — nous le créons. GMCF est né d'une ambition : bâtir un hub cinématographique africain de référence au Maroc.
                    </p>
                    <p className="text-[#F5F5F5] leading-loose text-base mb-10">
                        En mobilisant des talents exigeants, des technologies de pointe et des investisseurs stratégiques, nous élevons la production artistique à un niveau d'excellence international.
                    </p>
                    <div className="grid grid-cols-2 gap-5">
                        {ABOUT_STATS.map(stat => (
                            <StatItem key={stat.label} {...stat} />
                        ))}
                    </div>
                </div>
                
                <div className="about-visual relative h-[500px] hidden lg:block">
                    <div className="relative w-full h-full">
                        <div className="absolute top-[10%] left-[10%] w-32 h-32 bg-gradient-to-br from-[#0F1C4D] to-[#5A3E85] rounded-2xl animate-[floatElement_8s_ease-in-out_infinite]" style={{ animationDelay: '0s' }}></div>
                        <div className="absolute top-[60%] right-[20%] w-20 h-20 bg-gradient-to-br from-[#B73239] to-[#E67E22] rounded-2xl animate-[floatElement_8s_ease-in-out_infinite]" style={{ animationDelay: '2s' }}></div>
                        <div className="absolute bottom-[20%] left-[30%] w-24 h-24 bg-gradient-to-br from-[#0F7156] to-[#C9A227] rounded-2xl animate-[floatElement_8s_ease-in-out_infinite]" style={{ animationDelay: '4s' }}></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;