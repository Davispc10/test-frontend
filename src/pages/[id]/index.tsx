import styles from "../../styles/pages/CharacterID.module.css"
import { DataProps } from "../index"

import Link from "next/link"
import marvel from '../../assets/marvel.jpg'
import { ImSpinner2 } from "react-icons/im";
import { useRouter } from "next/router"

import { API } from "@/services/api"
import { AiFillLeftCircle } from 'react-icons/ai';
import { useQuery } from "@tanstack/react-query"

export default function CharacterID() {
  // getting the query and the id from within the useRouter
  const { query } = useRouter();
  const { id } = query

  // Searching character by id
  async function getCharacterById() {
    const response = await API.get(`${process.env.NEXT_PUBLIC_MARVEL_COMPLEMENT}/${id}${process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY}${process.env.NEXT_PUBLIC_MARVEL_PRIVATE_KEY}`)
    const data = await response.data
    return data
  }

  const { data, isLoading } = useQuery<DataProps>({
    queryKey: ['character', id],
    queryFn: getCharacterById
  })  

  return (
    <>
      <div className={styles.containerCharacter}>
        {
          data?.data.results.map(result => {
            return (
              <div key={result.id} className={styles.character}>
                <Link className={styles.toBack} href={`/`} >
                  <AiFillLeftCircle /> voltar
                </Link>
                <h1 className={styles.nameCharacter}>{result.name}</h1>

                <img
                  src={
                    result.thumbnail.path.includes("image_not_available") ? marvel.src
                    : `${result.thumbnail.path}.${result.thumbnail.extension}`}
                  className={styles.imageCharacter}
                  alt="character image"
                />

                {isLoading && <p><ImSpinner2 className={styles.spinner} /></p>}

                {
                  result.description ? <p className={styles.descriptionCharacter}>{result.description}</p> : <span className={styles.descriptionCharacter}>"Description not informed"</span>
                }
              </div>
            )
          })}
      </div>
    </>
  )
}