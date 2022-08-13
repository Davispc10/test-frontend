import { Box, Flex, Heading, Image } from "@chakra-ui/react"
import { Character } from "../models/Character"

type CharacterCardPropType = {
    character: Character
}

export const CharacterCard = ({character}: CharacterCardPropType) => {
    return (
        <Flex 
            flexDirection='column'
            justifyContent='space-between'
            as='article'
            width='full'
            height='200px'
            bgColor='gray.10'
            borderRadius='9px'
            sx={{
                '@media (min-width: 768px)': {
                    minHeight: '360px'
                }
                
            }}
             _hover={{border: '2px solid var(--chakra-colors-gray-30)'}}

        >
            <Image 
                src={character.urlImage} 
                width='full' 
                minHeight='150px'
                alt=''
                objectFit='cover'
                borderRadius='9px 9px 0px 0px'
                sx={{
                    '@media (min-width: 768px)': {
                        minHeight: '250px'
                    }
    
                }}
            
            />
            <Heading 
                display='flex' 
                as='h3' 
                fontSize='16px'
                fontWeight='400'
                justifyContent='center' 
                lineHeight= '20px'
                alignItems='center' 
                width='full'
                h='full' 
                textAlign='center'
                padding='0 10px'
                >{character.name}</Heading>
        </Flex>    
    )
}