import { styled } from "..";

export const Container = styled('div', {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",

    gap: '20px',

    borderRadius: '10px',
    cursor: 'pointer',

    'img': {
        borderRadius: '10px',
        background: '$white',
        padding: '10px',
        transition: 'transform 0.5s',

        '&:hover': {
            transform: 'rotate(-20deg)',
        }

    },

    'h3': {
        color: '$main',
        fontSize: '2rem',
        transition: 'transform 0.5s',

        '&:hover': {
            transform: 'rotate(20deg)',
        }
    },

    'h4': {
        color: '$text',
        fontSize: '1.5rem',
        transition: 'transform 0.5s',
        width: 500,
        textAlign: 'center',
        '&:hover': {
            transform: 'rotate(-20deg)',
        }
    }
});

export const ButtonBack = styled("button", {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    border: 'none',

    fontSize: '1rem',
    cursor: 'pointer',

    padding: '1rem 3rem',
    borderRadius: '10px',
    background: '$main',

    transition: "background 0.3s",

    "&:hover": {
        background: "$text",
      },
})

export const CarrouselContainer = styled("div", {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: '400px',
    maxWidth: '800px',
    overflow: 'auto',

    margin: '20px 0',

    gap: '15px',

    background: '$white',
    borderRadius: '10px'
})