const PROXY_FROM_URL = '/careers';
const PROXY_TO = 'tbx-careers.vercel.app';

async function handleRequest(request) {
    let url = new URL(request.url);

    if (url.pathname.startsWith(PROXY_FROM_URL)) {
        // The next site is already running under /careers, so no path update needed
        url.hostname = PROXY_TO;
    }

    const newRequest = new Request(url, request.clone());

    return await fetch(newRequest);
}

addEventListener('fetch', (event) => {
    event.respondWith(handleRequest(event.request));
});
