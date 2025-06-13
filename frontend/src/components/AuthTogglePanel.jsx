export default function AuthTogglePanel({ mode, onClick }) {
  const isLogin = mode === "login";
  return (
    <div className="w-1/2 bg-teal-500 text-white p-10 flex flex-col justify-center items-center">
      <h2 className="text-3xl font-bold mb-4">
        {isLogin ? "Hello, Friend!" : "Welcome Back!"}
      </h2>
      <p className="mb-4">
        {isLogin ? "Register now to start your journey" : "Already have an account? Log in!"}
      </p>
      <button
        className="border-2 border-white px-6 py-2 rounded-md hover:bg-white hover:text-teal-600"
        onClick={onClick}
      >
        {isLogin ? "Register" : "Log In"}
      </button>
    </div>
  );
}
