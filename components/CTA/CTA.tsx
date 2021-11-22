import type { NextPage } from "next";
import Link from "next/Link";
import Chevron from "components/Chevron/Chevron";
import styles from "styles/CTA.module.scss";

type CTAProps = {
    title: string;
    text?: string;
    href: string;
};

const CTA: NextPage<CTAProps> = ({ title, text, href }) => {
    return (
        <Link href={href}>
            <a className={styles.link}>
                <p className={styles.title}>
                    {title} <Chevron />
                </p>
                {text ? <p className={styles.text}>{text}</p> : null}
            </a>
        </Link>
    );
};

export default CTA;
