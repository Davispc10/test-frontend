import styles from './Header.module.css'
import superhero from '../../assets/superhero.png'
import Image from 'next/image'
import Link from 'next/link'
import { useContext } from 'react'
import { ContextCharacter } from '@/context/OffSetPageContext'

export default function Header() {
    const { setOffsetPage } = useContext(ContextCharacter)
    
    // when you click the link it will reset the offset to the beginning
    function handleClick() {
        setOffsetPage(0)
    }

    return (
        <div className={styles.headerContainer}>
            <Link onClick={handleClick} href="/">
                <Image src={superhero} height={110} alt="" />
            </Link>
        </div>
    )
}