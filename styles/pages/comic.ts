import { styled } from "..";

export const Container = styled("div", {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    height: '100%',
    scrollSnapType: 'none',

    padding: '30px 0'
})

export const ContainerLoading = styled("div", {
    minWidth: '100vw',
    minHeight: '100vh',
  
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
})