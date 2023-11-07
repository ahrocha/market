// create a function that insert an object to localStorage
export const insertToLocalStorage = (key, value) => {
    // get the previous value from localStorage
    const previousValue = localStorage.getItem(key);
    // if there is a previous value, parse it
    const parsedPreviousValue = previousValue ? JSON.parse(previousValue) : [];
    // stringify the new value
    const stringifiedValue = JSON.stringify([...parsedPreviousValue, value]);
    // insert the new value to localStorage
    localStorage.setItem(key, stringifiedValue);
}