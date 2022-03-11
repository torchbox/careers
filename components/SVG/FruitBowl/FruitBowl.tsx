type FruitBowlProps = {
    size?: number;
    className?: string;
};

export const FruitBowl = ({ size = 208, className }: FruitBowlProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        width={size}
        height={size}
        viewBox="0 0 101.85 89.03"
        fill="none"
    >
        <g transform="rotate(-15 0.516602 66.8606) translate(5.5 8)">
            <circle cx="22.44" cy="33.04" r="16.41" fill="#3beccd" />
            <path
                fill="#2f128d"
                d="M94.36 36.32C88.88 45.91 72.77 47 72.77 47S65.54 32.57 71 23s21.62-10.71 21.62-10.71 7.22 14.45 1.74 24.03z"
            />
            <path
                fill="#251657"
                d="M46.15 31.65A27.56 27.56 0 0145.37 0a27.55 27.55 0 1030.81 41.68 27.56 27.56 0 01-30.03-10.03z"
            />
            <circle cx="58.93" cy="33.04" r="16.41" fill="#fd5765" />
            <path fill="#e6e6e6" d="M101.85 38.1A50.93 50.93 0 110 38.1z" />
        </g>
    </svg>
);

export default FruitBowl;
