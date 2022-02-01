import Alert from '../components/Alert';
import Header from './Header';
import { Theme } from '../types/Base';

type LayoutProps = {
    theme: Theme;
    preview: boolean;
    children: React.ReactNode;
};

export const Layout = ({ theme, preview, children }: LayoutProps) => {
    return (
        <div>
            <Header theme={theme} />
            <Alert preview={preview} />
            <main>{children}</main>
        </div>
    );
};

export default Layout;
