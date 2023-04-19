import { Window } from 'happy-dom';

export interface JobPost {
    title: string;
    description: string;
    link: string;
    jobURL: string;
    vacancyDescription: string;
    department: string;
    salaryRange: string;
    city: string;
    slug: string;
}

export interface JobSummary {
    title: string;
    description: string;
    department: string;
    city: string;
    slug: string;
}

// Style rules to pass down through the DOM tree
interface RecursiveStyling {
    bold: boolean;
    italic: boolean;
}

const Node: {
    ELEMENT_NODE: number;
    TEXT_NODE: number;
} = {
    ELEMENT_NODE: 1,
    TEXT_NODE: 3,
};

const ALLOWLIST = [
    'H2',
    'H3',
    'H4',
    'H5',
    'P',
    'LI',
    'UL',
    'A',
    'FONT',
    'DIV',
    'SPAN',
] as const;

type ALLOWLIST = typeof ALLOWLIST[number];

/**
 * This function removes *most* empty elements recursively.
 * It won't identify improperly formatted tag syntax, i.e. <p>'s without </p> endings
 * @param element
 */
function recursivelyRemoveEmptyElements(element: Element) {
    const elements = element.querySelectorAll('*');

    const removeList = [];

    for (let i = 0; i < elements.length; i += 1) {
        if (elements[i].innerHTML === '') {
            removeList.push(elements[i]);
        }
    }

    removeList.forEach((element) => {
        const { parentNode } = element;
        element.remove();
        if (parentNode !== null)
            recursivelyRemoveEmptyElements(parentNode as Element);
    });
}

export function removeAllElementsNotInAllowlist(
    document: any,
    element: Element,
) {
    const elements = element.querySelectorAll('*');
    const removeList = [];

    for (let i = 0; i < elements.length; i += 1) {
        if (ALLOWLIST.includes(elements[i].tagName as ALLOWLIST) === false) {
            if (['B', 'STRONG', 'EM', 'I'].includes(elements[i].tagName)) {
                // Replace all the styling elements with spans
                // I've chosen to replace these styling elements for better code consistency
                // e.g. this means all bold rich text can be styled using only one rule
                const newSpan = document.createElement('SPAN');
                newSpan.innerHTML = elements[i].innerHTML;
                elements[i].parentElement?.replaceChild(newSpan, elements[i]);
            } else {
                removeList.push(elements[i]);
            }
        }
    }

    removeList.forEach((element) => {
        element.remove();
    });

    return element;
}

/**
 * Updates bold and italic fields in childStyles if this element has bold / italic signifiers
 * @param element
 * @param childStyles
 * @returns updated style rules for the child element
 */
function setChildStylesDependingOnElement(
    element: Element,
    childStyles: RecursiveStyling,
) {
    if (element.tagName === 'B' || element.tagName === 'STRONG') {
        childStyles.bold = true;
    }

    if (element.tagName === 'I' || element.tagName === 'EM') {
        childStyles.italic = true;
    }

    if (element.hasAttribute('style')) {
        const style = element.getAttribute('style');
        if (style !== null) {
            if (style.match(/font-weight:\s*bold|font-weight:\s*700;/g)) {
                childStyles.bold = true;
            }
            if (style.match(/font-style:\s*italic;/g)) {
                childStyles.italic = true;
            }
        }
    }

    return childStyles;
}

/**
 * Removes unnecessary attributes from a generic element
 * Adds target blank and rel attributes to link elements
 * @param element
 * @returns processed element
 */
export function removeUnnecessaryElementAttributes(element: Element) {
    const attributeNameList = [];

    for (let i = 0; i < element.attributes.length; i += 1) {
        attributeNameList.push(element.attributes[i].name);
    }

    if (element.tagName === 'A') {
        attributeNameList.forEach((name) => {
            if (name !== 'href') element.removeAttribute(name);
        });

        element.setAttribute('rel', 'noreferrer noopener');
        element.setAttribute('target', '_blank');
    } else {
        attributeNameList.forEach((name) => {
            element.removeAttribute(name);
        });
    }

    return element;
}

/**
 * Traverses the DOM to remove inline styles and style effecting tags such as <b>, <em>, ...
 * It then styles the child text nodes of these elements using a <span> with class rules
 * @param document - used to create new span elements
 * @param element - to be processed, can include multiple children
 * @param childStyles - whether this element is to be formatted with bold / italic
 * @returns processed element
 */
