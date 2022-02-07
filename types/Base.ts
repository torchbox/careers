export type Theme = 'LIGHT' | 'DARK' | 'INDIGO';

// Light theme used on the EOT and Jobs page
// Indigo theme used on the landing page
// Dark theme used on the life at torchbox page

export type NavLink = {
    title: string;
    url: string;
    isCareersSiteInternalLink?: boolean;
};

export type ImageTypes = {
    description: string;
    url: string;
    width: number;
    height: number;
};
