import { useEffect, useState } from "react";
import { STATUS_TIMER } from "../App";

export default function Timer({ timer = STATUS_TIMER.STOP }) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let intervalId;

    if (timer === STATUS_TIMER.STOP) setSeconds(0);

    if (timer === STATUS_TIMER.START && timer !== STATUS_TIMER.PAUSE) {
      intervalId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    }

    // Limpiar el intervalo cuando el componente se desmonte o cuando cambie `timer`
    return () => clearInterval(intervalId);
  }, [timer]);

  return <p className="font-extrabold ">time: {seconds}s</p>;
}
