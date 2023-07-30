import { tv } from "tailwind-variants";

// i wish i could use the before and after pseudo elements in a good to make the notched border
// but unfortunately tailwind doesn't offer that

// https://codepen.io/doublecaffe/pen/eYQjYMr
export const notchedStyles = tv({
  slots: {
    wrapper: `
      relative inline-block overflow-hidden py-0 px-[18px]

      before:absolute before:block before:content-[''] before:w-[30px]
      before:h-[30px] before:rotate-45 before:z-[3]
      before:bottom-[4px] before:right-[4px] before:border-r-[3px]

      after:absolute after:block after:content-[''] after:w-[30px]
      after:h-[30px] after:rotate-45 after:z-[3]
      after:top-[4px] after:left-[4px] after:border-l-[3px]
    `,
    content: `
      relative block leading-[1] px-[1.25rem] py-[1rem]
      border-t-[3px] border-b-[3px] z-[3]

      before:absolute before:block before:content-[''] before:w-[20px]
      before:h-[calc(100%-13px)] before:z-[3] before:border-l-[3px]
      before:left-[-18px] before:bottom-[-3px] before:border-b-[3px]
      

      after:absolute after:block after:content-[''] after:w-[20px]
      after:h-[calc(100%-13px)] after:z-[3] after:border-r-[3px]
      after:right-[-18px] after:top-[-3px] after:border-t-[3px]
    `,
  },
  variants: {
    color: {
      borderRed: {
        wrapper: `before:border-red-500 after:border-red-500 border-red-500`,
        content: `before:border-red-500 after:border-red-500 border-red-500`,
      },
    },
  },
  defaultVariants: {
    color: "borderRed",
  },
});

// relative block leading-[1] px-[1.25rem] py-[1.5rem]
//       border-t-[3px] border-${color} border-b-[3px]
//       z-[3]

//       before: left-[-18px] before:bottom-[-3px]
//       before:border-b-[3px] before:border-${color} before:border-l-[3px]
