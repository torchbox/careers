import { ShareIcon } from 'components/Icons/ShareIcon';
import styles from './ShareLink.module.scss';

type ShareLinkProps = {
    url: string;
    title: string;
    description?: string;
    linkText?: string;
};

export const ShareLink = ({
    url,
    title,
    description,
    linkText = 'Share',
}: ShareLinkProps) => {
    const openShareMenu = () => {
        if (navigator.share) {
            navigator.share({
                title: title,
                url: url,
                text: description,
            });
        } else {
            window.location.href =
                'mailto:?subject=' +
                title +
                '&body=' +
                description +
                `%0D%0A%0D%0ARead more at ` +
                url;
        }
    };

    const handleKeydown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
        if (event.key === 'Enter') {
            openShareMenu();
        }
    };

    return (
        <button
            className={styles.container}
            onKeyDown={handleKeydown}
            onClick={openShareMenu}
        >
            <ShareIcon /> <p className={styles.shareLink}>{linkText}</p>
        </button>
    );
};

export default ShareLink;
