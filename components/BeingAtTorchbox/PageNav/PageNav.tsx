/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import { useEffect } from 'react';
import styles from './PageNav.module.scss';

type PageNavProps = {
    title: string;
    jobs?: number;
    children: React.ReactNode;
};

type PathPoints = {
    type: string;
    x: number;
    y: number;
};

/*
const AnchorLinks = ({ jobs = 0 }: { jobs: number }) => {
    const smoothScrollToElement = (id: string) => {
        const element = document.querySelector(id);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
            });
        }
    };

    const handleBenefitsLinkKeyDown = (
        event: React.KeyboardEvent<HTMLAnchorElement>,
    ) => {
        if (event.key === 'Enter') {
            smoothScrollToElement('#benefits');
        }
    };

    const handleLifeAtTorchboxLinkKeyDown = (
        event: React.KeyboardEvent<HTMLAnchorElement>,
    ) => {
        if (event.key === 'Enter') {
            smoothScrollToElement('#lifeAsATorchboxer');
        }
    };

    return (
        <ul className={styles.navigation}>
            <li className={styles.navItem}>
                <a
                    className={styles.navLink}
                    onClick={() => smoothScrollToElement('#benefits')}
                    onKeyDown={handleBenefitsLinkKeyDown}
                    tabIndex={0}
                >
                    Benefits
                </a>
            </li>
            <li className={styles.navItem}>
                <a
                    className={styles.navLink}
                    onClick={() => smoothScrollToElement('#lifeAsATorchboxer')}
                    onKeyDown={handleLifeAtTorchboxLinkKeyDown}
                    tabIndex={0}
                >
                    Life as a Torchboxer
                </a>
            </li>
            <li className={styles.jobNavItem}>
                <Link href="/jobs" scroll={false}>
                    <a className={styles.jobsLink}>
                        Jobs
                        {jobs > 0 ? (
                            <div className={styles.jobsBadge}>{jobs}</div>
                        ) : null}
                    </a>
                </Link>
            </li>
        </ul>
    );
};
*/

function createNewPathElement(
    pointsArray: PathPoints[],
    percentageComplete: number,
) {
    const pointsToInclude = Math.ceil(pointsArray.length * percentageComplete);
    let pathString = '';

    for (let i = 0; i < pointsToInclude; i += 1) {
        pathString += `${pointsArray[i].type}${pointsArray[i].x} ${pointsArray[i].y}`;
    }

    const pathElement = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'path',
    );

    pathElement.setAttribute('d', pathString);
    pathElement.setAttribute('id', 'temporarySVGArrowPath');
    pathElement.setAttribute('stroke', '#251657');
    pathElement.setAttribute('fill', 'none');
    pathElement.setAttribute('stroke-width', '3');
    pathElement.setAttribute('stroke-linecap', 'round');
    pathElement.setAttribute('stroke-linejoin', 'round');

    return pathElement;
}

function generatePathPoints(pathElement: SVGPathElement, pathSegments: number) {
    const pathLength = pathElement.getTotalLength();
    const startingPoint = pathElement.getPointAtLength(0);

    let pathPoints = [{ type: 'M', x: startingPoint.x, y: startingPoint.y }];

    for (
        let i = pathLength / pathSegments;
        i <= pathLength;
        i += pathLength / pathSegments
    ) {
        let p = pathElement.getPointAtLength(i);
        pathPoints.push({ type: 'L', x: p.x, y: p.y });
    }

    return pathPoints;
}

export const PageNav = ({ title, children }: PageNavProps) => {
    const PATH_SEGMENTS = 600;
    const DURATION = 1500;

    // Todo: refactor into hook
    // Todo: Test for performance benefits
    // Todo: add intersection observer
    // Todo: add delay on start and fade in on start

    useEffect(() => {
        const path = document.getElementById(
            'path',
        ) as unknown as SVGPathElement;
        const svg = document.getElementById('svgArrow');

        let start: number | undefined;
        let previousTimeStamp = 0;

        const pathPoints = generatePathPoints(path, PATH_SEGMENTS);

        function animateSVGPath(timestamp: number) {
            if (start === undefined) {
                start = timestamp;
            }
            let elapsed = timestamp - start;

            if (previousTimeStamp !== timestamp && svg) {
                const percentage = Math.min((1 / DURATION) * elapsed, 1);

                const animatedPathElement = createNewPathElement(
                    pathPoints,
                    percentage,
                );

                const oldpath = document.getElementById(
                    'temporarySVGArrowPath',
                );

                if (oldpath && oldpath.parentElement) {
                    oldpath.parentElement.removeChild(oldpath);
                }

                svg.appendChild(animatedPathElement);
            }

            if (elapsed < DURATION) {
                window.requestAnimationFrame(animateSVGPath);
            }
        }

        window.requestAnimationFrame(animateSVGPath);
    });

    return (
        <div className={styles.container}>
            <svg
                id="svgArrow"
                className={styles.svgArrowLoop}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 70 85"
                fill="none"
            >
                <path
                    fill="none"
                    id="path"
                    d="M6.6 1.8C.2 37 2.8 55.8 37.4 47 72.4 39.4 53.8 5.4 33.2 22 11 41.6 17.4 69.8 29.4 83.4M29.4 83.4 32.6 74.2M29.4 83.4 19.8 79.8"
                ></path>
            </svg>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.richText}>{children}</div>
        </div>
    );
};
export default PageNav;
