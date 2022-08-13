import { Box, Center, Flex, Heading, IconButton, Image, Text, VStack } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { Header } from "../../components/Header"
import { Layout } from "../../components/Layout"
import { ButtonBack } from "../../components/Pagination/Icons"
import { SectionTitle } from "../../components/SectionTitle"
import { useGetComicsWithImages } from "../../modules/character/context/Actions"
import { useCharacter } from "../../modules/character/context/CharacterContext"
import { useSelectorGetCharacter } from "../../modules/character/context/CharacterSelectors"

const Hero = () => {
    const router = useRouter()
    const {characters} = useCharacter()
    const character = useSelectorGetCharacter(characters, router.query.id)
    const {isLoading, comics} = useGetComicsWithImages(character)

    return (
        <Layout>
            <Header />
            <Flex
                mt='90px'
                width='full'
                justifyContent='space-between'
                alignItems='center'
                position='fixed'
                minH='100px'
                bg='gray.20'
            >
                <IconButton 
                    ml='20px'
                    aria-label="icon-button-back"
                    icon={<ButtonBack aria-label="icon-left"/>}
                    fontSize='12px'
                    width='60px'
                    height='60px'
                    borderRadius='100%'
                    background='none'
                    _hover={{
                        backgroundColor: 'var(--chakra-colors-gray-30)'
                    }}
                    onClick={() => {router.back()}}
                    zIndex='1'
                />
                <Center width='full'  position='absolute'>
                    <Heading 
                        w='250px'  
                        textAlign='center'   
                        fontWeight= '400'
                        fontSize='26px'
                        lineHeight='32px'>{character?.name}</Heading>
                </Center>
            </Flex>
            <VStack 
                h='full' 
                pb='30px' 
                w='full'
                sx={{
                    '@media (min-width: 768px)': {
                        width: '768px',
                        margin:'0 auto'
                    }
                    
                }}
            > 
                <Box padding='0 20px' mb='100px' w='full' mt='200px'>
                    <Image 
                        src={character?.urlImage} alt='' 
                        w='full'
                        maxHeight='600px'
                        marginBottom='30px'
                        borderRadius='10px'
                        sx={{
                            '@media (min-width: 768px)': {
                                objectFit: 'cover'
                            }
                            
                        }}
                    />
                    <SectionTitle text='Sobre o personagem'/>
                    <Text 
                        fontWeight= '400'
                        fontSize='16px'
                        lineHeight='20px'
                        mb='30px'
                        color='gray.40'
                    >{character?.description}</Text>
                    <SectionTitle text='Quadrinhos'/>
                    <Box  
                        overflowX="auto" 
                        overflowY="hidden"  
                        whiteSpace="nowrap" 
                        width='full' 
                        maxHeight='400px'>
                        {
                            !character?.hasComics() ?
                            <Text 
                                fontWeight= '400'
                                fontSize='16px'
                                lineHeight='20px'
                                mb='30px'
                                color='gray.40'>This caracter has no comics</Text>
                                : 
                                isLoading ? 'carregando...' 
                                :  comics.map((comic, index) => 
                                <VStack 
                                    key={index} 
                                    height='full'
                                    maxWidth='200px' 
                                    display='inline-block'
                                    bgColor='gray.10' 
                                    margin='0 10px' 
                                    borderRadius='10px' 
                                    padding='10px' 
                                >
                                    <Image 
                                        src={comic.urlImage} 
                                        width='full' 
                                        h='full' 
                                        objectFit='cover'/>
                                </VStack>)
                        }
                    </Box>
                </Box>
            </VStack>
          

        </Layout>
    )
    
}

export default Hero