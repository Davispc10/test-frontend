import React from "react";
interface ComicsDefaultMessageProps {
  defaultMessage: string,
}

export const ComicsDefaultMessage = ({defaultMessage} : ComicsDefaultMessageProps) => {
  return (
    <p>
      {defaultMessage}
    </p>
  )
}