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
import React from 'react';
import styles from './RichText.module.scss';

type Theme = 'LIGHT' | 'DARK' | 'INDIGO';

type RichTextProps = {
    theme: Theme;
    content: {
        json: Document;
    };
};

const getRenderOptions = () => {
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
                _: React.ReactNode,
                children: React.ReactNode,
            ) => {
                return <h2 className={styles.h2}>{children}</h2>;
            },
            [BLOCKS.HEADING_3]: (
                _: React.ReactNode,
                children: React.ReactNode,
            ) => {
                return <h3 className={styles.h3}>{children}</h3>;
            },
            [BLOCKS.PARAGRAPH]: (
                _: React.ReactNode,
                children: React.ReactNode,
            ) => {
                return <p className={styles.paragraph}>{children}</p>;
            },
            // Note that TypeScript expects this function to return an object with functions that take in `React.ReactNode`s
            // In reality, JSON data is being passed into this function, hence the `:any` type here
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
        },
    };
};

export const RichText = ({ theme, content }: RichTextProps) => {
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
        <div className={`${styles.container} ${themeClass}`}>
            {documentToReactComponents(content.json, getRenderOptions())}
        </div>
    );
};

export default RichText;
