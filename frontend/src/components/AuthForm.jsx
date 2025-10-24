
import Button from "./Button";
import { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { loginUser, registerUser } from "@/config/redux/action/authAction/index";
import { formFields } from "@/constants/formFields";
import { useRouter } from "next/router";
import { reset } from "@/config/redux/reducer/authReducer/authReducer";
import Input from "./input";



export default function AuthForm({ mode }) { 
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const authState = useSelector((state) => state.auth);
  const isLogin = mode === "login";
  const fields = formFields[mode];
  const router = useRouter();
  useEffect(() => {
    if (authState.loggedIn || authState.profileFetched) {
      router.push("/dashboard")
    }
  }, [authState.loggedIn,router])
  

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(isLogin ? loginUser(formData) : registerUser(formData));

  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full md:w-1/2 p-6 md:p-10 bg-gray-100 bg-opacity-40 rounded-md shadow-lg"
    >
      <h2 className="text-teal-400 text-2xl md:text-3xl font-bold mb-6 text-center">
        {isLogin ? "Log In" : "Sign Up"}
      </h2>

      {/* Name + Username side-by-side on md+ screens */}
      {fields.some((f) => f.id === "name") &&
        fields.some((f) => f.id === "username") && (
          <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
            {["name", "username"].map((fieldId) => {
              const field = fields.find((f) => f.id === fieldId);
              if (!field) return null;
              return (
                <Input
                  key={field.id}
                  label={field.label}
                  id={field.id}
                  type={field.type}
                  value={formData[field.id] || ""}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  icon={field.icon}
                />
              );
            })}
          </div>
        )}

      {/* Other fields */}
      {fields
        .filter((f) => f.id !== "name" && f.id !== "username")
        .map(({ id, label, type, placeholder, icon }) => (
          <div key={id} className="mb-4">
            <Input
              label={label}
              id={id}
              type={type}
              value={formData[id] || ""}
              onChange={handleChange}
              placeholder={placeholder}
              icon={icon}
            />
          </div>
        ))}
      {authState.message &&   <p style={{ color: authState.isError ? "red" : "green" }}>{typeof authState.message === "string" ? authState.message : authState.message.message}</p>}
      <br />
      <Button className="w-full mt-6" onClick={handleSubmit}>{isLogin ? "Login" : "Register"}</Button>

      <div className="flex flex-col gap-4 mt-6">
        <button className="flex items-center justify-center gap-3 py-2 px-4 border border-gray-300 rounded-lg transition-shadow duration-300 hover:shadow-[0_4px_15px_rgba(14,203,129,0.6)]">
          <img src="/google.jpg" alt="Google" className="w-5 h-5" />
          Continue with Google
        </button>
        <button className="flex items-center justify-center gap-3 py-2 px-4 border border-gray-300 rounded-lg transition-shadow duration-300 hover:shadow-[0_4px_15px_rgba(14,203,129,0.6)]">
          <img src="/instagram.jpg" alt="Facebook" className="w-5 h-5" />
          Continue with Instagram
        </button>
        <button className="flex items-center justify-center gap-3 py-2 px-4 border border-gray-300 rounded-lg transition-shadow duration-300 hover:shadow-[0_4px_15px_rgba(14,203,129,0.6)]">
          <img src="/github.png" alt="GitHub" className="w-5 h-5" />
          Continue with GitHub
        </button>
      </div>
    </form>
  );
}
