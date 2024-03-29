export default function ListButton({ disabled, handleClick, item }) {
  const { value, active, show } = item;
  return (
    <div className="relative overflow-hidden">
      <button
        disabled={disabled}
        onClick={handleClick}
        className={`
                ${active && "top-36"} 
                ${show && "hidden"}
                absolute bg-slate-300 text-white rounded-full w-24 h-24 font-extrabold text-4xl transition-all duration-300 ease-linear
                `}
      ></button>

      <div className="flex items-center justify-center bg-slate-700 text-white rounded-full w-24 h-24 font-extrabold text-4xl">
        {Math.abs(value)}
      </div>
    </div>
  );
}
