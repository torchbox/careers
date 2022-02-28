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
    const handleKeydown = (
        event: React.KeyboardEvent<HTMLParagraphElement>,
    ) => {
        if (event.key === 'Enter') {
            openShareMenu();
        }
    };

    const openShareMenu = () => {
        if (navigator.share) {
            navigator.share({
                title: title,
                url: url,
                text: description,
            });
        } else {
            window.location.href = 'mailto:?subject' + title;
        }
    };

    return (
        <div
            className={styles.container}
            onKeyDown={handleKeydown}
            onClick={openShareMenu}
            tabIndex={0}
        >
            <ShareIcon /> <p className={styles.shareLink}>{linkText}</p>
        </div>
    );
};

export default ShareLink;
