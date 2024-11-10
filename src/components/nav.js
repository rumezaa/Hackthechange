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
    <div className="bg-blue w-screen h-16 flex flex-row text-white justify-center items-center gap-x-10 ">
      <div className="flex flex-row text-white justify-center items-center gap-x-10">
        <h2>mentors</h2>

        <h2>job posting</h2>

        <h2>resources</h2>
      </div>

      <div
        onClick={handleSignOut}
        style={{ backgroundImage: `url(logout-icon.svg)` }}
        className="bg-contain bg-no-repeat h-10 w-10"
      />
    </div>
  );
}
