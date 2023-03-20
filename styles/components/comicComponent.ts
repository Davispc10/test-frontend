import { styled } from "..";

export const Container = styled('div', {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",

    gap: '15px',

    'img': {
        borderRadius: '10px',
        background: '$white',
        padding: '5px',
        transition: 'transform 0.5s',

        '&:hover': {
            transform: 'rotate(-20deg)',
        }

    },
});

export const ComicName = styled('p', {
    transition: 'transform 0.3s',
    textAlign: 'center',
    fontSize: '1.2rem',


    '&:hover': {
        transform: 'rotate(20deg)',
    }
})