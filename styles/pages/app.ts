import { styled } from "..";

export const Container = styled('div', {
    display: "flex",
    flexDirection: 'column',
})

export const Header = styled("header", {
    padding: '2rem 0',
    margin: '0 auto',

    width: '100%',
    background: '$backgroundHeader',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    h1: {
        transition: 'transform 0.5s',
    },
    'h1:hover': {
        transform: 'translate(5px, 12px)'
    }
})
