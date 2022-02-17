import type { Theme } from '../../types/Base';
import Alert from '../Alert';
import Footer from '../Footer';
import Header from '../Header';
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
            <div className={styles.background}>
                <Header jobsAvailable={jobsAvailable} />
                <Alert preview={preview} />
                <main className={styles.container}>{children}</main>
                <Footer />
            </div>
        </div>
    );
};

export default Layout;
