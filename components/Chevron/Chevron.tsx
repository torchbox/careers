import type { NextPage } from "next";

type ChevronProps = {
    fill?: string;
    width?: string;
    height?: string;
};

const Chevron: NextPage<ChevronProps> = ({ fill, width, height }) => {
    return (
        <svg
            fill={fill ? fill : "var(--color--primary)"}
            viewBox="0 0 104 152"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            width={width ? width : "16px"}
            height={height ? height : "16px"}
        >
            <path d="M20.4 15C10.6 23.3 2.1 30.6 1.6 31.3c-.6 1 4.2 7.4 16.8 22.4C28.1 65.3 36 75 36 75.4c0 .4-8.1 10.3-18 22.1-9.9 11.7-18 21.8-18 22.3 0 1.3 36 31.4 38 31.8.9.2 9.6-9.4 24-26.7C74.4 110 88.8 92.8 94 86.6l9.6-11.1L72 37.8C54.7 17.1 40 .1 39.4 0c-.5 0-9.1 6.8-19 15z" />
        </svg>
    );
};

export default Chevron;
