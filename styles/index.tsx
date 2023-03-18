import { createStitches } from "@stitches/react";

// Configurações e ferramentas que vamos precisar para construir a estilização com o stitches
export const { 
    config,
    styled,
    globalCss,
    theme,
    createTheme,
    keyframes,
    css,
    getCssText
} = createStitches({
    theme: {
        colors: {
            main: '#c9514f',
            background: 'linear-gradient(to bottom, #000000, #1C0038 100%)',
            backgroundHeader: '#050007',
            white: '#fff',
            text: '#9c42cc',
        }
    }
});