import 'styles/globals.scss';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';

function MyApp({ Component, pageProps }: AppProps) {
    Router.events.on('routeChangeComplete', (url) => {
        // Scroll to the hashtag if the user is going back after visiting an anchor
        if (!url.includes('#')) {
            // Otherwise track the page instantly to the top of the new page.
            window.scroll({
                top: 0,
                left: 0,
            });
        }
    });

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

            <main>
                <Component {...pageProps} />
            </main>
        </>
    );
}

export default MyApp;
