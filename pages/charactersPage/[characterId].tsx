import { GetServerSideProps, NextPage } from "next"
import { ICharactersPage } from "../../src/interfaces/charactersPage"
import { getServerApi } from "../../src/services/getServerApi"
import md5 from "md5";
import { ICharacters } from "../../src/interfaces/characters";

const publickey = "c738025db655aeb390acf14c3ca1eb12";
const privatekey = "457ed969c09a42f01c9fbb1720874afc744a4129";
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);

export const getServerSideProps: GetServerSideProps = async context => {
    const serverApi = getServerApi(context)

    console.log("Params:", context.params)
    try {
      const response = await serverApi.get(`characters/${context.params?.characterId}?ts=${ts}&apikey=${publickey}&hash=${hash}`)
        console.log("response:", response)
      return {
        props: response.data,
      }
    } catch (error) {
      console.log("Catch:", error)
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
    }
  }
  
  const CharactersPage: NextPage<ICharactersPage> = props => {
    console.log("Props:", props)
    return (
        <div>{props?.data?.results?.[0].name}</div>
    )
  }

  export default CharactersPage