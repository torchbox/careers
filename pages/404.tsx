import { useRouter } from 'next/router';

// Redirect solution with useRouter following this GitHub discussion
// https://github.com/vercel/next.js/discussions/13813
export default function NotFound() {
    const router = useRouter();

    if (typeof window !== 'undefined') {
        router.push('https://torchbox.com/404/');
    }
}
