type ArrowLoopRightProps = {
    className?: string;
    width?: number;
    height?: number;
};

export const ArrowLoopRight = ({
    className = '',
    width = 95,
    height = 123,
}: ArrowLoopRightProps): React.ReactElement => (
    <svg
        className={className}
        width={width}
        height={height}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 70 85"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.6"
        stroke="#251657"
    >
        <path
            pathLength="1"
            d="M6.6 1.8C.2 37 2.8 55.8 37.4 47 72.4 39.4 53.8 5.4 33.2 22 11 41.6 17.4 69.8 29.4 83.4"
        ></path>
        <path pathLength="1" d="M18.8 79.8 29.4 83.4 32.3 73.9"></path>
    </svg>
);
