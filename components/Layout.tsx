import Alert from '../components/Alert';

type LayoutProps = {
    preview: boolean;
    children: React.ReactNode;
};

export const Layout = ({ preview, children }: LayoutProps) => {
    return (
        <div>
            <Alert preview={preview} />
            <main>{children}</main>
        </div>
    );
};

export default Layout;
