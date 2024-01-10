import { useState } from "react";
import Button from "./components/ui/button";
import { useEffect } from "react";
import { generateNumbers } from "./utils/functions";
import confetti from "canvas-confetti";

function App() {
  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    createNewGame();
  }, []);

  useEffect(() => {
    if (numbers.every((item) => item.show)) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }

    const values = numbers.filter((item) => item.active);
    if (values.length === 2) {
      let arrayNumbers = [...numbers];

      if (Math.abs(values[0].value) !== Math.abs(values[1].value)) {
        values.forEach((item) => {
          let index = arrayNumbers.findIndex(
            (number) => number.value === item.value
          );
          arrayNumbers[index].active = false;
        });
      }

      if (Math.abs(values[0].value) === Math.abs(values[1].value)) {
        values.forEach((item) => {
          let index = arrayNumbers.findIndex(
            (number) => number.value === item.value
          );
          arrayNumbers[index].active = false;
          arrayNumbers[index].show = true;
        });
      }
      setTimeout(() => {
        setNumbers(arrayNumbers);
      }, 2000);
      return;
    }
  }, [numbers]);

  const createNewGame = () => {
    const values = generateNumbers();
    const arrValues = values.map((item) => {
      return {
        active: false,
        show: false,
        value: item,
      };
    });

    setNumbers(arrValues);
    return;
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
          {numbers.map(({ active, show, value }, index) => {
            return (
              <div key={index} className="relative overflow-hidden">
                <button
                  onClick={handleClick(value)}
                  className={`
                ${active && "top-36"} 
                ${show && "hidden"}
                absolute bg-slate-300 text-white rounded-full w-28 h-28 font-extrabold text-4xl 
                `}
                ></button>

                <div className="flex items-center justify-center bg-slate-700 text-white rounded-full w-28 h-28 font-extrabold text-4xl">
                  {Math.abs(value)}
                </div>
              </div>
            );
          })}
        </section>
      </main>
    </div>
  );
}

export default App;
