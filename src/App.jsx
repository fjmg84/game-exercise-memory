import { useState } from "react";
import Button from "./components/ui/button";
import { useEffect } from "react";
import { generateNumbers } from "./utils/functions";
import confetti from "canvas-confetti";
import ListButton from "./components/list-buttons";

function App() {
  const [numbers, setNumbers] = useState([]);

  // should load game
  useEffect(() => {
    createNewGame();
  }, []);

  useEffect(() => {
    // if all numbers is show true so you win
    if (numbers.length > 0 && numbers.every((item) => item.show)) {
      console.log(numbers.every((item) => item.show));
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }

    // show all numbers when you create new game
    if (numbers.length > 0 && numbers.every((item) => item.active)) {
      const arrValues = numbers.map((item) => {
        return { ...item, active: false };
      });

      setTimeout(() => {
        setNumbers(arrValues);
      }, 2000);
    }

    const values = numbers.filter((item) => item.active);

    if (values.length === 2) {
      let arrayNumbers = [...numbers];

      // if the two numbers are not the some
      if (Math.abs(values[0].value) !== Math.abs(values[1].value)) {
        values.forEach((item) => {
          let index = arrayNumbers.findIndex(
            (number) => number.value === item.value
          );
          arrayNumbers[index].active = false;
        });

        setTimeout(() => {
          setNumbers(arrayNumbers);
        }, 1200);
      }

      // if the two numbers are the some
      if (Math.abs(values[0].value) === Math.abs(values[1].value)) {
        values.forEach((item) => {
          let index = arrayNumbers.findIndex(
            (number) => number.value === item.value
          );
          arrayNumbers[index].active = false;
          arrayNumbers[index].show = true;
        });

        setNumbers(arrayNumbers);
      }
    }
  }, [numbers]);

  const resetGame = () => {
    const arrValues = numbers.map((item) => {
      return {
        active: false,
        show: false,
        value: item.value,
      };
    });

    setNumbers(arrValues);
  };

  const createNewGame = () => {
    const values = generateNumbers();
    const arrValues = values.map((item) => {
      return {
        active: true,
        show: false,
        value: item,
      };
    });
    setNumbers(arrValues);
  };

  const handleClick = (value) => () => {
    const arrayNumbers = [...numbers];
    const index = arrayNumbers.findIndex((item) => item.value === value);
    arrayNumbers[index].active = true;
    setNumbers(arrayNumbers);
  };

  return (
    <div>
      <nav className="flex justify-between py-5 px-3 items-center">
        <h1 className="text-gray-700 font-extrabold text-4xl">memory</h1>
        <div className="flex gap-5">
          <Button
            text={"reset"}
            customClass="bg-orange-500 rounded-full text-white font-extrabold hover:bg-orange-400 capitalize"
            onAction={resetGame}
          />
          <Button
            onAction={createNewGame}
            text={"new game"}
            customClass="bg-gray-300 rounded-full text-gray-700 font-extrabold hover:bg-gray-700 hover:text-white capitalize"
          />
        </div>
      </nav>

      <main className="flex items-center justify-center">
        <section className="grid grid-rows-4 grid-cols-4 gap-10">
          {numbers.map((item, index) => {
            const { value } = item;
            return (
              <ListButton
                key={index}
                disabled={numbers.filter((item) => item.active).length === 2}
                handleClick={handleClick(value)}
                item={item}
              />
            );
          })}
        </section>
      </main>
    </div>
  );
}

export default App;
