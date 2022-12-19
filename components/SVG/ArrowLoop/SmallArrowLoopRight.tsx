import { useArrowAnimation } from 'hooks/useArrowAnimation';
import { RefObject, useRef } from 'react';
import styles from './ArrowLoop.module.scss';

type SmallArrowLoopRightProps = {
    className?: string;
};

export const SmallArrowLoopRight = ({
    className = '',
}: SmallArrowLoopRightProps): React.ReactElement => {
    const svgRef: RefObject<SVGSVGElement> = useRef<SVGSVGElement | null>(null);
    useArrowAnimation(svgRef);

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            width="97"
            height="129"
            viewBox="0 0 97 129"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3.5"
            stroke="#251657"
            ref={svgRef}
        >
            <path
                className={styles.svgArrowLoopPath}
                pathLength="1"
                d="M94.339 33.6C36.286 87.902-6.275 32.947 3.672 11.748 5.139 8.324 10.473 2.681 15.25 6.204 38.868 23.967 54.746 91.889 18.022 123.778"
            />

            <path
                className={styles.svgArrowLoopPath}
                pathLength="1"
                d="M18.837 107.144 17.532 124.267 34.818 126.387"
            />
        </svg>
    );
};
