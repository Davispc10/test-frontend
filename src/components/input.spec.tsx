import { render, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import { Input } from "./Input";

// testando as funcionalidades do componente Input.
describe("Input Component", () => {
  it("should handle focus and blur events", () => {
    const { getByTestId } = render(<Input id="input-test" placeholder="Pesquisando" />);
    const inputComponent = getByTestId("input-test");
    const inputText = inputComponent.querySelector("input");

    expect(inputComponent).not.toHaveClass("focus");

    fireEvent.focus(inputComponent); //Tentativa de fazer o testo de quando o botão estiver em foco
    expect(inputComponent.children[0].children).toBeTruthy(); // Porém o stitch inclui outras classes derivas dele
    //Esse teste acima é apenas um demonstração de que podemos percorrer os filhos de um componente
    //e testar se os mesmos existem
    

    //toHaveClass verifica se o elemento tem determinada Classe
    //fireEvent.blut - simula a saida do foco do botão
    fireEvent.blur(inputText!);
    expect(inputComponent).not.toHaveClass("focus");
  });
});
