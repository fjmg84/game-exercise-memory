import { useEffect, useState } from "react";

export default function Timer({ timer = "stop" }) {
  const [seconds, setSeconds] = useState(0);

  console.clear();
  console.log({ timer, seconds });

  useEffect(() => {
    let intervalId;

    if (timer === "stop") setSeconds(0);

    if (timer === "start" && timer !== "pause") {
      intervalId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    }

    // Limpiar el intervalo cuando el componente se desmonte o cuando cambie `timer`
    return () => clearInterval(intervalId);
  }, [timer]);

  return <p className="font-extrabold ">time: {seconds}s</p>;
}
