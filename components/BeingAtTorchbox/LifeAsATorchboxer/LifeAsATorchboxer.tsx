import ArrowLoopLeft from 'components/SVG/ArrowLoop/ArrowLoopLeft';
import Link from 'next/link';
import urls from 'lib/urls';
import styles from './LifeAsATorchboxer.module.scss';

type LifeAsATorchboxerProps = {
    children: React.ReactNode;
};

export const LifeAsATorchboxer = ({ children }: LifeAsATorchboxerProps) => (
    <div className={styles.container}>
        <div className={styles.textContainer}>
            <h2 className={styles.title}>
                <span className={styles.titleAccent}>Life as a</span>
                <br />
                Torchbox&shy;er
            </h2>
            <div className={styles.richText}>{children}</div>
            <div className={styles.links}>
                <Link href={urls.lifeAtTorchbox}>
                    <a className="underline-link underline-link--indigo">
                        About us
                    </a>
                </Link>
                <a
                    href="https://torchbox.com/team/"
                    className="underline-link underline-link--indigo"
                >
                    Meet the team
                </a>
            </div>
        </div>
        <ArrowLoopLeft className={styles.image} />
    </div>
);

export default LifeAsATorchboxer;
