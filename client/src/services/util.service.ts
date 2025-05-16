  export function handleLongText(text:string, width: number) {
    const maxLetters = Math.floor(width / 7) - 25;
    if (text.length < maxLetters) return text;
    else {
      const shortenText = `${text.slice(0, maxLetters)}...`;
      return shortenText;
    }
  }