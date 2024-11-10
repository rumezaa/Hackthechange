import {useRouter }from "next/router";

export default function Nav() {
  const route = useRouter();
  return (
    <div className="bg-blue w-screen h-16 flex flex-row text-white justify-between">
      <div className="flex items-center cursor-pointer" onClick={() => router.push("")}>
        <img src="/logo.svg" alt="Logo" className="w-10 h-10 mr-3" />
      </div>
      <div className="flex gap-x-10 px-10">
        <h2 onClick={() => router.push("/dashboard")}
        className="cursor-pointer font-bold hover:text-gray-300 hover:scale-105 transition py-5">Dashboard</h2>

        <h2 onClick={() => router.push("/job-postings")}
        className="cursor-pointer font-bold hover:text-gray-300 hover:scale-105 transition py-5">Job Postings</h2>

        <h2 onClick={() => router.push("/placeholder")}
        className="cursor-pointer font-bold hover:text-gray-300 hover:scale-105 transition py-5">Placeholder</h2>
      </div>
    </div>
  );
}
