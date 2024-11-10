import Image from "next/image";
import { useContext, useState, useEffect } from "react";
import SpeechToText from "../components/SpeechToText";
import Login from "@/components/Auth/Login";
import { UserContext } from "@/firebase/UserProvider";
import { useRouter } from "next/router";


export default function Home() {
  const nav = useRouter();
  const [user] = useContext(UserContext);
  const [isFirstTime, setIsFirstTime] = useState(user && user?.signInFirstTime);
  const [wordCount, setWordCount] = useState();

  useEffect(() => {
    if (user && !user.signInFirstTime) {
      nav.push("/dashboard");
    }
  }, [user, nav]);


  return (
    <div className="bg-white text-black">
      {!user && <Login />}
      {user?.signInFirstTime && <SpeechToText sendWordCount={setWordCount} />}
    </div>
  );
}
