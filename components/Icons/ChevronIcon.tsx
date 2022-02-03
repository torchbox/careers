type ChevronIconProps = {
    width?: number;
    height?: number;
    className?: string;
};

export const ChevronIcon = ({
    width = 13,
    height = 20,
    className,
}: ChevronIconProps) => (
    <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        fill="none"
        aria-hidden="true"
    >
        <path
            fill="#fff"
            fillRule="evenodd"
            d="M4.854 0L0 4.206 4.708 10 0 15.794 4.854 20l8.006-9.853.14-.122-.02-.025.02-.025-.14-.122L4.854 0z"
            clipRule="evenodd"
        />
    </svg>
);
