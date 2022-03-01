type ChevronIconProps = {
    width?: number;
    height?: number;
    size?: number;
    className?: string;
};

export const ChevronIcon = ({ size = 20, className }: ChevronIconProps) => (
    <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        aria-hidden="true"
    >
        <path
            fill="#fff"
            fillRule="evenodd"
            d="M 20.05 0 
            L 8.4 10.094 
            L 19.699 24 
            L 8.4 37.906
            L 20.05 48
            l 19.214 -23.647
            l 0.336 -0.293
            l -0.048 -0.06
            l 0.048 -0.06
            l -0.336 -0.293
            L 20.05 0
            z"
            clipRule="evenodd"
        />
    </svg>
);
