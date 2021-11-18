import Link from "next/link";
import Image from "next/image";
import Teaser from "components/Teaser/Teaser";
import styles from "styles/Footer.module.scss";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.teaserList}>
                <div className={styles.teaserListContainer}>
                    <h3 className={styles.teaserListTitle}>
                        More from Torchbox...
                    </h3>
                    <div className={styles.teaserListContent}>
                        <Teaser
                            href="https://torchbox.com/digital-products/"
                            title="Digital Products"
                            text="For our digital products and services"
                        />
                        <Teaser
                            href="https://torchbox.com/wagtail-cms/"
                            title="Wagtail"
                            text="Build, consultancy and support from the creators of Wagtail"
                        />
                    </div>
                </div>
            </div>

            <div className={styles.footerTop}>
                <Link href="https://torchbox.com/events/">
                    <a className={styles.footerTopLink}>Events</a>
                </Link>
                <Link href="https://torchbox.com/blog/">
                    <a className={styles.footerTopLink}>Blog</a>
                </Link>
                <Link href="https://torchbox.com/work/">
                    <a className={styles.footerTopLink}>Work</a>
                </Link>
                <Link href="https://torchbox.com/team/">
                    <a className={styles.footerTopLink}>Team</a>
                </Link>
            </div>

            <div className={styles.footerContent}>
                <ul className={styles.footerAddressList}>
                    <li className={styles.footerAddress}>
                        <h2 className={styles.footerAddressTitle}>
                            Glorious Oxfordshire
                        </h2>
                        <p>
                            The Top Floor
                            <br />
                            Southill Barn
                            <br />
                            Cornbury Park
                            <br />
                            Charlbury
                            <br />
                            Oxon
                            <br />
                            OX7 3EW
                            <br />
                            UK
                        </p>
                    </li>

                    <li className={styles.footerAddress}>
                        <h2 className={styles.footerAddressTitle}>
                            Vibrant Bristol
                        </h2>
                        <p>
                            3rd Floor
                            <br />
                            15 Colston Street
                            <br />
                            Bristol
                            <br />
                            BS1 5AP
                            <br />
                            UK
                        </p>
                    </li>

                    <li className={styles.footerAddress}>
                        <h2 className={styles.footerAddressTitle}>
                            Sunny Austin
                        </h2>
                        <p>
                            725 Decker Prairie Drive
                            <br />
                            Austin, TX, 78748
                            <br />
                            USA
                        </p>
                    </li>

                    <li className={styles.footerAddress}>
                        <h2 className={styles.footerAddressTitle}>
                            Bustling Manila
                        </h2>
                        <p>
                            Unit&nbsp;214 Commercenter Alabang,
                            <br />
                            Commerce Avenue, Filinvest Corporate City,
                            <br />
                            Muntinlupa,
                            <br />
                            Philippines 1780
                        </p>
                    </li>
                </ul>

                <div className={styles.footerBottom}>
                    <div className={styles.footerCopyright}>
                        &copy; Torchbox {new Date().getFullYear()}
                    </div>
                    <div className={styles.footerLinks}>
                        <Link href="https://torchbox.com/privacy/">
                            <a className={styles.footerLink}>Privacy</a>
                        </Link>

                        <Link href="https://torchbox.com/cookies/">
                            <a className={styles.footerLink}>Cookies</a>
                        </Link>
                    </div>
                </div>
            </div>

            <div className={styles.footerImage}>
                <Image
                    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyOTcuMiAyMjIiPjxzdHlsZT4uc3Qye2ZpbGw6IzJmMTI4ZH0uc3Qze2ZpbGw6IzI1MTY1N30uc3Q0e2ZpbGw6I2Y0ZjNmNn08L3N0eWxlPjxwYXRoIGQ9Ik0yOTcuMiAyMjJjMC0zOC4xLTMwLjgtNjktNjguOS02OS4xcy02OSAzMC44LTY5LjEgNjguOWwxMzggLjJ6IiBmaWxsPSIjM2JlY2NkIi8+PHBhdGggZD0iTTM1LjcgMTA5LjhoMy45djM4aC0zLjl2LTM4eiIgZmlsbD0iIzIzMTc0OSIvPjxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik03My45IDIyMS44bC4zLTQzLjYgMzAuNC4yLS4zIDQzLjYtMzAuNC0uMnoiLz48cGF0aCBjbGFzcz0ic3QyIiBkPSJNMTA0LjUgMjExLjRjLTYuOC0uMS0xMi40LTUuNy0xMi4zLTEyLjUuMS02LjkgNS43LTEyLjQgMTIuNS0xMi4zUzExNyAxOTIuMiAxMTcgMTk5Yy0uMSA2LjktNS43IDEyLjQtMTIuNSAxMi40eiIvPjxwYXRoIGNsYXNzPSJzdDMiIGQ9Ik0zNy43IDEyOC42Yy0xNC42IDAtMjYuNCAxMS44LTI2LjQgMjYuNGg0LjF2OC42Yy04LjggMS45LTE1LjQgOS43LTE1LjQgMTlzNi42IDE3LjEgMTUuNCAxOS4xVjIyMkg2MHYtNjcuMWg0YzAtMTQuNS0xMS44LTI2LjMtMjYuMy0yNi4zem0tMzMuNSA1NGMwLTcgNC43LTEyLjkgMTEuMS0xNC43djI5LjRjLTYuNC0xLjgtMTEuMS03LjctMTEuMS0xNC43eiIvPjxlbGxpcHNlIGNsYXNzPSJzdDMiIGN4PSIzNy43IiBjeT0iMTA2LjUiIHJ4PSI2LjciIHJ5PSI2LjciLz48cGF0aCBjbGFzcz0ic3Q0IiBkPSJNODIuNiAxOTUuNmMwIDE0LjYtMTEuOCAyNi40LTI2LjQgMjYuNHMtMjYuNC0xMS44LTI2LjQtMjYuNGg1Mi44eiIvPjxjaXJjbGUgY2xhc3M9InN0MyIgY3g9IjIzMi42IiBjeT0iNTAuMSIgcj0iMTkuNSIvPjxwYXRoIGNsYXNzPSJzdDMiIGQ9Ik0yMjYuMyA5MC4yYzE0LjIgMCAyNS43LTExLjUgMjUuNy0yNS44aC0yNS43djI1Ljh6Ii8+PHBhdGggY2xhc3M9InN0NCIgZD0iTTIwNS4zIDE0MWgxMi4zYzE0LjQgMCAyNi4xLTExLjcgMjYuMS0yNi4xVjY5LjJjMC0xNC40LTExLjctMjYuMS0yNi4xLTI2LjFoLTEyLjNjLTE0LjQgMC0yNi4xIDExLjctMjYuMSAyNi4xdjQ1LjdjLS4xIDE0LjQgMTEuNiAyNi4xIDI2LjEgMjYuMXoiLz48cGF0aCBjbGFzcz0ic3Q0IiBkPSJNMjI3LjcgMTcyLjVjOC45IDAgMTYtNy4yIDE2LTE2di01MC45YzAtOC45LTcuMi0xNi0xNi0xNi04LjkgMC0xNiA3LjItMTYgMTZ2NTAuOWMtLjEgOC44IDcuMSAxNiAxNiAxNnoiLz48cGF0aCBjbGFzcz0ic3Q0IiBkPSJNMjQwLjcgNzcuNmM3LjQgMCAxMy40IDYgMTMuNCAxMy40cy02IDEzLjQtMTMuNCAxMy40Vjc3LjZ6Ii8+PGNpcmNsZSBjbGFzcz0ic3QzIiBjeD0iMjE5LjMiIGN5PSI4MS45IiByPSIzLjciLz48Y2lyY2xlIGNsYXNzPSJzdDMiIGN4PSIxOTIuMyIgY3k9IjgxLjkiIHI9IjMuNyIvPjxwYXRoIGNsYXNzPSJzdDMiIGQ9Ik0yNDMuNyAxMTguN2MwIDE3LjgtMTQuNSAzMi4zLTMyLjMgMzIuM3MtMzIuMy0xNC41LTMyLjMtMzIuM2g2NC42eiIvPjxwYXRoIGQ9Ik0xOTYgMTA3LjRoMTAuNFY5MC45TDE5NiAxMDcuNHoiIGZpbGw9IiNmZDU3NjUiLz48cGF0aCBjbGFzcz0ic3QzIiBkPSJNMTc5LjIgMTEyaDY0LjZ2OC4yaC02NC42VjExMnptMTEtNDYuNEgyNTJWNDguOWwtNjEuOC0xMnYyOC43eiIvPjxwYXRoIGQ9Ik0yMTEuMSAxMjAuMmMwIDQuNS0zLjcgOC4yLTguMiA4LjJzLTguMi0zLjctOC4yLTguMmgxNi40eiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0xNjUuNyA0MGMwIDEzLjYgMTEgMjQuNCAyNC41IDI0LjRWNDBoLTI0LjV6Ii8+PGNpcmNsZSBjbGFzcz0ic3QzIiBjeD0iMTg5LjciIGN5PSI0MC41IiByPSIyNSIvPjwvc3ZnPgo="
                    width="320px"
                    height="240px"
                    alt=""
                />
            </div>
        </footer>
    );
};

export default Footer;
