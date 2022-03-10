import type { NextPage } from 'next';
import redirect from 'nextjs-redirect';

const Redirect = redirect('https://torchbox.com/404/');

const NotFound: NextPage = () => <Redirect />;

export default NotFound;
