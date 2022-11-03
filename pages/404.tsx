export default function NotFound() {
    if (typeof window !== 'undefined') {
        window.location.href = 'https://torchbox.com/404/';
    }
}
