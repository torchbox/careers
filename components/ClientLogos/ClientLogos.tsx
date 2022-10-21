import { RefObject, useEffect, useRef } from 'react';
import { ImageTypes } from 'types/Base';
import Image from 'components/Image';
import { animateWithOptions, fadeInSlideUp } from 'lib/animations';
import { useScreen } from 'hooks/useScreen';
import styles from './ClientLogos.module.scss';

type ClientLogosProps = {
    logos: ImageTypes[];
};

export const ClientLogos = ({ logos }: ClientLogosProps) => {
    const containerRef: RefObject<HTMLUListElement> =
        useRef<HTMLUListElement | null>(null);
    const screen = useScreen();

    useEffect(() => {
        const containerNode = containerRef?.current;
        const hasIOSupport = !!window.IntersectionObserver;
        if (!hasIOSupport || !containerNode) return;

        const callback = (
            entries: IntersectionObserverEntry[],
            observer: IntersectionObserver,
        ) => {
            // Look at all intersection observer event entries reported
            entries.forEach((entry) => {
                // If the event entry is of a target element intersecting with the observer
                if (entry.isIntersecting) {
                    const logoElements =
                        entry.target.getElementsByTagName('LI');

                    for (let i = 0; i < logoElements.length; i += 1) {
                        animateWithOptions(
                            logoElements[i] as HTMLElement,
                            fadeInSlideUp,
                            { delay: i * 80 },
                        );
                    }

                    // Stop observing so the animation doesn't replay if they scroll down again.
                    observer.unobserve(entry.target);
                }
            });
        };

        let observerThreshold = 0.1;
        if (screen.includes('medium')) observerThreshold = 0.3;
        if (screen.includes('large')) observerThreshold = 0.5;

        const observer = new IntersectionObserver(callback, {
            root: null,
            rootMargin: '0px',
            threshold: observerThreshold,
        });

        observer.observe(containerNode);

        return () => observer.disconnect();
    });

    // Slice used to cap number of logos at 8, but this is also restricted to 8 items in Contentful
    const listOfClientLogos = logos.slice(0, 8).map((logo, index) => (
        <li className={styles.logo} key={index}>
            <Image src={logo.url} alt={logo.description} />
        </li>
    ));

    return (
        <ul ref={containerRef} className={styles.container}>
            {listOfClientLogos}
        </ul>
    );
};

export default ClientLogos;
