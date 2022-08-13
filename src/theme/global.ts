import { extendTheme } from '@chakra-ui/react'

export const Theme = extendTheme({ 
    colors: {
        gray: {
            10: "#FFFFFF",
            20: "#E3E3E3",
            30: "#D9D9D9",
            40: "#888888",
            50: "#333333",
        },
        red: {
            10: "#CF2B2B"
        },
        brand: {
            900: '#1a365d',
            800: '#153e75',
            700: '#2a69ac',
          },
    },
    fonts: {
        heading: `'Righteous', cursive`,
        body: `'Righteous', cursive`,
      },
    styles: {
        global: {
            body: {
                backgroundColor: 'gray.20',
            }
        }

    }
 })