
export const useLocalStorage = (key, type, initialValue = '') => {
    let value = '';
    if (typeof window !== 'undefined') {
      if (type === 'delete') {
        window.localStorage.removeItem(key);
        initialValue = '';
      }
      if (type === 'add') {
        window.localStorage.setItem(key, initialValue);
        value = 'initialValue';
      }
      if (type === 'get') {
        const storedValue = window.localStorage.getItem(key);
        if (storedValue) {
          value = storedValue;
        }
      }
    }
    return value;
  };