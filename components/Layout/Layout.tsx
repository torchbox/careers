import Alert from '../Alert';
import Footer from '../Footer';
import Header from '../Header';
import { Theme } from '../../types/Base';
import styles from './Layout.module.scss';

type LayoutProps = {
    theme: Theme;
    jobsAvailable: number;
    preview: boolean;
    children: React.ReactNode;
};

export const Layout = ({
    theme,
    jobsAvailable,
    preview,
    children,
}: LayoutProps) => {
    let themeClass = 'themeLight';

    switch (theme) {
        case 'DARK':
            themeClass = 'themeDark';
            break;
        case 'INDIGO':
            themeClass = 'themeIndigo';
            break;
    }

    return (
        <div className={themeClass}>
            <svg className={styles.svg}>
                <defs>
                    <clipPath
                        id="testimonialClipPath"
                        clipPathUnits="objectBoundingBox"
                    >
                        <path d="M 0.436 -0.001 L 0.937 0.258 L 0.572 0.997 L 0.062 0.746 Z" />
                    </clipPath>
                </defs>
            </svg>
            <Alert preview={preview} />
            <Header jobsAvailable={jobsAvailable} />
            <div className={styles.container}>{children}</div>
            <Footer />
        </div>
    );
};

export default Layout;
