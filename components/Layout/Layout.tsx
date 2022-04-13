/* eslint-disable no-console */
import { Theme } from 'types/Base';
import Alert from 'components/Alert';
import Footer from 'components/Footer';
import Header from 'components/Header';
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
                    <clipPath
                        id="topCornerClipPath"
                        clipPathUnits="objectBoundingBox"
                    >
                        <path d="M 0 0.2 L 0.2 0 L 1 0.31 L 1 1 L 0 1 Z" />
                    </clipPath>
                    <clipPath
                        id="bottomSliceClipPath"
                        clipPathUnits="objectBoundingBox"
                    >
                        <path d="M 0 0 L 1 0.85 L 1 1 L 0 1 Z" />
                    </clipPath>
                </defs>
            </svg>
            <Alert preview={preview} />
            <Header jobsAvailable={jobsAvailable} />
            {children}
            <Footer />
        </div>
    );
};

export default Layout;
