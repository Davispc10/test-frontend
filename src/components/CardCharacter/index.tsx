import { ResultsProps } from '../../pages'
import styles from './Card.module.css'
import Link from 'next/link'
import marvel from '../../assets/marvel.jpg'

interface CardCharacterProps {
    result: ResultsProps;
}

export function CardCharacter({ result }: CardCharacterProps) {   
    return (
        <Link href={`/${result.id}`} className={styles.card}>
            <h1 className={styles.title}>{result.name}</h1>
            <img
                className={styles.imageCharacter} 
                src={
                result.thumbnail.path.includes("image_not_available") ? marvel.src
                : `${result.thumbnail.path}.${result.thumbnail.extension}`}
                width={250}
                height={250}
                alt=""
            />
            <span className={styles.information}>+ information</span>
        </Link>
    )
}