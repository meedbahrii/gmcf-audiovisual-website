import React, { useRef } from 'react';
import { SERVICES_DATA } from '../constants';
import { useOnScreen } from '../hooks/useOnScreen';

interface CollectionCardProps {
    icon: string;
    title: string;
    description: string;
    index: number;
}

const CollectionCard: React.FC<CollectionCardProps> = ({ icon, title, description, index }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isVisible = useOnScreen(ref, '-100px');

    return (
        <div
            ref={ref}
            className={`bg-gradient-to-br from-[#0F1C4D] to-[#5A3E85] rounded-2xl p-10 relative transition-all duration-700 ease-out overflow-hidden group interactive ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
        >
            <div className="absolute inset-0 bg-gradient-to-bl from-[#FAFAFA]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-[#C9A227] to-[#E67E22] rounded-full flex items-center justify-center mb-7 text-4xl text-[#1B1B1B]">
                    {icon}
                </div>
                <h3 className="text-2xl text-[#FAFAFA] font-light mb-4">{title}</h3>
                <p className="text-[#F5F5F5] leading-relaxed text-sm">{description}</p>
            </div>
        </div>
    );
};

const Collections: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const isVisible = useOnScreen(ref, '-100px');

    return (
        <section className="min-h-screen py-24 px-5 md:px-12 bg-gradient-to-br from-[#1B1B1B] to-[#0F1C4D]/20">
            <div ref={ref} className={`text-center mb-20 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <p className="text-sm text-[#F5F5F5] tracking-[3px] uppercase mb-5">Technologies de Pointe</p>
                <h2 className="text-4xl md:text-5xl font-light bg-gradient-to-r from-[#FAFAFA] to-[#F5F5F5] bg-clip-text text-transparent">
                    Nos Services
                </h2>
            </div>
            
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
                {SERVICES_DATA.map((item, index) => (
                    <CollectionCard key={item.title} {...item} index={index} />
                ))}
            </div>
        </section>
    );
};

export default Collections;