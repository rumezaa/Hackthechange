import Image from "next/image";
import { useState } from "react";
import SpeechToText from "../components/SpeechToText";
import Login from "@/components/Auth/Login";

export default function Home() {
  const [email, setEmail] = useState();
  const [pswd, setPswd] = useState();

  const handleSumbit = () => {
    return console.log("hi");
  };

  return (
    <div>
      <Login />
    </div>
  );
}
