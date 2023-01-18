type ArrowLoopLeftProps = {
    size?: number;
    className?: string;
};

export const ArrowLoopLeft = ({
    size = 217,
    className,
}: ArrowLoopLeftProps) => (
    <svg
        className={className}
        width={size}
        height={size}
        viewBox="0 0 171 217"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3.5"
        stroke="#251657"
    >
        <path
            pathLength="1"
            stroke="#251657"
            d="M169.491 38.0196C95 140-28 71 5.484 9.235 9.693 1.621 12.69 1.776 17.621 2.872 51 8 123 124 55 214"
        />
        <path
            pathLength="1"
            stroke="#251657"
            d="M52.8 197.184 54.084 214.904 70.378 213.0"
        />
    </svg>
);

export default ArrowLoopLeft;
