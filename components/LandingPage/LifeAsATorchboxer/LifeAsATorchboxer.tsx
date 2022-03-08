import Link from 'next/link';
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
                Torchboxer
            </h2>
            <div className={styles.richText}>{children}</div>
            <div className={styles.links}>
                <Link href="/life-at-torchbox">
                    <a className="underline-link underline-link--dark-indigo">
                        Life at Torchbox
                    </a>
                </Link>
                <a
                    href="https://torchbox.com/team/"
                    className="underline-link underline-link--dark-indigo"
                >
                    Meet the team
                </a>
            </div>
        </div>
        <div className={styles.image}>
            <img src="images/arrow-loop-left.svg" alt="" />
        </div>
    </div>
);

export default LifeAsATorchboxer;
