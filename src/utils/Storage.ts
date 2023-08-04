const saveStateToLocalStorage = (key: string, state: any) => {
    localStorage.setItem(key, JSON.stringify(state));
  };
  
const getStateFromLocalStorage = (key: string) => {
    const storedState = localStorage.getItem(key);
    return storedState ? JSON.parse(storedState) : null;
};

export { 
    saveStateToLocalStorage,
    getStateFromLocalStorage
}