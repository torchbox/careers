export interface Image {
    description: string;
    url: string;
    width: number;
    height: number;
}

export interface LandingPage {
    title: string;
    metadataDescription: string;
    heroImage: Image;
    workForYouDescription: any;
    workForYouImage: Image;
    lifeAsATorchboxer: any;
    ctaTitle: string;
    ctaDescription: any;
}
