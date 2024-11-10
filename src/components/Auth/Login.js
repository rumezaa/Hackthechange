import Image from "next/image";
import { useState, useContext, useEffect } from "react";
import { signInWithGoogle, signIn, signUp } from "@/firebase/firebaseFuncs";
import { UserContext } from "@/firebase/UserProvider";
import { useRouter } from "next/router";
import { EyeIcon } from "@/components/EyeIcon";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isHidden, setIsHidden] = useState(true);


  const [isLogin, setIsLogin] = useState(true);

  const handleSumbit = (e) => {
    e.preventDefault();

    if (isLogin) {
      signIn({ email, password, setError });
    } else {
      signUp({ email, name, password, setError });
    }
  };



  return (
    <div className="flex bg-blue w-screen h-screen justify-between">
      <div
        style={{ backgroundImage: `url(hero-img.png)` }}
        className="bg-cover bg-no-repeat flex flex-col w-1/2 h-screen text-black justify-end items-center px-40 gap-y-10 text-white
        font-bold text-3xl"
      ></div>

      <div className="flex flex-col bg-white w-1/2 h-screen text-black justify-center items-center px-40 gap-y-10">
        <div
          style={{ backgroundImage: `url(muto.svg)` }}
          className="bg-contain bg-no-repeat h-16 w-52"
        />

        <div className="flex flex-row items-center justify-center gap-x-5 font-bold">
          <div className="border-b border-blue w-20" />
          <h2>Believe in new beginnings.</h2>
          <div className="border-b border-blue w-20" />
        </div>

        <div
          className={`flex items-center gap-5 bg-white rounded-lg px-6 py-4 shadow-lg`}
          onClick={() => signInWithGoogle(setError)}
          style={{ cursor: "pointer" }}
        >
          <div className="bg-white shadow-lg rounded-full flex items-center p-2 ">
            <div
              style={{ backgroundImage: `url(google-logo.svg)` }}
              className="bg-contain bg-no-repeat h-8 w-8 lg:h-12 lg:w-12"
            />
          </div>
          <h3 className="font-bold text-md lg:text-xl ">Sign in with Google</h3>
        </div>
        <form
          className="flex flex-col gap-y-5 justify-center items-center w-full"
          onSubmit={handleSumbit}
        >
          {!isLogin && (
            <div className="flex flex-col w-full">
              <h2 className="text-xs uppercase">full name</h2>
              <input
                type="text"
                value={name}
                placeholder="John Doe"
                required
                onChange={(e) => setName(e.target.value)}
                className="border border-black rounded-md p-3 w-full"
              />
            </div>
          )}
          <div className="flex flex-col w-full">
            <h2 className="text-xs uppercase">email</h2>
            <input
              type="email"
              value={email}
              placeholder="johndoe@example.com"
              required
              onChange={(e) => setEmail(e.target.value)}
              className="border border-black rounded-md p-3 w-full"
            />
          </div>

          <div className="flex flex-col w-full">
            <h2 className="text-xs uppercase">password</h2>
            <div className="flex flex-row justify-between items-center border border-black rounded-md p-3 w-full">
              <input
                type={isHidden ? "password" : "text"}
                value={password}
                required
                placeholder="*****"
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="focus-outline:none"
              />
              <div onClick={() => setIsHidden(!isHidden)}>
                <EyeIcon isHidden={isHidden} />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue rounded-full text-white font-semibold p-4 px-10 cursor pointer transition transform hover:scale-110 duration-300 ease-in-out"
          >
            <h2>{isLogin ? "Login" : "Sign Up"}</h2>
          </button>

          {error && (
            <p
              className={`
           text-red-500 text-xs absolute bottom-16 lg:bottom-12`}
            >
              {error}
            </p>
          )}
        </form>

        <div className="mt-10 flex" style={{ zIndex: 25, bottom: "11vh" }}>
          <h3>
            {isLogin ? "Don't have an account?" : "Have an account?"}{" "}
            <span
              onClick={() => setIsLogin(!isLogin)}
              className="underline font-semibold text-utility-blue"
            >
              {isLogin ? "Create" : "Login"}
            </span>
          </h3>
        </div>

        <div></div>
      </div>
    </div>
  );
}
