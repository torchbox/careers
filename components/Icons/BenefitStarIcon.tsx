type BenefitStarIconProps = {
    width?: number;
    height?: number;
    className?: string;
};

export const BenefitStarIcon = ({
    width = 41,
    height = 41,
    className,
}: BenefitStarIconProps) => (
    <svg
        className={className}
        width={width}
        height={height}
        viewBox="0 0 41 41"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <circle
            cx="20.5"
            cy="20.5"
            r="19.5"
            fill="#FD5765"
            stroke="#FD5765"
            strokeWidth="2"
        />
        <circle cx="20.5" cy="20.5" r="17.5" stroke="#fff" strokeWidth="2" />
        <path
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            d="M18.023 32.262c.593-6.388 1.263-12.74 3.22-18.727.205-.626 1.89-5.792 1.991-3.576.315 6.943 1.365 13.623 3.511 20.079.613 1.842-.96-.475-1.476-.873-4.365-3.378-9.247-5.646-13.978-8.055-.312-.158-7.464-3.04-4.54-3.04 5.606 0 11.212-.027 16.819 0 3.614.016 13.97-.677 10.78 1.463-5.348 3.588-11.569 5.526-16.372 10.364-1.131 1.14-1.157 1.458.045 2.365Z"
        />
    </svg>
);
