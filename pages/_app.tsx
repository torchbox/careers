import '../styles/globals.css';
import type { AppProps } from "next/app";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <link
                    rel="preload"
                    href="/fonts/apercu/apercu-light-pro.woff2"
                    as="font"
                    crossOrigin=""
                />
                <link
                    rel="preload"
                    href="/fonts/apercu/apercu-regular-pro.woff2"
                    as="font"
                    crossOrigin=""
                />
                <link
                    rel="preload"
                    href="/fonts/apercu/apercu-bold-pro.woff2"
                    as="font"
                    crossOrigin=""
                />
                <link
                    rel="preload"
                    href="/fonts/apercu/apercu-black-pro.woff2"
                    as="font"
                    crossOrigin=""
                />
            </Head>

            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
