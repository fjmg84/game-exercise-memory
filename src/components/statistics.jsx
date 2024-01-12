export default function Statistics({ movements }) {
  return (
    <>
      <p className="font-extrabold">
        Movements: <span className="text-red-400">{movements}</span>
      </p>
    </>
  );
}
