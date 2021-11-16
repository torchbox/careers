import "styles/globals.scss";
import type { AppProps } from "next/app";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Torchbox Careers</title>
                <meta
                    name="description"
                    content="Are you a talented digital designer, UX consultant, Django engineer, search specialist or digital marketer? Then check out our jobs - we'd love to hear from you! Oxford, Bristol or remote."
                />
                <link rel="icon" href="/favicon.ico" />
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

            <header>
                <p>Header here</p>
            </header>

            <main>
                <Component {...pageProps} />
            </main>

            <footer>
                <p>Footer here</p>
            </footer>
        </>
    );
}

export default MyApp;
