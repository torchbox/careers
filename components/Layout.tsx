import Alert from '../components/Alert';
import Header from './Header';
import { Theme } from '../types/Base';

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
    return (
        <div>
            <Header theme={theme} jobsAvailable={jobsAvailable} />
            <Alert preview={preview} />
            <main>{children}</main>
        </div>
    );
};

export default Layout;
