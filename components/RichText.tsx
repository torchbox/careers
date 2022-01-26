import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types";
import React from "react";
import styles from "styles/RichText.module.scss";

type Theme = "LIGHT" | "DARK" | "INDIGO";

type RichTextProps = {
    theme: Theme;
    content: any;
};

const renderParagraph = (theme: Theme, children: React.ReactNode) => {
    switch (theme) {
        case "LIGHT":
            return <p className={styles.paragraphLight}>{children}</p>;
        case "DARK":
            return <p className={styles.paragraphLight}>{children}</p>;
        case "INDIGO":
            return <p className={styles.paragraphLight}>{children}</p>;
    }
};

const renderLink = (theme: Theme, children: React.ReactNode) => {
    switch (theme) {
        case "LIGHT":
            return <p className={styles.paragraphLight}>{children}</p>;
        case "DARK":
            return <p className={styles.paragraphLight}>{children}</p>;
        case "INDIGO":
            return <p className={styles.paragraphLight}>{children}</p>;
    }
};

const getRenderOptions = (theme: Theme) => {
    return {
        renderMark: {
            [MARKS.BOLD]: (text: React.ReactNode) => (
                <span className={styles.bold}>{text}</span>
            ),
            [MARKS.ITALIC]: (text: React.ReactNode) => (
                <span className={styles.italic}>{text}</span>
            ),
            [MARKS.UNDERLINE]: (text: React.ReactNode) => (
                <span className={styles.underline}>{text}</span>
            ),
        },
        renderNode: {
            // Do not delete the unused Node parameter!
            // This will cause Contentful's React Renderer to crash
            [BLOCKS.HEADING_2]: (
                node: React.ReactNode,
                children: React.ReactNode
            ) => {
                return <h2 className={styles.h2}>{children}</h2>;
            },
            [BLOCKS.HEADING_3]: (
                node: React.ReactNode,
                children: React.ReactNode
            ) => {
                return <h3 className={styles.h3}>{children}</h3>;
            },
            [BLOCKS.PARAGRAPH]: (
                node: React.ReactNode,
                children: React.ReactNode
            ) => renderParagraph(theme, children),
            // Note that TypeScript expects this function to return an object with functions that take in `React.ReactNode`s
            // In reality, JSON data is being passed into this function, hence the node.data.uri and `:any` here
            [INLINES.HYPERLINK]: (node: any, children: React.ReactNode) => (
                <a
                    className={
                        theme === "DARK"
                            ? styles.hyperlinkDark
                            : styles.hyperlink
                    }
                    href={node.data.uri}
                >
                    {children}
                </a>
            ),
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

const somejson = {
    json: {
        data: {},
        content: [
            {
                data: {},
                content: [
                    {
                        data: {},
                        marks: [],
                        value: "We’re always excited about finding new talent and meeting people that are as eager as we are to drive significant positive change.",
                        nodeType: "text",
                    },
                ],
                nodeType: "paragraph",
            },
        ],
        nodeType: "document",
    },
};
