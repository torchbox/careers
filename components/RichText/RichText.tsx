/* eslint @typescript-eslint/no-unused-vars: "off" */
import React from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import {
    BLOCKS,
    MARKS,
    INLINES,
    Block,
    Inline,
    Hyperlink,
    Document,
} from '@contentful/rich-text-types';
import Image from 'components/Image';
import Quote from 'components/Quote';
import YouTubeEmbed from 'components/YouTubeEmbed';
import { ImageTypes } from 'types/Base';
import styles from './RichText.module.scss';

type Theme = 'LIGHT' | 'DARK' | 'INDIGO';

type RichTextProps = {
    theme: Theme;
    className?: string;
    content: {
        json: Document;
        links?: any;
    };
};

const getRenderOptions = (links?: any) => {
    return {
        renderMark: {
            [MARKS.BOLD]: (text: React.ReactNode) => (
                <strong className={styles.bold}>{text}</strong>
            ),
            [MARKS.ITALIC]: (text: React.ReactNode) => (
                <em className={styles.italic}>{text}</em>
            ),
            [MARKS.UNDERLINE]: (text: React.ReactNode) => (
                <u className={styles.underline}>{text}</u>
            ),
        },
        renderNode: {
            [BLOCKS.HEADING_2]: (
                _: Block | Inline,
                children: React.ReactNode,
            ) => {
                return <h2 className={styles.h2}>{children}</h2>;
            },
            [BLOCKS.HEADING_3]: (
                _: Block | Inline,
                children: React.ReactNode,
            ) => {
                return <h3 className={styles.h3}>{children}</h3>;
            },
            [BLOCKS.PARAGRAPH]: (
                _: Block | Inline,
                children: React.ReactNode,
            ) => {
                return <p className={styles.paragraph}>{children}</p>;
            },
            [BLOCKS.UL_LIST]: (
                _: Block | Inline,
                children: React.ReactNode,
            ) => {
                return <ul className={styles.unorderedList}>{children}</ul>;
            },
            [INLINES.HYPERLINK]: (
                node: Block | Inline,
                children: React.ReactNode,
            ) => {
                return (
                    <a
                        className={styles.hyperlink}
                        href={(node as Hyperlink).data.uri}
                    >
                        {children}
                    </a>
                );
            },
            [BLOCKS.EMBEDDED_ENTRY]: (
                node: Block | Inline,
                _: React.ReactNode,
            ) => {
                try {
                    if (links) {
                        const entryMap = new Map();
                        for (const entry of links.entries.block) {
                            entryMap.set(entry.sys.id, entry);
                        }

                        const entry = entryMap.get(node.data.target.sys.id);

                        if (entry.__typename === 'Quote') {
                            return (
                                <Quote name={entry.name} position={entry.role}>
                                    {entry.quote}
                                </Quote>
                            );
                        }

                        if (entry.__typename === 'YouTubeEmbed') {
                            return (
                                <YouTubeEmbed
                                    url={entry.videoUrl}
                                    title={entry.videoTitle}
                                />
                            );
                        }
                    }
                } catch {
                    // Error catching added to prevent draft or unpublished image embeds from breaking the site during the build process.
                    // An unpublished image embed can appear to have been added to the page in Contentful while not being a published asset,
                    // causing confusion to editors when the image doesn't appear or the build process doesn't deploy
                    return <p>Embedded item not yet published.</p>;
                }

                return <p>Embedded content not found.</p>;
            },
            [BLOCKS.EMBEDDED_ASSET]: (
                node: Block | Inline,
                _: React.ReactNode,
            ) => {
                try {
                    if (links) {
                        const assetMap = new Map();
                        for (const asset of links.assets.block) {
                            assetMap.set(asset.sys.id, asset);
                        }

                        const asset = assetMap.get(node.data.target.sys.id);
                        const { url, width, height, description } =
                            asset as ImageTypes;

                        return (
                            <Image
                                className={styles.image}
                                src={url}
                                width={width}
                                height={height}
                                alt={description}
                            />
                        );
                    }
                } catch {
                    return <p>Embedded item not yet published.</p>;
                }

                return <p>Embedded image not found.</p>;
            },
        },
    };
};

const RichText = ({ theme, content, className = '' }: RichTextProps) => {
    let themeClass = 'themeLight';
    switch (theme) {
        case 'LIGHT':
            themeClass = 'themeLight';
            break;
        case 'INDIGO':
            themeClass = 'themeIndigo';
            break;
        case 'DARK':
            themeClass = 'themeDark';
            break;
    }

    return (
        <div className={`${themeClass} ${className}`}>
            {documentToReactComponents(
                content.json,
                getRenderOptions(content.links),
            )}
        </div>
    );
};

export default RichText;
