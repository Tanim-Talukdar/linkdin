export default function Button({ children, onClick }) {
  return (
    <button
      className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md w-full transition"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
