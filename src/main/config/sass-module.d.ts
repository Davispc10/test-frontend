declare module "*.scss" {
  const content: { [className: string]: string };
  //@ts-ignore
  export = content;
}
