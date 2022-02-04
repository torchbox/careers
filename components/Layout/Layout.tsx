import Alert from '../Alert';
import Footer from '../Footer';
import Header from '../Header';
import { Theme } from '../../types/Base';

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
            <Header jobsAvailable={jobsAvailable} />
            <Alert preview={preview} />
            <main>{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;
