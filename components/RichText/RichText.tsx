import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types';
import React from 'react';
import styles from './RichText.module.scss';

type Theme = 'LIGHT' | 'DARK' | 'INDIGO';

type RichTextProps = {
    theme: Theme;
    content: any;
};

const renderParagraph = (theme: Theme, children: React.ReactNode) => {
    switch (theme) {
        case 'LIGHT':
            return <p className={styles.paragraphLight}>{children}</p>;
        case 'DARK':
            return <p className={styles.paragraphDark}>{children}</p>;
        case 'INDIGO':
            return <p className={styles.paragraphIndigo}>{children}</p>;
    }
};

const renderLink = (theme: Theme, node: any, children: React.ReactNode) => {
    switch (theme) {
        case 'LIGHT':
            return (
                <a className={styles.hyperlink} href={node.data.uri}>
                    {children}
                </a>
            );
        case 'DARK':
            return (
                <a className={styles.hyperlinkDark} href={node.data.uri}>
                    {children}
                </a>
            );
        case 'INDIGO':
            return (
                <a className={styles.hyperlink} href={node.data.uri}>
                    {children}
                </a>
            );
    }
};

const getRenderOptions = (theme: Theme) => {
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
            // Do not delete the unused Node parameter as this will cause Contentful's React Renderer to crash
            // If only `children` is passed, it attempts to render an object as JSX
            [BLOCKS.HEADING_2]: (
                node: React.ReactNode,
                children: React.ReactNode,
            ) => {
                return <h2 className={styles.h2}>{children}</h2>;
            },
            [BLOCKS.HEADING_3]: (
                node: React.ReactNode,
                children: React.ReactNode,
            ) => {
                return <h3 className={styles.h3}>{children}</h3>;
            },
            [BLOCKS.PARAGRAPH]: (
                node: React.ReactNode,
                children: React.ReactNode,
            ) => renderParagraph(theme, children),
            // Note that TypeScript expects this function to return an object with functions that take in `React.ReactNode`s
            // In reality, JSON data is being passed into this function, hence the `:any` type here
            [INLINES.HYPERLINK]: (node: any, children: React.ReactNode) =>
                renderLink(theme, node, children),
        },
    };
};

export const RichText = ({ theme, content }: RichTextProps) => {
    return (
        <div className={styles.container}>
            {documentToReactComponents(content.json, getRenderOptions(theme))}
        </div>
    );
};

export default RichText;
