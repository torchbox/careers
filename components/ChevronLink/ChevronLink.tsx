import type { NextPage } from "next";
import Link from "next/Link";
import Chevron from "components/Chevron/Chevron";
import styles from "styles/ChevronLink.module.scss";

type ChevronLinkProps = {
    href: string;
    children: string;
};

const ChevronLink: NextPage<ChevronLinkProps> = ({ href, children }) => {
    return (
        <Link href={href}>
            <a className={styles.container}>
                {children}
                <Chevron fill="var(--color--accent)" />
            </a>
        </Link>
    );
};

export default ChevronLink;
