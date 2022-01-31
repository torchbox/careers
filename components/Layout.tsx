import Alert from '../components/Alert';
import Footer from './Footer';

type LayoutProps = {
    preview: boolean;
    children: React.ReactNode;
};

export const Layout = ({ preview, children }: LayoutProps) => {
    return (
        <div>
            <Alert preview={preview} />
            <header>
                <p>Header Here</p>
            </header>
            <main>{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;
