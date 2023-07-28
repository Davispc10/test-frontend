import { InputSearchProps } from "@/utils/types";

export default function InputSearch(props: InputSearchProps) {
  return (
    <div 
      className={`
        ${props.size === 'sm' && 'md:w-36'} 
        ${props.size === 'md' && 'md:w-52'} 
        ${props.size === 'lg' && 'md:w-80'} 
        flex flex-col gap-2
        w-full  
      `}>
      <label htmlFor={props.id}>
        {props.label}
      </label>
      <input
        onChange={props.onChangeFunction && props.onChangeFunction}
        className={`
          outline-none
          border
          rounded-lg
          px-3
          py-2
          ${props.className && props.className}
        `}
        type="text"
        disabled={props.isDisabled && props.isDisabled}
        required={props.isRequired && props.isRequired}
        name={props.name && props.name}
        id={props.id && props.id}
        value={props.value && props.value}
        placeholder={props.placeholder && props.placeholder}
      />
    </div>
  )
}