import { styled } from "..";

export const Container = styled('div', {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",

    background: '$white',

    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'transform 0.5s',

    '&:hover': {
        transform: 'scale(0.90)',
        'h3': {
            color: '$main'
        }
    },
    'img': {
        borderRadius: '10px 10px 0 0',
    }
});

export const HeroName = styled('h3', {
    padding: '15px 15px',
    transition: 'color 0.3s',
    textAlign: 'center',

    color: '$text'
})