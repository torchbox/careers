import type { NextPage } from "next";
import Image from "next/image";
import styles from "styles/ClientBlock.module.scss";

interface ClientLogo {
    imageUrl: string;
    alt: string;
}

type ClientBlockProps = {
    title?: string;
    text?: string;
    logos: ClientLogo[];
};

const ClientBlock: NextPage<ClientBlockProps> = ({ title, text, logos }) => {
    return (
        <div className={styles.clientBlock}>
            {title ? (
                <h2 className={styles.clientBlockTitle}>{title}</h2>
            ) : null}
            {text ? <p className={styles.clientBlockText}>{text}</p> : null}
            <div className={styles.clientBlockLogos}>
                {logos.map((logo, index) => (
                    <Image
                        key={index}
                        src={logo.imageUrl}
                        alt={logo.alt}
                        width="150"
                        height="80"
                        layout="responsive"
                    />
                ))}
            </div>
        </div>
    );
};

export default ClientBlock;
