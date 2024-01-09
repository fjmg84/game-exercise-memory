import { useState } from "react";
import Button from "./components/ui/button";
import { useEffect } from "react";
import { generateNumbers } from "./utils/functions";

function App() {
  const [numbers, setNumbers] = useState([]);
  const [activeNumbers, setActiveNumbers] = useState([]);
  const [isClicked, setIsClicked] = useState([]);
  const [win, setWin] = useState(false);

  useEffect(() => {
    if (
      isClicked.length === 2 &&
      Math.abs(isClicked[0]) !== Math.abs(isClicked[1])
    ) {
      setTimeout(() => {
        setIsClicked([]);
        return;
      }, 1000);
    }

    if (
      isClicked.length === 2 &&
      Math.abs(isClicked[0]) === Math.abs(isClicked[1])
    ) {
      setIsClicked([]);
      setActiveNumbers((prev) => [...prev, ...isClicked]);
    }
  }, [isClicked]);

  useEffect(() => {
    const values = generateNumbers();
    setNumbers(values);
    setActiveNumbers(values);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setActiveNumbers([]);
    }, 2000);
  }, [win]);

  const handleReset = () => {
    const values = generateNumbers();
    setNumbers(values);
    setActiveNumbers(values);
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
            onAction={handleReset}
            text={"new game"}
            customClass="bg-gray-300 rounded-full text-gray-700 font-extrabold hover:bg-gray-700 hover:text-white capitalize"
          />
        </div>
      </nav>

      <main className="flex items-center justify-center">
        <section className="grid grid-rows-4 grid-cols-4 gap-10">
          {numbers.map((item, index) => {
            return (
              <div key={index} className="relative overflow-hidden">
                <button
                  onClick={() => setIsClicked((prev) => [...prev, item])}
                  className={`
                 ${isClicked.includes(item) && "top-36"}
                 ${activeNumbers.includes(item) && "hidden"}
                absolute bg-slate-300 text-white rounded-full w-28 h-28 font-extrabold text-4xl
                `}
                ></button>

                <div className="flex items-center justify-center bg-slate-700 text-white rounded-full w-28 h-28 font-extrabold text-4xl">
                  {Math.abs(item)}
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
