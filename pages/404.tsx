import { useRouter } from 'next/router';

export default function NotFound() {
    const router = useRouter();

    if (typeof window !== 'undefined') {
        router.push('https://torchbox.com/404/');
    }
}
