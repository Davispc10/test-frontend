import { Grid, Heading, Input, Box, Spinner, Center } from "@chakra-ui/react"
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetServerSideProps } from "next"
import { useRouter } from "next/router";
import { CharacterCard } from "../modules/character/components/CharacterCard";
import { useFetchCharacters } from "../modules/character/context/CharacterController";
import { Pagination } from "../components/Pagination";
import { Parser } from "../utils/Parser";
import { Layout } from "../components/Layout";
import Link from "next/link";
import { Header } from "../components/Header";
import { Character } from "../modules/character/models/Character";
import { useCharacter } from "../modules/character/context/CharacterContext";
import { CharacterRepository } from "../modules/character/repository/CharacterRepository";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const queryClient = new QueryClient();
    const repo =  new CharacterRepository()
    const {offset} = Parser.pagination(context.query.offset)
    //@ts-ignore
    await queryClient.prefetchQuery( ["characters", offset], async () => await repo.getByOffset(offset))
    return { props: { dehydratedState: dehydrate(queryClient) }};
}

const renderList = (data?: Character[]) => {
    return  data?.map(character => 
         <Link key={character.id} href={`/hero/${character.id}`} style={{background: 'red'}}>
            <a><CharacterCard  character={character}/></a>
        </Link> 
    )
}

export default function Home (props: any) {
    const router = useRouter();
    const {offset} = Parser.pagination(router.query.offset)
    const {setSearchedName, searchedName} = useCharacter()
    const {isLoading, data} = useFetchCharacters( offset , searchedName)
   
    return (
        <Layout>
            <Header />
            <Box
                as='main' 
                textAlign='center'
                display='flex'
                flexDirection='column'
                alignItems='center'
                width='full'    
                top='90px'
                bg='gray.20'
                position='fixed'
                padding='24px 34px 0 34px' 
                
            >
                <Heading 
                    as='h2' 
                    fontSize='26px' 
                    color='gray.50'
                    minWidth='213px'
                    textAlign='center'
                    marginBottom='14px'
                >Selecione o Herói</Heading>
                
                <Pagination 
                    //@ts-ignore
                    total={ data?.total}
                    offset={offset}
                    buttonsPerPage={5}
                />
                 <Input 
                    placeholder="Pesquisar Herói" 
                    maxWidth='360px' 
                    textAlign='center'
                    _placeholder={{textAlign: 'center'}}
                    _focus={{borderColor: 'red'}}
                    height='48px'
                    marginBottom='24px'
                    backgroundColor='gray.30'
                    value={searchedName}
                    onChange={(e) => {
                        setSearchedName(e.target.value)
                    }}
                />
            </Box>
            {
                isLoading ? 
                    <Center mt='300px'>
                            <Spinner />
                    </Center>
                : 
                <Grid 
                as='article' 
                    templateColumns='repeat(2, 1fr)' 
                    h='full'
                    gap='30px' 
                    mt='300px'
                    padding='24px 34px' 
                    w='full'
                    sx={{
                        '@media (min-width: 1200px)': {
                            gridTemplateColumns: 'repeat(5, 1fr)' 
                        }
                    }}
                    >
                    {renderList(data?.results)}
                </Grid>
            }
            
        </Layout> 
    )
}