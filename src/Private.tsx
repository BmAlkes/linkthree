import React, { useEffect, useState } from "react";
import { auth } from "./services/firebaseConnection";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

interface PrivateProps {
  children: React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Private = ({ children }: PrivateProps): any => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userData = {
          uid: user?.uid,
          email: user?.email,
        };
        localStorage.setItem("@reactLinks", JSON.stringify(userData));
        setUser(true);
        setLoading(false);
      } else {
        setLoading(false);
        setUser(false);
      }
    });
    return () => {
      unsub();
    };
  }, []);
  const navigate = useNavigate();

  if (loading) return <></>;

  if (!user) {
    return navigate("/login");
  }
  return children;
};
