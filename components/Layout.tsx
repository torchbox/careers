import Alert from "../components/Alert";

interface LayoutProps {
    preview: boolean;
    children: JSX.Element;
}

export const Layout: React.FC<LayoutProps> = ({ preview, children }) => {
    return (
        <>
            <div>
                <Alert preview={preview} />
                <main>{children}</main>
            </div>
        </>
    );
};

export default Layout;
