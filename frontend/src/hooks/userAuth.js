// /hooks/useAuth.js
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "@/redux/auth/authActions";

export const useAuth = () => {
  const dispatch = useDispatch();
  const { isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  const handleLogin = (formData) => dispatch(loginUser(formData));
  const handleRegister = (formData) => dispatch(registerUser(formData));

  return { isLoading, isError, isSuccess, message, handleLogin, handleRegister };
};
