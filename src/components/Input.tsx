import { Container, InputText } from "@/styles/components/inputComponent";
import { useState } from "react";

export function Input({ ...rest }: React.InputHTMLAttributes<HTMLInputElement>) {
    const [isFocused, setIsFocused] = useState(false);
    function handleInputFocuses(){
        setIsFocused(true);
    }
    function handleInputBlur(){
        setIsFocused(false);
    }
    return (
        <Container focus={isFocused} data-testid={"input-test"}>
            🔎
            <InputText
                onFocus={handleInputFocuses}
                onBlur={handleInputBlur}
                {...rest}
            />
        </Container>
    );
}