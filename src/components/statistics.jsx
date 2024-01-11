export default function Statistics({ errors, success }) {
  return (
    <>
      <p className="font-extrabold">
        Errors: <span className="text-red-400">{errors}</span>
      </p>
      <p className="font-extrabold ">
        Success: <span className="text-green-400">{success}</span>
      </p>
    </>
  );
}
