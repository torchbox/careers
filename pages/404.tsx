import type { NextPage } from 'next';

const NotFound: NextPage = () => {
    if (typeof window !== 'undefined')
        window.location.href = 'https://torchbox.com/404/';
    return null;
};

export default NotFound;
