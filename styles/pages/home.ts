import { styled } from "..";

export const HomeContainer = styled("main", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",

  padding: "0 20px",
  marginTop: 20,
});

export const PaginationContainer = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  gap: "15px",
  marginBottom: "30px",
});

export const Button = styled("button", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  cursor: "pointer",
  background: "$buttons",
  border: "none",

  transition: "background 0.3s",

  height: 40,
  width: 40,
  borderRadius: 20,

  "&:hover": {
    background: "$text",
  },
  variants: {
    focus: {
        true: {
            background: "$text"
        }
    }
  }
});

Button.defaultProps = {
    focus: false,
};

export const ContainerLoading = styled("div", {
  minWidth: '100vw',
  minHeight: '100vh',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

export const CardsContainer = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gridGap: "15px",

  marginBottom: "20px",
});
