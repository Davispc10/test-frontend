import { Flex, Heading } from "@chakra-ui/react"

export const Header = () => {
    return (
        <Flex 
                as='header' 
                position='fixed'
                top='0'
                height='90px' 
                width='full' 
                bgColor='red.10' 
                justifyContent='center' 
                align='center'
                zIndex='1'
            >
                <Heading as='h1' color='gray.10'>Marvel Heroes</Heading>
        </Flex> 
    )
}