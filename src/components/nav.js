import { useRouter } from "next/router";
import { auth } from "@/firebase/config";
import { signOut } from "firebase/auth";

export default function Nav() {
  const route = useRouter();
  async function handleSignOut() {
    signOut(auth)
      .then(() => {
        localStorage.clear(); // we need somethig less volatile
        route.push("/");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  }
  return (
    <div className="bg-blue w-screen h-16 flex flex-row text-white justify-between">
      <div
        className="flex items-center cursor-pointer"
        onClick={() => Router.push("/")}
      ></div>
      <div className="flex gap-x-10 px-10">
        <h2
          onClick={() => router.push("/dashboard")}
          className="cursor-pointer font-bold hover:text-gray-300 hover:scale-105 transition py-5"
        >
          Dashboard
        </h2>

        <h2
          onClick={() => router.push("/job-postings")}
          className="cursor-pointer font-bold hover:text-gray-300 hover:scale-105 transition py-5"
        >
          Job Postings
        </h2>

        <h2
          onClick={() => router.push("/placeholder")}
          className="cursor-pointer font-bold hover:text-gray-300 hover:scale-105 transition py-5"
        >
          Placeholder
        </h2>

        <div
          onClick={handleSignOut}
          style={{ backgroundImage: `url(logout-icon.svg)` }}
          className="bg-contain bg-no-repeat h-10 w-10"
        />
      </div>
    </div>
  );
}
