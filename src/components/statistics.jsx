import { useEffect } from "react";
import { useState } from "react";

export default function Statistics({ errors, success, start = false }) {
  const [seconds, setSeconds] = useState(0);

  console.log({ errors, success, start });

  useEffect(() => {
    let time = setTimeout(() => {
      if (start) setSeconds(seconds + 1);
    }, 1000);

    return () => clearTimeout(time);
  });
  return (
    <article className="bg-slate-700 text-white rounded-xl p-5 flex items-center justify-center gap-5">
      <p>Errors: {errors}</p>
      <p>Success: {success}</p>
      <p>time: {seconds}</p>
    </article>
  );
}
