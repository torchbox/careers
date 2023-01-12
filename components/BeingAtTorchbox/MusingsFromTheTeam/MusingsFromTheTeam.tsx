import { RefObject, useRef } from 'react';
import type { BlogPost } from 'types/Base';
import Image from 'components/Image';
import { useFadeInChildren } from 'hooks/useFadeInChildren';
import styles from './MusingsFromTheTeam.module.scss';

type MusingsFromTheTeamProps = {
    postData: BlogPost[];
};

const BlogPostAuthor = ({ post }: BlogPostCardProps) => (
    <div className={styles.author}>
        <Image
            className={styles.authorPhoto}
            src={post.author.image.url}
            alt={post.author.image.description}
        />
        <div className={styles.authorDetails}>
            <p className={styles.authorName}>{post.author.name}</p>
            <p className={styles.authorMetadata}>
                <span className={styles.authorRole}>{post.author.role}</span>{' '}
                <span className={styles.authorDate}>{post.date}</span>
            </p>
        </div>
    </div>
);

type BlogPostCardProps = {
    post: BlogPost;
};

const BlogPostCard = ({ post }: BlogPostCardProps) => (
    <li className={styles.blogPost}>
        <a
            className={styles.blogPostLink}
            href={post.slug}
            aria-label={post.title}
        >
            <h3 className={styles.blogPostTitle}>{post.title}</h3>
            <BlogPostAuthor post={post} />
        </a>
    </li>
);

export const MusingsFromTheTeam = ({ postData }: MusingsFromTheTeamProps) => {
    const containerRef: RefObject<HTMLUListElement> =
        useRef<HTMLUListElement | null>(null);

    useFadeInChildren(containerRef);

    const posts = postData.map((post, index) => (
        <BlogPostCard post={post} key={`blog-post-${index}`} />
    ));

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>
                <span className={styles.titleAccent}>Musings</span>
                <br />
                from the team
            </h2>

            <ul className={styles.posts} ref={containerRef}>
                {posts}
            </ul>

            <div className={styles.link}>
                <a
                    href="https://torchbox.com/blog/"
                    className="underline-link underline-link--indigo"
                >
                    See more posts
                </a>
            </div>
        </div>
    );
};

export default MusingsFromTheTeam;
