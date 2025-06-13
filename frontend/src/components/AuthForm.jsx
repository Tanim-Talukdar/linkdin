import Input from "./Input";
import Button from "./Button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser, signupUser } from "@/config/redux/action/authAction/index";
import { formFields } from "@/constants/formFields";

export default function AuthForm({ mode }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});

  const isLogin = mode === "login";
  const fields = formFields[mode];

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(isLogin ? loginUser(formData) : signupUser(formData));
  };

  return (
    <form onSubmit={handleSubmit} className="w-1/2 p-10 bg-gray-100 bg-opacity-40 rounded-md shadow-lg">
      <h2 className="text-teal-400 text-3xl font-bold mb-6 text-center">
        {isLogin ? "Log In" : "Sign Up"}
      </h2>

      {/* Name and Username in one row */}
      {fields.some(f => f.id === "name") && fields.some(f => f.id === "username") && (
        <div className="flex justify-between mb-4">
          {["name", "username"].map((fieldId) => {
            const field = fields.find(f => f.id === fieldId);
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
                className="flex-1"
              />
            );
          })}
        </div>
      )}

      {/* Other fields stacked vertically */}
      {fields
        .filter(f => f.id !== "name" && f.id !== "username")
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
    <br />
      <Button className="w-full mt-6">{isLogin ? "Login" : "Register"}</Button>
    </form>
  );
}
