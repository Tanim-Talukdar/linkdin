import AuthForm from "@/components/AuthForm";
import AuthTogglePanel from "@/components/AuthTogglePanel";
import { useState } from "react";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-[1200px] h-[700px] flex rounded-2xl overflow-hidden shadow-xl relative drop-shadow-[0_10px_40px_rgba(0,244,256,0.8)]">
        {!isLogin ? (
          <>
            <AuthForm mode="signup" />
            <AuthTogglePanel mode="signup" onClick={() => setIsLogin(true)} />
          </>
        ) : (
          <>
            <AuthTogglePanel mode="login" onClick={() => setIsLogin(false)} />
            <AuthForm mode="login" />
          </>
        )}
      </div>
    </div>
  );
}
