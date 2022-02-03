type LocationIconProps = {
    width?: number;
    height?: number;
    className?: string;
};

export const LocationIcon = ({
    width = 32,
    height = 33,
    className,
}: LocationIconProps) => (
    <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        fill="none"
        aria-hidden="true"
        viewBox="9.62 5 19.45 28.79"
    >
        <path
            stroke="#FD5765"
            strokeLinecap="round"
            strokeWidth="2"
            d="M11.813 29.699c2.468-.12 4.824-1.084 6.924-2.336 3.386-2.017 6.95-4.27 8.826-7.864 3.022-5.791-1.319-9.039-5.805-11.819"
        />
        <path
            stroke="#FD5765"
            strokeLinecap="round"
            strokeWidth="2"
            d="M11.757 29.686c-1.215-2.4-1.621-5.075-1.636-7.637-.023-4.132.067-8.54 2.252-11.95 3.521-5.494 8.729-2.84 13.6.165"
        />
        <circle
            cx="19.332"
            cy="16.413"
            r="4.022"
            stroke="#FD5765"
            strokeLinecap="round"
            strokeWidth="2"
            transform="rotate(12.265 19.332 16.413)"
        ></circle>
    </svg>
);
