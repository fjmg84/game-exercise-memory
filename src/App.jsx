import { useState } from "react";
import Button from "./components/ui/button";
import { useEffect } from "react";
import { generateNumbers } from "./utils/functions";
import confetti from "canvas-confetti";
import ListButton from "./components/list-buttons";
import Statistics from "./components/statistics";
import Timer from "./components/timer";

function App() {
  const [numbers, setNumbers] = useState([]);
  const [statistics, setStatistics] = useState({
    errors: 0,
    success: 0,
  });
  const [timer, setTimer] = useState("stop");

  console.log(numbers);

  // should load game
  useEffect(() => {
    createNewGame();
  }, []);

  useEffect(() => {
    // if all numbers is show true so you win
    if (numbers.length > 0 && numbers.every((item) => item.show)) {
      setTimer("pause");
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
        setTimer("start");
      }, 5000);
    }

    const values = numbers.filter((item) => item.active);

    if (values.length === 2) {
      let arrayNumbers = structuredClone(numbers);
      let absValue1 = Math.abs(values[0].value),
        absValue2 = Math.abs(values[1].value);

      // if the two numbers are not the some
      if (absValue1 !== absValue2) {
        setStatistics((prev) => ({ ...prev, errors: prev.errors + 1 }));
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
      if (absValue1 === absValue2) {
        setStatistics((prev) => ({ ...prev, success: prev.success + 1 }));
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
    setStatistics({ errors: 0, success: 0 });
    setTimer("stop");
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

      <main className="flex items-center justify-evenly flex-wrap gap-2">
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

        <section>
          <article className="bg-slate-700 text-white rounded-xl p-5 flex items-center justify-center gap-5">
            <Statistics
              errors={statistics.errors}
              success={statistics.success}
            />
            <Timer timer={timer} />
          </article>
        </section>
      </main>
    </div>
  );
}

export default App;
