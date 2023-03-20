import { globalCss } from ".";

export const globalStyles = globalCss({
    '*': {
        margin: 0,
        padding: 0,
    },

    body: {
        // height: '100vh',
        background: '$background',
        color: '$text',
    },
    'body, input, textarea, button': {
        fontFamily: 'Oswald',
        fontWeight: 400
    }
});