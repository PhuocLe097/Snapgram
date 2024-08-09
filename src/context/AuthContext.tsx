import React, { createContext, useEffect, useState } from "react";
import { IContextType } from "@/types";
import { getCurrentUser } from "@/lib/appwrite/api";
import { useNavigate } from "react-router-dom";

// Giá trị khởi tạo cho user
export const INITIAL_USER = {
  id: "",
  name: "",
  username: "",
  email: "",
  imageUrl: "",
  bio: "",
};

// Giá trị khởi tạo của state
const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setAuthenticated: () => {},
  checkAuthUser: async () => false as boolean,
};

const AuthContext = createContext<IContextType>(INITIAL_STATE);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(INITIAL_USER);
  const [isLoading, setLoading] = useState(false);
  const [isAuthenticated, setAuthenticated] = useState(false);

  const navigate = useNavigate();
  // Nếu có current user thì set data cho user, mở cờ đã login (authenticated) và return true và ngược lại
  const checkAuthUser = async () => {
    setLoading(true);
    try {
      const currentAccount = await getCurrentUser();

      if (currentAccount) {
        setUser({
          id: currentAccount.$id,
          name: currentAccount.name,
          username: currentAccount.username,
          email: currentAccount.email,
          imageUrl: currentAccount.imageUrl,
          bio: currentAccount.bio,
        });

        setAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      console.log("🚀 ~ checkAuthUser ~ error:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Nếu không có cookieFallback trên storage thì trở về login nếu không thì checkAuthUser
  useEffect(() => {
    if (
      localStorage.getItem("cookieFallback") === "[]" ||
      localStorage.getItem("cookieFallback") === null
    )
      navigate("/sign-in");

    checkAuthUser();
  }, []);

  const value = {
    user,
    isLoading,
    isAuthenticated,
    setUser,
    setAuthenticated,
    checkAuthUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useUserContext = () => React.useContext(AuthContext);
