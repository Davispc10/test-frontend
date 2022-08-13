import { Heading } from "@chakra-ui/react"

type SectionTitleProps = {
    text: string
}
export const SectionTitle = ({text}: SectionTitleProps) => {
    return (
        <Heading as='h3'
            fontWeight='400'
            fontSize= '24px'
            lineHeight= '30px'
            color='gray.50'
            mb='24px'
        >{text}</Heading>
    )
}