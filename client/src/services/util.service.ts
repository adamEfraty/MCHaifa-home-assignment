  export function handleLongText(text:string, width: number) {
    const maxLetters = Math.floor(width / 7) - 25;
    if (text.length < maxLetters) return text;
    else {
      const shortenText = `${text.slice(0, maxLetters)}...`;
      return shortenText;
    }
  }


  
export function debounce(func: (...args: any[]) => void, delay: number) {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}