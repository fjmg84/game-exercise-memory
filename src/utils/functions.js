export const randomNumber = ({min = 0, max = Date.now()}) => {
  const number = Math.floor(Math.random() * 100);
  if (number < min || number > max) return randomNumber(min, max);

  return number;
};


export const generateNumbers = () => {
    let arrayNumbers = [];
    let tempA = [],
      tempB = [];
    while (tempA.length <= 7) {
      let number = randomNumber({
        min: 1,
        max: 20,
      });

      if (!tempA.includes(number)) {
        tempA.push(number);
        tempB.push(number * -1);
      }
    }
    arrayNumbers = [...tempA, ...tempB];
    return arrayNumbers.sort(() => Math.random() - 0.5);
  };