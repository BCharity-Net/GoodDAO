import styles from '../styles/Home.module.css'

type Props = {
    header: string,
    text: string
}

export default function Paragraph({ header, text }:Props) {
    return (
        <div className={styles.main}>
            <div className={styles.box}>
                <h1 className={styles.about}>{header}</h1>
                <br></br>
                <p>{text}</p>
            </div>
        </div>
    )
}