function recursivelyReplaceFontStyling(
    document: any,
    element: any,
    childStyles: RecursiveStyling,
) {
    let styles = childStyles;
    // Check if this element has bold or italic modifiers to pass on to its children
    styles = setChildStylesDependingOnElement(element, childStyles);

    // Remove all the style rules and unnecessary attributes from this element
    element = removeUnnecessaryElementAttributes(element);

    for (let i = 0; i < element.childNodes.length; i += 1) {
        // Recursively call this function on child elements
        // to propagate the style changes throughout the DOM tree
        if (element.childNodes[i].nodeType === Node.ELEMENT_NODE) {
            // Create unique styles object for each element
            // or else elements will refer to another elements styles
            const newChildStyles = {
                bold: styles.bold,
                italic: styles.italic,
            };

            const resultElement = recursivelyReplaceFontStyling(
                document,
                element.childNodes[i] as Element,
                newChildStyles,
            );

            if (resultElement !== null) {
                element.childNodes[i] = resultElement as ChildNode;
            }
        } else {
            // Apply the inherited styles to a child text node by wrapping
            // the node in a <span> with the appropriate classes
            if (element.childNodes[i].nodeType === Node.TEXT_NODE) {
                if (styles.bold || styles.italic) {
                    const newElement = document.createElement('SPAN');
                    newElement.innerHTML = element.innerHTML;

                    if (styles.bold) {
                        newElement.classList.add('rich-text--bold');
                    }

                    if (styles.italic) {
                        newElement.classList.add('rich-text--italic');
                    }

                    element.childNodes[i] = newElement as ChildNode;
                }
            }
        }
    }

    return element;
}

/**
 * Removes clutter and unneeded styles from the PeopleHR description
 * @param text - raw description HTML from PeopleHR
 * @returns clean HTML for rendering
 */
export function processPeopleHRDescription(text: string) {
    const window = new Window();
    const { document } = window;

    // Remove any zero-width spaces from the description
    let newText = text.replace(/\u200B/g, '');

    document.body.innerHTML = newText;

    let newBody = recursivelyReplaceFontStyling(document, document.body, {
        bold: false,
        italic: false,
    });

    recursivelyRemoveEmptyElements(newBody);
    removeAllElementsNotInAllowlist(document, newBody);

    return newBody.innerHTML;
}

function invalidValue(value: any) {
    if (value === '') return true;
    if (!value) return true;
    return false;
}

function jobPostingJSONIsValid(json: any) {
    const requiredProperties = [
        'title',
        'description',
        'link',
        'JobURL',
        'vacancydescription',
        'city',
        'department',
    ];

    for (let i = 0; i < requiredProperties.length; i += 1) {
        if (!json.hasOwnProperty(requiredProperties[i])) return false;
        if (invalidValue(json[requiredProperties[i]][0])) return false;
    }

    return true;
}

/**
 * convertTitleToSlug
 * @param title of the job posting
 * @returns a formatted slug
 */
export function convertTitleToSlug(title: string): string {
    let newTitle = title.toLowerCase();
    newTitle = newTitle.replace(/[^a-zA-Z0-9]+/g, '-');
    return newTitle;
}

/**
 * Bridge between messy JSON and clearly typed data.
 * @param json the JSON for a single job post
 * @returns JobPost if valid, otherwise returns undefined
 */
export function createJobPostFromJSON(json: any) {
    const slug: string = convertTitleToSlug(json.title[0]);

    if (jobPostingJSONIsValid(json)) {
        const job: JobPost = {
            title: json.title[0],
            description: processPeopleHRDescription(json.description[0]),
            link: json.link[0],
            jobURL: json.JobURL[0],
            vacancyDescription: json.vacancydescription[0],
            department: json.department[0],
            salaryRange: json.salaryrange ? json.salaryrange[0] : null,
            city: json.city[0],
            slug: slug,
        };

        return job;
    }

    return undefined;
}

export function createJobSummaryFromPost(post: JobPost): JobSummary {
    return {
        title: post.title,
        description: post.vacancyDescription,
        city: post.city,
        department: post.department,
        slug: post.slug,
    };
}

/**
 * Converts only valid job JSON into posts
 * @param json RSS feed JSON for all job posts
 * @returns Array of JobPost
 */
export function convertJSONToJobPosts(json: any): JobPost[] {
    const jobPostingsJSON = json.rss.channel[0].item;

    const jobPosts: JobPost[] = [];

    for (let i = 0; i < jobPostingsJSON.length; i += 1) {
        const job: JobPost | undefined = createJobPostFromJSON(
            jobPostingsJSON[i],
        );
        if (job) {
            jobPosts.push(job);
        }
    }

    return jobPosts;
}
