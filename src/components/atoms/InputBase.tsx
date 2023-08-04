import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> { 
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

export const InputBase = ({ value, onChange, placeholder, ...rest}: Props) => {
    return (
        <input 
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            {...rest}
        />
    )
}