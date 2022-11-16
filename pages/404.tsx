export default function NotFound() {}

export async function getStaticProps() {
    return {
        redirect: {
            destination: 'https://torchbox.com/404/',
        },
    };
}
