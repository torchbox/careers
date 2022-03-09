import Alert from '../Alert';
import Footer from '../Footer';
import Header from '../Header';
import { Theme } from '../../types/Base';
import styles from './Layout.module.scss';
import { useEffect } from 'react';

type LayoutProps = {
    theme: Theme;
    jobsAvailable: number;
    preview: boolean;
    children: React.ReactNode;
};

export const Layout = ({
    theme,
    jobsAvailable,
    preview,
    children,
}: LayoutProps) => {
    let themeClass = 'themeLight';

    switch (theme) {
        case 'DARK':
            themeClass = 'themeDark';
            break;
        case 'INDIGO':
            themeClass = 'themeIndigo';
            break;
    }

    useEffect(() => {
        const IMAGE_HEIGHT = 200;
        const backgroundString = `background: url("data:image/svg+xml,%3Csvg viewBox='0 0 183.06 63.675' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='translate(-5.3019 -18.267)'%3E%3Cg transform='matrix(.11111 0 0 .11111 5.6574 17.624)'%3E%3Cpath class='st5' d='m273 107.38-0.44 240c-113.49-0.26-205.3-92.38-205.09-205.88l0.07-38.15' fill='%232f128d'/%3E%3Cpath d='m-3.2 169.29a128.51 128.51 0 0 1 128.6 128.42 128.51 128.51 0 0 1-128.4 128.6z' fill='%23251657'/%3E%3Cpath d='m695.59 222.77-65.84-16.15 16.1-66.02 65.84 16.14zm-204.17-114.69-65.18 18.62-18.57-65.37 65.18-18.62zm118.61 302.79-65.18 18.62-18.57-65.36 65.18-18.62z' fill='%232f128d'/%3E%3Cpath d='m439.9 168.09h67.78v67.97h-67.78zm6.506 153.88 7.54-67.54 67.362 7.52-7.54 67.54zm87.3-199.43 67.45-6.673 6.692 67.64-67.45 6.672zm5.684 114.5 65.18-18.62 18.58 65.36-65.19 18.63z' fill='%23fd5765'/%3E%3Cpath d='m303 431.9h47.6a47.87 47.87 0 0 1-47.6 47.87h-0.32a34.7 34.7 0 0 1 0.26-69.4z' fill='%23e6e6e6'/%3E%3Cpath d='m302.42 364.91h67.27v67.46h-67.27z' fill='%232f128d'/%3E%3Ccircle class='st5' cx='170.04' cy='108.47' r='102.68' fill='%232f128d'/%3E%3Cg fill='%23e6e6e6'%3E%3Crect transform='rotate(30 161.27 140.83)' x='95.63' y='41.29' width='131.26' height='199.05' rx='53.13'/%3E%3Crect transform='rotate(30,99.01,182.61)' x='66.4' y='98.23' width='65.22' height='168.76' rx='32.61'/%3E%3Cpath d='m122.74 88.52a27.32 27.32 0 0 0-27.32 47.31z'/%3E%3C/g%3E%3Ccircle cx='155.85' cy='118' r='7.54' fill='%23251657'/%3E%3Ccircle cx='203.5' cy='145.51' r='7.54' fill='%23251657'/%3E%3Cpath d='m127.41 179.18a20.13 20.13 0 1 0 34.86 20.13z' fill='%23fff'/%3E%3Cpath d='m172.93 183.4-18.36-10.6 16.71-28.95z' fill='%23fd5765'/%3E%3Cpath class='st5' d='m222.77 53.54a80.66 80.66 0 0 1-110.18 29.52s13.17-49.6 59-59.08' fill='%232f128d'/%3E%3Cpath class='st5' d='m221.1 54.92a60.11 60.11 0 0 0 22 82.11l17.41-59.36z' fill='%232f128d'/%3E%3C/g%3E%3Cg transform='matrix(.26458 0 0 .26458 109.73 23.205)'%3E%3Cpath d='m297.2 222c0-38.1-30.8-69-68.9-69.1s-69 30.8-69.1 68.9z' fill='%233beccd'/%3E%3Cpath d='m35.7 109.8h3.9v38h-3.9z' fill='%23231749'/%3E%3Cpath class='st2' d='m73.9 221.8 0.3-43.6 30.4 0.2-0.3 43.6z'/%3E%3Cpath class='st2' d='m104.5 211.4c-6.8-0.1-12.4-5.7-12.3-12.5 0.1-6.9 5.7-12.4 12.5-12.3s12.3 5.6 12.3 12.4c-0.1 6.9-5.7 12.4-12.5 12.4z'/%3E%3Cpath class='st3' d='m37.7 128.6c-14.6 0-26.4 11.8-26.4 26.4h4.1v8.6c-8.8 1.9-15.4 9.7-15.4 19s6.6 17.1 15.4 19.1v20.3h44.6v-67.1h4c0-14.5-11.8-26.3-26.3-26.3zm-33.5 54c0-7 4.7-12.9 11.1-14.7v29.4c-6.4-1.8-11.1-7.7-11.1-14.7z'/%3E%3Ccircle class='st3' cx='37.7' cy='106.5' r='6.7'/%3E%3Ccircle class='st5' cx='232.6' cy='50.1' r='19.5'/%3E%3Cpath class='st5' d='m226.3 90.2c14.2 0 25.7-11.5 25.7-25.8h-25.7z'/%3E%3Cpath class='st4' d='m205.3 141h12.3c14.4 0 26.1-11.7 26.1-26.1v-45.7c0-14.4-11.7-26.1-26.1-26.1h-12.3c-14.4 0-26.1 11.7-26.1 26.1v45.7c-0.1 14.4 11.6 26.1 26.1 26.1z'/%3E%3Cpath class='st4' d='m227.7 172.5c8.9 0 16-7.2 16-16v-50.9c0-8.9-7.2-16-16-16-8.9 0-16 7.2-16 16v50.9c-0.1 8.8 7.1 16 16 16z'/%3E%3Cpath class='st4' d='m240.7 77.6c7.4 0 13.4 6 13.4 13.4s-6 13.4-13.4 13.4z'/%3E%3Ccircle class='st3' cx='219.3' cy='81.9' r='3.7'/%3E%3Ccircle class='st3' cx='192.3' cy='81.9' r='3.7'/%3E%3Cpath class='st5' d='m243.7 118.7c0 17.8-14.5 32.3-32.3 32.3s-32.3-14.5-32.3-32.3z'/%3E%3Cpath d='m196 107.4h10.4v-16.5z' fill='%23fd5765'/%3E%3Cpath class='st5' d='m179.2 112h64.6v8.2h-64.6zm11-46.4h61.8v-16.7l-61.8-12z'/%3E%3Cpath d='m211.1 120.2c0 4.5-3.7 8.2-8.2 8.2s-8.2-3.7-8.2-8.2z' fill='%23fff'/%3E%3Cpath class='st2' d='m165.7 40c0 13.6 11 24.4 24.5 24.4v-24.4z'/%3E%3Ccircle class='st5' cx='189.7' cy='40.5' r='25'/%3E%3C/g%3E%3C/g%3E%3Cstyle%3E.st2%7Bfill:%232f128d%7D.st3%7Bfill:%23251657%7D.st4%7Bfill:%23f4f3f6%7D.st5%7Banimation: r 20s ease infinite;%7D.st6%7Banimation: r 20s ease infinite -20s;%7D@keyframes r %7B 0%25 %7B fill: hsl(0, 80%25, 50%25); %7D 20%25 %7B fill: hsl(72, 80%25, 50%25); %7D 40%25 %7B fill: hsl(144, 80%25, 50%25); %7D 60%25 %7B fill: hsl(216, 80%25, 50%25); %7D 80%25 %7B fill: hsl(288, 80%25, 50%25); %7D 100%25 %7B fill: hsl(359, 80%25, 50%25); %7D%0A%7D %3C/style%3E%3C/svg%3E%0A") left top no-repeat;`;

        const o = `${backgroundString} font-size: ${IMAGE_HEIGHT}px; background-size: contain; background-color: transparent;`;
        const fontStyling =
            'font-size: 20px; background-color: #251657; color: #fff; font-family: Helvetica, Arial, sans-serif; padding: 10px 20px; font-weight: bold;';
        console.log('%c     ', o);
        console.log('%cThank you for visiting!', fontStyling);
        console.log(
            'View the source code of this site at https://github.com/torchbox/careers \nPull requests & issues most welcome!',
        );
        console.log('%cCredits', fontStyling);
        console.log('Developed by James Hancock');
        console.log('Delivery management by Lauren Davey');
        console.log('Designed by Ben Enright');
        console.log('Code review by Ben Morse');
        console.log('Mentorship from Thibaud Colas');
        console.log('Hosting setup by Jake Howard');
        console.log('Initial project setup by Chris Lawton');
        console.log(
            'Lisa, Gemma, Devon and Olly for content writing, design specification, content management and review',
        );
    }, []);

    return (
        <div className={themeClass}>
            <svg className={styles.svg}>
                <defs>
                    <clipPath
                        id="testimonialClipPath"
                        clipPathUnits="objectBoundingBox"
                    >
                        <path d="M 0.436 -0.001 L 0.937 0.258 L 0.572 0.997 L 0.062 0.746 Z" />
                    </clipPath>
                    <clipPath
                        id="topCornerClipPath"
                        clipPathUnits="objectBoundingBox"
                    >
                        <path d="M 0 0.2 L 0.2 0 L 1 0.31 L 1 1 L 0 1 Z" />
                    </clipPath>
                    <clipPath
                        id="bottomSliceClipPath"
                        clipPathUnits="objectBoundingBox"
                    >
                        <path d="M 0 0 L 1 0.85 L 1 1 L 0 1 Z" />
                    </clipPath>
                </defs>
            </svg>
            <Alert preview={preview} />
            <Header jobsAvailable={jobsAvailable} />
            <div className={styles.container}>{children}</div>
            <Footer />
        </div>
    );
};

export default Layout;
