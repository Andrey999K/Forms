export const convertTimeInWords = (timeString: string): string => {
  const [hours, minutes, seconds] = timeString.split(':').map(Number);

  const pluralize = (value: number, words: [string, string, string]): string => {
    const n = Math.abs(value) % 100;
    if (n > 10 && n < 20) {
      return words[2];
    }
    const m = n % 10;
    if (m > 1 && m < 5) {
      return words[1];
    }
    if (m === 1) {
      return words[0];
    }
    return words[2];
  };

  const hoursString = `${hours} ${pluralize(hours, ['час', 'часа', 'часов'])}`;
  const minutesString = `${minutes} ${pluralize(minutes, ['минута', 'минуты', 'минут'])}`;
  const secondsString = `${seconds} ${pluralize(seconds, ['секунда', 'секунды', 'секунд'])}`;

  return `${hoursString} ${minutesString} и ${secondsString}`;
};
