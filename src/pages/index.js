import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState();
  const [pswd, setPswd] = useState();

  return (
    <div className="flex bg-blue w-screen h-screen justify-end">
      <div className="flex flex-col bg-white w-1/2 h-screen text-black justify-center items-center px-40 gap-y-5">
        <div className="flex flex-col w-full">
          <h2 className="text-xs uppercase">email</h2>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-black rounded-md p-3 w-full"
          />
        </div>

        <div className="flex flex-col w-full">
          <h2 className="text-xs uppercase">password</h2>
          <input
            type="password"
            value={pswd}
            onChange={(e) => setPswd(e.target.value)}
            className="border border-black rounded-md p-3 w-full"
          />
        </div>

        <div className="bg-blue rounded-full text-white p-4 px-10 cursor pointer">
          <h2>login</h2>
        </div>
      </div>
    </div>
  );
}
