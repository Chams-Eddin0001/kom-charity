import { useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';

interface UseAnimationOptions {
    threshold?: number;
    rootMargin?: string;
    triggerOnce?: boolean;
}

// Hook for scroll-triggered animations using Intersection Observer
export function useScrollAnimation<T extends HTMLElement>(
    options: UseAnimationOptions = {}
): [RefObject<T | null>, boolean] {
    const { threshold = 0.1, rootMargin = '0px', triggerOnce = true } = options;
    const ref = useRef<T>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (triggerOnce) {
                        observer.unobserve(element);
                    }
                } else if (!triggerOnce) {
                    setIsVisible(false);
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(element);

        return () => {
            observer.unobserve(element);
        };
    }, [threshold, rootMargin, triggerOnce]);

    return [ref, isVisible];
}

// Hook for staggered animations
export function useStaggerAnimation(
    itemCount: number,
    baseDelay: number = 100
): number[] {
    return Array.from({ length: itemCount }, (_, i) => i * baseDelay);
}

// Animation class helper
export function getAnimationClass(
    isVisible: boolean,
    animation: 'fade-up' | 'fade-in' | 'fade-left' | 'fade-right' | 'scale-in' = 'fade-up',
    delay: number = 0
): string {
    const baseClasses = 'transition-all duration-700 ease-out';
    const delayStyle = delay > 0 ? `delay-[${delay}ms]` : '';

    const animationClasses = {
        'fade-up': isVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-8',
        'fade-in': isVisible
            ? 'opacity-100'
            : 'opacity-0',
        'fade-left': isVisible
            ? 'opacity-100 translate-x-0'
            : 'opacity-0 -translate-x-8',
        'fade-right': isVisible
            ? 'opacity-100 translate-x-0'
            : 'opacity-0 translate-x-8',
        'scale-in': isVisible
            ? 'opacity-100 scale-100'
            : 'opacity-0 scale-95',
    };

    return `${baseClasses} ${delayStyle} ${animationClasses[animation]}`;
}
