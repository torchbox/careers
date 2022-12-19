import { animateWithOptions, fadeInSlideUp } from 'lib/animations';
import { useEffect, useState } from 'react';

export const useChildElementsAnimation = (containerRef: any) => {
    const [nextElementToLoad, setNextElementToLoad] = useState(0);

    useEffect(() => {
        const containerNode = containerRef?.current;
        const hasIOSupport = !!window.IntersectionObserver;
        if (!hasIOSupport || !containerNode) return;

        const callback = (
            entries: IntersectionObserverEntry[],
            observer: IntersectionObserver,
        ) => {
            // Look at all intersection observer event entries reported
            let nextElementAnimationIndex = nextElementToLoad;
            entries.forEach((entry, index) => {
                let currentElementAnimationIndex = (entry.target as HTMLElement)
                    .dataset.animationIndex;

                // Make sure that entries are animated in sequence by checking their index
                if (
                    entry.isIntersecting &&
                    currentElementAnimationIndex ===
                        nextElementAnimationIndex.toString()
                ) {
                    animateWithOptions(
                        entry.target as HTMLElement,
                        fadeInSlideUp,
                        { delay: index * 80 },
                    );

                    // Stop observing so the animation doesn't replay
                    observer.unobserve(entry.target);
                    nextElementAnimationIndex += 1;
                }
            });

            setNextElementToLoad(nextElementAnimationIndex);
        };

        const observerThreshold = 0.5;

        const observer = new IntersectionObserver(callback, {
            root: null,
            rootMargin: '0px',
            threshold: observerThreshold,
        });

        const animatedElements = containerNode.children;

        for (let i = 0; i < animatedElements.length; i += 1) {
            containerNode.children[i].dataset.animationIndex = i;
            observer.observe(containerNode.children[i]);
        }

        return () => observer.disconnect();
    });
};
