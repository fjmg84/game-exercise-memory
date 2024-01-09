export default function Button({ text, customClass, onAction }) {
  return (
    <button
      onClick={onAction}
      className={`${customClass} px-10 py-3 transition-all duration-500 ease-in-out`}
    >
      {text}
    </button>
  );
}
