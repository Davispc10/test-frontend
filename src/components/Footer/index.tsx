import styles from './Footer.module.css'

export default function Footer() {
    return (
        <div className={styles.containerFooter}>
            <a className={styles.linkMarvel} target={'_blank'} href="http://marvel.com\">Data provided by Marvel. © 2023 MARVEL</a>
            <p>Made by @Murilo🚀🦸‍♂️</p>
        </div>
    )
}