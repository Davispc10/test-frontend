type CallbackType = <T>(array: T[]) => void;
type ResultType = <T>(value: string, array: T[], field: string & keyof T) => void;

export const useStringFilterSetup = (callback: CallbackType): ResultType => {
  return (value, array, field): void => {    
    const filteredArray = array.filter(item => {
      if (typeof item[field] !== "string") throw new Error(`${field} não pode ser utilizada para filtro porque não é uma string`);
      return (item[field] as string).toLowerCase().includes(value.toLowerCase());
    });

    callback(filteredArray);
  };
}
